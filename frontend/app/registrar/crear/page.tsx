'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import './page.css';

interface FormData {
  arc_codi?: number;
  arc_fech: string;
  arc_titu: string;
  arc_desc: string;
  arc_orig: string;
  arc_cate: string;
  arc_año: number;
  arc_npro: string;
  arc_seg: string;
  arc_tema: string;
  arc_area: string;
  arc_asun: string;
  arc_inic: string;
  arc_dest: string;
  arc_grup: string;
  arc_seri: string;
  arc_sser: string;
  arc_sopo: string;
  arc_esta: string;
  arc_conA: string;
  arc_conR: string;
  arc_leng: string;
  arc_orco: boolean;
  arc_lugD: string;
  arc_ubsa: string;
  arc_pasi: string;
  arc_estan: string;
  arc_casi: string;
  arc_caja: string;
  arc_lega: string;
  arc_nume: string;
  arc_foli: string;
  arc_hoja: string;
  arc_medi: string;
  arc_obse: string;
  arc_visw: boolean;
  arc_acti: boolean;
  archivos?: Array<{ id: number; archivo: string; nombre: string }>;
}

interface RegistroResponse extends FormData {
  arc_codi: number;
}

interface FormData {
  arc_fech: string;
  arc_titu: string;
  arc_desc: string;
  arc_orig: string;
  arc_cate: string;
  arc_año: number;
  arc_npro: string;
  arc_seg: string;
  arc_tema: string;
  arc_area: string;
  arc_asun: string;
  arc_inic: string;
  arc_dest: string;
  arc_grup: string;
  arc_seri: string;
  arc_sser: string;
  arc_sopo: string;
  arc_esta: string;
  arc_conA: string;
  arc_conR: string;
  arc_leng: string;
  arc_orco: boolean;
  arc_lugD: string;
  arc_ubsa: string;
  arc_pasi: string;
  arc_estan: string;
  arc_casi: string;
  arc_caja: string;
  arc_lega: string;
  arc_nume: string;
  arc_foli: string;
  arc_hoja: string;
  arc_medi: string;
  arc_obse: string;
  arc_visw: boolean;
  arc_acti: boolean;
}

