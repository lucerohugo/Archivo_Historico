'use client';

import React, { useState } from 'react';
import FileUpload from './FileUpload';

interface RegistroDetailProps {
  registro: any;
  onBack: () => void;
}

const styles = {
  container: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    borderBottom: '2px solid #e8f4f8',
    paddingBottom: '1rem',
  },
  title: {
    fontSize: '1.8rem',
    fontWeight: '700',
    color: '#2d5f6f',
  },
  backButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#666',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
  },
  tabContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    borderBottom: '1px solid #ddd',
  },
  tab: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#f9f9f9',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#666',
    transition: 'all 0.3s ease',
    borderBottom: '2px solid transparent',
  },
  activeTab: {
    backgroundColor: '#2d5f6f',
    color: '#fff',
    borderBottom: '2px solid #2d5f6f',
  },
  section: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#2d5f6f',
    backgroundColor: '#e8f4f8',
    padding: '0.75rem 1rem',
    borderLeft: '4px solid #2d5f6f',
    marginBottom: '1rem',
  },
  fieldGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '0.4rem',
  },
  value: {
    padding: '0.6rem 0.75rem',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '0.95rem',
    color: '#333',
  },
  filesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '1rem',
  },
  fileItem: {
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '4px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  fileItemHover: {
    backgroundColor: '#e8f4f8',
    borderColor: '#2d5f6f',
  },
  fileName: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#2d5f6f',
    wordBreak: 'break-word' as const,
    marginBottom: '0.5rem',
  },
  filePreview: {
    maxWidth: '100%',
    maxHeight: '120px',
    marginBottom: '0.5rem',
    borderRadius: '4px',
  },
};

export default function RegistroDetail({ registro, onBack }: RegistroDetailProps) {
  const [activeTab, setActiveTab] = useState<'datos' | 'almacenamiento' | 'archivos'>('datos');
  const [files, setFiles] = useState<any[]>([]);
  const [previewFile, setPreviewFile] = useState<any>(null);

  const handleFileUpload = (newFiles: File[]) => {
    const newFileObjects = newFiles.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
    }));
    setFiles([...files, ...newFileObjects]);
  };

  const isImage = (type: string) => type.startsWith('image/');
  const isPdf = (type: string) => type === 'application/pdf';

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>{registro.arc_codi} - {registro.arc_titu}</h2>
        <button
          style={styles.backButton}
          onClick={onBack}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          ← Volver a Registros
        </button>
      </div>

      <div style={styles.tabContainer}>
        <button
          style={{ ...styles.tab, ...(activeTab === 'datos' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('datos')}
        >
          📋 Datos Principales
        </button>
        <button
          style={{ ...styles.tab, ...(activeTab === 'almacenamiento' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('almacenamiento')}
        >
          🏪 Almacenamiento
        </button>
        <button
          style={{ ...styles.tab, ...(activeTab === 'archivos' ? styles.activeTab : {}) }}
          onClick={() => setActiveTab('archivos')}
        >
          📁 Archivos ({files.length})
        </button>
      </div>

      {/* TAB: DATOS PRINCIPALES */}
      {activeTab === 'datos' && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>📋 Datos Principales de Registro</div>
          <div style={styles.fieldGrid}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Código</label>
              <div style={styles.value}>{registro.arc_codi}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Fecha</label>
              <div style={styles.value}>{new Date(registro.arc_fech).toLocaleDateString('es-ES')}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Título</label>
              <div style={styles.value}>{registro.arc_titu}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Origen</label>
              <div style={styles.value}>{registro.arc_orig || '-'}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Categoría</label>
              <div style={styles.value}>{registro.arc_cate || '-'}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Año</label>
              <div style={styles.value}>{registro.arc_año || '-'}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Tema</label>
              <div style={styles.value}>{registro.arc_tema || '-'}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Área</label>
              <div style={styles.value}>{registro.arc_area || '-'}</div>
            </div>
          </div>
          <div style={{ ...styles.fieldGroup, marginTop: '2rem' }}>
            <label style={styles.label}>Descripción</label>
            <div style={{...styles.value, minHeight: '100px', whiteSpace: 'pre-wrap'}}>
              {registro.arc_desc || '-'}
            </div>
          </div>
          <div style={{ ...styles.fieldGroup, marginTop: '1.5rem' }}>
            <label style={styles.label}>Asunto</label>
            <div style={{...styles.value, minHeight: '80px', whiteSpace: 'pre-wrap'}}>
              {registro.arc_asun || '-'}
            </div>
          </div>
        </div>
      )}

      {/* TAB: ALMACENAMIENTO */}
      {activeTab === 'almacenamiento' && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>🏪 Almacenamiento y Ubicación Física</div>
          <div style={styles.fieldGrid}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Soporte</label>
              <div style={styles.value}>{registro.arc_sopo || '-'}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Estado</label>
              <div style={styles.value}>{registro.arc_esta || '-'}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Lengua</label>
              <div style={styles.value}>{registro.arc_leng || '-'}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Original/Copia</label>
              <div style={styles.value}>{registro.arc_orco ? 'Original' : 'Copia'}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Ubicación Sala</label>
              <div style={styles.value}>{registro.arc_ubsa || '-'}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Pasillo</label>
              <div style={styles.value}>{registro.arc_pasi || '-'}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Estantería</label>
              <div style={styles.value}>{registro.arc_estan || '-'}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Casillero</label>
              <div style={styles.value}>{registro.arc_casi || '-'}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Caja Número</label>
              <div style={styles.value}>{registro.arc_caja || '-'}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Legajo</label>
              <div style={styles.value}>{registro.arc_lega || '-'}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Número</label>
              <div style={styles.value}>{registro.arc_nume || '-'}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Folios</label>
              <div style={styles.value}>{registro.arc_foli || '-'}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Hojas</label>
              <div style={styles.value}>{registro.arc_hoja || '-'}</div>
            </div>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Medidas</label>
              <div style={styles.value}>{registro.arc_medi || '-'}</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: ARCHIVOS */}
      {activeTab === 'archivos' && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>📁 Archivos Adjuntos</div>
          <FileUpload onFilesSelected={handleFileUpload} />
          
          {files.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#2d5f6f' }}>
                Archivos Cargados ({files.length})
              </h3>
              <div style={styles.filesList}>
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    style={styles.fileItem}
                    onClick={() => setPreviewFile(file)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e8f4f8';
                      e.currentTarget.style.borderColor = '#2d5f6f';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f9f9f9';
                      e.currentTarget.style.borderColor = '#ddd';
                    }}
                  >
                    {isImage(file.type) && (
                      <img src={file.url} alt={file.name} style={styles.filePreview} />
                    )}
                    {isPdf(file.type) && (
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
                    )}
                    <div style={styles.fileName}>{file.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#999' }}>
                      {(file.size / 1024).toFixed(2)} KB
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {previewFile && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}>
              <div style={{
                backgroundColor: '#fff',
                padding: '2rem',
                borderRadius: '8px',
                maxWidth: '90vw',
                maxHeight: '90vh',
                overflow: 'auto',
                position: 'relative',
              }}>
                <button
                  onClick={() => setPreviewFile(null)}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#d32f2f',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                  }}
                >
                  ✕ Cerrar
                </button>
                {isImage(previewFile.type) && (
                  <img src={previewFile.url} alt={previewFile.name} style={{ maxWidth: '100%', maxHeight: '80vh' }} />
                )}
                {isPdf(previewFile.type) && (
                  <iframe src={previewFile.url} style={{ width: '100%', height: '80vh', border: 'none' }} />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
