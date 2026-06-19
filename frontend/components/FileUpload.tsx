'use client';

import React, { useRef } from 'react';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  maxSize?: number; // en MB
  acceptedTypes?: string[];
}

const styles = {
  container: {
    border: '2px dashed #2d5f6f',
    borderRadius: '8px',
    padding: '2rem',
    textAlign: 'center' as const,
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  containerHover: {
    backgroundColor: '#e8f4f8',
    borderColor: '#1a4d5f',
  },
  icon: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#2d5f6f',
    marginBottom: '0.5rem',
  },
  description: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2d5f6f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  input: {
    display: 'none' as const,
  },
  fileList: {
    marginTop: '1rem',
    textAlign: 'left' as const,
  },
  fileListTitle: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '0.5rem',
  },
  fileItem: {
    padding: '0.5rem 0.75rem',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '0.85rem',
    color: '#333',
    marginBottom: '0.25rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fileName: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },
  fileSize: {
    fontSize: '0.8rem',
    color: '#999',
    marginLeft: '1rem',
  },
  error: {
    padding: '1rem',
    backgroundColor: '#ffebee',
    border: '1px solid #ef5350',
    borderRadius: '4px',
    color: '#c62828',
    fontSize: '0.9rem',
    marginTop: '1rem',
  },
};

export default function FileUpload({ onFilesSelected, maxSize = 50, acceptedTypes = ['image/png', 'image/jpeg', 'image/gif', 'application/pdf'] }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState<string>('');
  const [isDragging, setIsDragging] = React.useState(false);

  const handleFileSelect = (files: FileList | null) => {
    setError('');
    if (!files) return;

    const newFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validar tipo
      if (!acceptedTypes.includes(file.type)) {
        setError(`Tipo de archivo no permitido: ${file.name}`);
        continue;
      }

      // Validar tamaño
      if (file.size > maxSize * 1024 * 1024) {
        setError(`Archivo demasiado grande: ${file.name} (máximo ${maxSize}MB)`);
        continue;
      }

      newFiles.push(file);
    }

    if (newFiles.length > 0) {
      setSelectedFiles([...selectedFiles, ...newFiles]);
      onFilesSelected(newFiles);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
  };

  return (
    <div>
      <div
        style={{
          ...styles.container,
          ...(isDragging ? styles.containerHover : {}),
        }}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div style={styles.icon}>📤</div>
        <div style={styles.title}>Arrastra archivos aquí o haz clic</div>
        <div style={styles.description}>
          Soporta: PNG, JPG, GIF, PDF (máximo {maxSize}MB)
        </div>
        <button
          style={styles.button}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Seleccionar Archivos
        </button>
        <input
          ref={fileInputRef}
          style={styles.input}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {selectedFiles.length > 0 && (
        <div style={styles.fileList}>
          <div style={styles.fileListTitle}>Archivos Seleccionados ({selectedFiles.length}):</div>
          {selectedFiles.map((file, idx) => (
            <div key={idx} style={styles.fileItem}>
              <span style={styles.fileName}>{file.name}</span>
              <span style={styles.fileSize}>{(file.size / 1024).toFixed(2)} KB</span>
              <button
                onClick={() => removeFile(idx)}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: '#d32f2f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  marginLeft: '0.5rem',
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