export default function CrearRegistroPage() {
  const router = useRouter();
  const [tab, setTab] = useState('datos');

  const [formData, setFormData] = useState<FormData>({
    arc_fech: new Date().toISOString().split('T')[0],
    arc_titu: '',
    arc_desc: '',
    arc_orig: '',
    arc_cate: '',
    arc_año: new Date().getFullYear(),
    arc_npro: '',
    arc_seg: '',
    arc_tema: '',
    arc_area: '',
    arc_asun: '',
    arc_inic: '',
    arc_dest: '',
    arc_grup: '',
    arc_seri: '',
    arc_sser: '',
    arc_sopo: '',
    arc_esta: 'EXCELENTE',
    arc_conA: 'EXCELENTE',
    arc_conR: 'EXCELENTE',
    arc_leng: '',
    arc_orco: true,
    arc_lugD: '',
    arc_ubsa: 'ARCHIVO HISTORICO',
    arc_pasi: '',
    arc_estan: '',
    arc_casi: '',
    arc_caja: '',
    arc_lega: '',
    arc_nume: '',
    arc_foli: '',
    arc_hoja: '',
    arc_medi: '',
    arc_obse: '',
    arc_visw: true,
    arc_acti: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tempFiles, setTempFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [showVisibilityModal, setShowVisibilityModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target as any;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else if (name === 'arc_año') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || new Date().getFullYear() }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Filtrar archivos demasiado grandes (>50MB)
      const validFiles = Array.from(files).filter((file) => {
        if (file.size > 50 * 1024 * 1024) {
          setError(`${file.name} es demasiado grande (máx 50MB)`);
          return false;
        }
        return true;
      });
      setTempFiles([...tempFiles, ...validFiles]);
      e.target.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    setTempFiles(tempFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowVisibilityModal(true);
  };

  // Construir URL completa del archivo
const getFileUrl = (filePath: string): string => {
  if (!filePath) return '';
  if (filePath.startsWith('http')) return filePath;
  const baseUrl = 'http://localhost:8000';
  return `${baseUrl}${filePath}`;
};

// Mapear MIME type a tipo de archivo del backend
const getFileType = (mimeType: string): string => {
  if (mimeType === 'application/pdf') return 'pdf';
  if (mimeType.startsWith('image/')) return 'imagen';
  if (
    mimeType === 'application/msword' ||
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimeType === 'text/plain'
  )
    return 'documento';
  return 'otro';
};

  const handleConfirmVisibility = async (isPublic: boolean) => {
    setShowVisibilityModal(false);
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const dataToSend = {
        ...formData,
        arc_visw: isPublic,
      };
      const response = await api.post<RegistroResponse>('/registros/', dataToSend);
      const registroId = response.data.arc_codi;

      // Cargar archivos si existen
      if (tempFiles.length > 0) {
        setUploadingFiles(true);
        for (const file of tempFiles) {
          const formDataFile = new FormData();
          formDataFile.append('archivo', file);
          formDataFile.append('registro', registroId.toString());
          formDataFile.append('nombre', file.name);
          formDataFile.append('tipo', getFileType(file.type));
          try {
            await api.post('/archivos/', formDataFile, {
              headers: { 'Content-Type': 'multipart/form-data' },
            });
          } catch (err) {
            console.error('Error uploading file:', err);
          }
        }
        setUploadingFiles(false);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/registrar');
      }, 1500);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al guardar el registro.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Verificando autenticación...</div>;
  }

  return (
    <div className="form-page">
      <button
        type="button"
        onClick={() => router.back()}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#5a7a8c',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '0.85rem',
          marginBottom: '1.5rem',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#4a6a7c';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#5a7a8c';
        }}
      >
        ← Volver
      </button>
      <h1 className="form-title">CREAR NUEVO REGISTRO HISTORICO</h1>

      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">Registro guardado exitosamente</div>}

      <form onSubmit={handleSubmit}>
        <div className="tab-container">
          <button
            type="button"
            className={`tab-button ${tab === 'datos' ? 'active' : ''}`}
            onClick={() => setTab('datos')}
          >
            Datos Principales
          </button>
          <button
            type="button"
            className={`tab-button ${tab === 'almacenamiento' ? 'active' : ''}`}
            onClick={() => setTab('almacenamiento')}
          >
            Almacenamiento
          </button>
          <button
            type="button"
            className={`tab-button ${tab === 'archivos' ? 'active' : ''}`}
            onClick={() => setTab('archivos')}
          >
            Archivos
          </button>
        </div>

        {tab === 'datos' && (
          <>
            <div className="section-header">DATOS PRINCIPALES DE REGISTRO</div>
            <div className="section-content">
              <div className="form-grid date-title">
                <div className="form-group">
                  <label className="form-label">Fecha Recepción</label>
                  <input type="date" name="arc_fech" value={formData.arc_fech} onChange={handleChange} className="form-input" required disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Titulo Referencia</label>
                  <input type="text" name="arc_titu" value={formData.arc_titu} onChange={handleChange} className="form-input" required disabled={loading} />
                </div>
              </div>
              <div className="form-grid full">
                <div className="form-group">
                  <label className="form-label">Descripcion Breve</label>
                  <textarea name="arc_desc" value={formData.arc_desc} onChange={handleChange} className="form-textarea" disabled={loading}></textarea>
                </div>
              </div>
            </div>

            <div className="section-header">REFERENCIAS Y CLASIFICACION</div>
            <div className="section-content">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Origen</label>
                  <input type="text" name="arc_orig" value={formData.arc_orig} onChange={handleChange} className="form-input" disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Categoria:</label>
                  <input type="text" name="arc_cate" value={formData.arc_cate} onChange={handleChange} className="form-input" disabled={loading} />
                </div>
              </div>
            </div>

            <div className="section-header">NUMERACION Y FECHAS</div>
            <div className="section-content">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Año</label>
                  <input type="number" name="arc_año" value={formData.arc_año} onChange={handleChange} className="form-input number-field" disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Numero Protocolar</label>
                  <input type="text" name="arc_npro" value={formData.arc_npro} onChange={handleChange} className="form-input" disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Segmento</label>
                  <select name="arc_seg" value={formData.arc_seg} onChange={handleChange} className="form-select" disabled={loading}>
                    <option value="">Seleccionar</option>
                    <option value="REGISTROS">REGISTROS</option>
                    <option value="PARTIDAS">PARTIDAS</option>
                    <option value="EXPEDIENTES">EXPEDIENTES</option>
                    <option value="NOTAS">NOTAS</option>
                    <option value="OTROS">OTROS</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="section-header">ASUNTO Y ALCANCES</div>
            <div className="section-content">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Tema</label>
                  <input type="text" name="arc_tema" value={formData.arc_tema} onChange={handleChange} className="form-input" disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Area</label>
                  <input type="text" name="arc_area" value={formData.arc_area} onChange={handleChange} className="form-input" disabled={loading} />
                </div>
              </div>
              <div className="form-grid full">
                <div className="form-group">
                  <label className="form-label">Asunto</label>
                  <input type="text" name="arc_asun" value={formData.arc_asun} onChange={handleChange} className="form-input" disabled={loading} />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Iniciador</label>
                  <input type="text" name="arc_inic" value={formData.arc_inic} onChange={handleChange} className="form-input" disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Destinatarios</label>
                  <input type="text" name="arc_dest" value={formData.arc_dest} onChange={handleChange} className="form-input" disabled={loading} />
                </div>
              </div>
            </div>

          </>
        )}

        {tab === 'almacenamiento' && (
          <>
            <div className="section-header">GRUPOS Y SERIES</div>
            <div className="section-content">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Grupo</label>
                  <input type="text" name="arc_grup" value={formData.arc_grup} onChange={handleChange} className="form-input" disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Serie</label>
                  <input type="text" name="arc_seri" value={formData.arc_seri} onChange={handleChange} className="form-input" disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Sub Serie</label>
                  <input type="text" name="arc_sser" value={formData.arc_sser} onChange={handleChange} className="form-input" disabled={loading} />
                </div>
              </div>
            </div>

            <div className="section-header">CONSERVACION Y UBICACION</div>
            <div className="section-content">
              {/* PRINCIPALES: Soporte, Estado, Condiciones, Lengua, Original/Copia */}
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Soporte</label>
                  <input type="text" name="arc_sopo" value={formData.arc_sopo} onChange={handleChange} className="form-input" disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Estado Conservacion</label>
                  <select name="arc_esta" value={formData.arc_esta} onChange={handleChange} className="form-select" disabled={loading}>
                    <option value="EXCELENTE">EXCELENTE</option>
                    <option value="BUENO">BUENO</option>
                    <option value="REGULAR">REGULAR</option>
                    <option value="MALO">MALO</option>
                  </select>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Cond. de Acceso</label>
                  <select name="arc_conA" value={formData.arc_conA} onChange={handleChange} className="form-select" disabled={loading}>
                    <option value="EXCELENTE">EXCELENTE</option>
                    <option value="BUENO">BUENO</option>
                    <option value="REGULAR">REGULAR</option>
                    <option value="MALO">MALO</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Cond. de Reproduccion</label>
                  <select name="arc_conR" value={formData.arc_conR} onChange={handleChange} className="form-select" disabled={loading}>
                    <option value="EXCELENTE">EXCELENTE</option>
                    <option value="BUENO">BUENO</option>
                    <option value="REGULAR">REGULAR</option>
                    <option value="MALO">MALO</option>
                  </select>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Lengua Escritura</label>
                  <input type="text" name="arc_leng" value={formData.arc_leng} onChange={handleChange} className="form-input" disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Original / Copia</label>
                  <select name="arc_orco" value={formData.arc_orco ? 'true' : 'false'} onChange={(e) => setFormData(p => ({ ...p, arc_orco: e.target.value === 'true' }))} className="form-select" disabled={loading}>
                    <option value="true">ORIGINAL</option>
                    <option value="false">COPIA</option>
                  </select>
                </div>
              </div>

              {/* UBICACIÓN: Lugar Destino, Sala, Pasillo, Estantería, Casillero */}
              <div className="form-grid full">
                <div className="form-group">
                  <label className="form-label">Lugar Destino</label>
                  <input type="text" name="arc_lugD" value={formData.arc_lugD} onChange={handleChange} className="form-input" disabled={loading} />
                </div>
              </div>
              <div className="form-grid full">
                <div className="form-group">
                  <label className="form-label">Ubicacion Sala</label>
                  <select name="arc_ubsa" value={formData.arc_ubsa} onChange={handleChange} className="form-select" disabled={loading}>
                    <option value="ARCHIVO HISTORICO">ARCHIVO HISTORICO</option>
                    <option value="ARCHIVO CORRIENTE">ARCHIVO CORRIENTE</option>
                    <option value="OBISPADO">OBISPADO</option>
                  </select>
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Pasillo</label>
                  <input type="text" name="arc_pasi" value={formData.arc_pasi} onChange={handleChange} className="form-input" disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Estanteria</label>
                  <input type="text" name="arc_estan" value={formData.arc_estan} onChange={handleChange} className="form-input" disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Casillero</label>
                  <input type="text" name="arc_casi" value={formData.arc_casi} onChange={handleChange} className="form-input" disabled={loading} />
                </div>
              </div>

              {/* NUMERACIÓN: Caja, Legajo, Número, Folios, Hojas, Medidas */}
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Caja Nro</label>
                  <input type="text" name="arc_caja" value={formData.arc_caja} onChange={handleChange} className="form-input number-field" disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Legajo</label>
                  <input type="text" name="arc_lega" value={formData.arc_lega} onChange={handleChange} className="form-input number-field" disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Numero</label>
                  <input type="text" name="arc_nume" value={formData.arc_nume} onChange={handleChange} className="form-input number-field" disabled={loading} />
                </div>
              </div>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Folios</label>
                  <input type="text" name="arc_foli" value={formData.arc_foli} onChange={handleChange} className="form-input number-field" disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Hojas</label>
                  <input type="text" name="arc_hoja" value={formData.arc_hoja} onChange={handleChange} className="form-input number-field" disabled={loading} />
                </div>
                <div className="form-group">
                  <label className="form-label">Medidas</label>
                  <input type="text" name="arc_medi" value={formData.arc_medi} onChange={handleChange} className="form-input number-field" disabled={loading} />
                </div>
              </div>
            </div>

            <div className="section-header">Nota Archivero</div>
            <div className="section-content">
              <div className="form-grid full">
                <div className="form-group">
                  <textarea name="arc_obse" value={formData.arc_obse} onChange={handleChange} className="form-textarea" disabled={loading}></textarea>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'archivos' && (
          <>
            <div className="section-header">ARCHIVOS ADJUNTOS</div>
            <div className="section-content">
              {/* ÁREA DE CARGA */}
              <div className="form-grid full">
                <label htmlFor="file-select" style={{
                  display: 'block',
                  backgroundColor: '#f0f7ff',
                  borderRadius: '6px',
                  padding: 'var(--spacing-lg)',
                  border: '2px dashed #0d6efd',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e7f1ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f7ff';
                }}
                >
                  <div style={{
                    fontWeight: '700',
                    color: '#0d6efd',
                    marginBottom: 'var(--spacing-sm)',
                    fontSize: '1.1rem',
                  }}>
                    ✚ Agregar Archivos
                  </div>
                  <p style={{
                    marginTop: 'var(--spacing-sm)',
                    marginBottom: 'var(--spacing-sm)',
                    fontSize: '0.85rem',
                    color: '#666',
                  }}>
                    PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
                  </p>
                  <input
                    id="file-select"
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    disabled={uploadingFiles}
                    style={{
                      display: 'none',
                    }}
                  />
                </label>
              </div>

              {/* LISTA DE ARCHIVOS SELECCIONADOS */}
              {tempFiles.length > 0 && (
                <div className="form-grid full" style={{ marginTop: 'var(--spacing-lg)' }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-sm)',
                  }}>
                    {tempFiles.map((file, index) => {
                      const ext = file.name.split('.').pop()?.toLowerCase() || 'archivo';
                      return (
                        <div key={index} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: '#f8f9fa',
                          padding: 'var(--spacing-md)',
                          borderRadius: '6px',
                          border: '1px solid #e0e0e0',
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-md)',
                            flex: 1,
                          }}>
                            <span style={{
                              fontSize: '1.5rem',
                              color: '#0d6efd',
                            }}>
                              
                            </span>
                            <div style={{
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '0.25rem',
                            }}>
                              <span style={{
                                color: '#333',
                                fontWeight: '600',
                                wordBreak: 'break-word',
                              }}>
                                {file.name}
                              </span>
                              <span style={{
                                color: '#999',
                                fontSize: '0.85rem',
                              }}>
                                .{ext}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            style={{
                              padding: '0.5rem 0.75rem',
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontWeight: '700',
                              fontSize: '1rem',
                              width: '35px',
                              height: '35px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#c82333';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#dc3545';
                            }}
                            title="Eliminar archivo"
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Aceptar y Confirmar Registro'}
          </button>
          <button type="button" className="btn-cancel" onClick={() => router.back()} disabled={loading}>
            Cancelar y Salir
          </button>
        </div>
      </form>

      {/* MODAL DE VISIBILIDAD */}
      {showVisibilityModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '2rem',
            maxWidth: '400px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            position: 'relative',
          }}>
            <button
              onClick={() => setShowVisibilityModal(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#999',
                padding: 0,
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#333';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#999';
              }}
              title="Cerrar"
            >
              ✕
            </button>
            <h2 style={{ marginTop: 0, marginBottom: '1rem', color: '#2d5f6f' }}>¿Visibilidad del Registro?</h2>
            <p style={{ marginBottom: '1.5rem', color: '#555', lineHeight: '1.5' }}>
              ¿Deseas que este registro sea <strong>PÚBLICO</strong> o <strong>PRIVADO</strong>?
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'flex-end',
            }}>
              <button
                onClick={() => handleConfirmVisibility(false)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#721c24',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#621018';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#721c24';
                }}
              >
                PRIVADO
              </button>
              <button
                onClick={() => handleConfirmVisibility(true)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#155724',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#0d4615';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#155724';
                }}
              >
                PÚBLICO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
