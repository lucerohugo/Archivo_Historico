'use client';

import React, { useState, useEffect, CSSProperties } from 'react';
import api from '@/lib/api';

interface RegistroFormTabsProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  loading?: boolean;
}

type FormDataType = {
  arc_codi: string | number;
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
};

const styles: Record<string, CSSProperties> = {
  container: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '0',
    marginBottom: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  tabsContainer: {
    display: 'flex',
    borderBottom: '2px solid #ddd',
    backgroundColor: '#fff',
  },
  tab: {
    padding: '1rem 1.5rem',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#666',
    borderBottom: '3px solid transparent',
    backgroundColor: '#f5f5f5',
    border: 'none',
  },
  tabActive: {
    color: '#2d5f6f',
    borderBottom: '3px solid #2d5f6f',
    backgroundColor: '#fff',
  },
  content: {
    padding: '1.5rem',
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginBottom: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '0.4rem',
    color: '#1a1a1a',
  },
  input: {
    padding: '0.65rem 0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
  },
  inputReadOnly: {
    padding: '0.65rem 0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    backgroundColor: '#f8f8f8',
    color: '#666',
    cursor: 'not-allowed',
  },
  textarea: {
    padding: '0.65rem 0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    minHeight: '80px',
    resize: 'vertical',
  },
  fileInput: {
    padding: '0.5rem',
    border: '2px dashed #2d5f6f',
    borderRadius: '4px',
    fontSize: '0.95rem',
    cursor: 'pointer',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
    marginTop: '2rem',
    padding: '2rem 1.5rem 1.5rem',
    borderTop: '1px solid #ddd',
    backgroundColor: '#fff',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  submitButton: {
    backgroundColor: '#2d5f6f',
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
  fileList: {
    marginTop: '1rem',
    padding: '1rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
  },
  fileItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  modal: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '2rem',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
  },
  modalTitle: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2d5f6f',
    marginBottom: '1rem',
  },
  modalDescription: {
    fontSize: '0.95rem',
    color: '#333',
    marginBottom: '1.5rem',
    lineHeight: '1.5',
  },
  modalButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
  },
  modalButton: {
    padding: '0.75rem 1.5rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  publicButton: {
    backgroundColor: '#28a745',
    color: '#fff',
  },
  privateButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
  },
};

const getTodayDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function RegistroFormTabs({ onSubmit, onClose, loading = false }: RegistroFormTabsProps) {
  const [activeTab, setActiveTab] = useState<'datos' | 'almacenamiento' | 'archivos'>('datos');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [showVisibilityModal, setShowVisibilityModal] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    arc_codi: '',
    arc_fech: getTodayDate(),
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
    arc_esta: '',
    arc_conA: '',
    arc_conR: '',
    arc_leng: '',
    arc_orco: true,
    arc_lugD: '',
    arc_ubsa: '',
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
  });

  useEffect(() => {
    const fetchNextCode = async () => {
      try {
        const response = await api.get('/registros/next_code/');
        setFormData(prev => ({
          ...prev,
          arc_codi: response.data.next_code,
        }));
      } catch (error) {
        console.error('Error fetching next code:', error);
        setFormData(prev => ({
          ...prev,
          arc_codi: 1,
        }));
      }
    };
    fetchNextCode();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as any;
    const { name, value, type, checked } = target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'arc_año' ? parseInt(value) || 0 : value),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowVisibilityModal(true);
  };

  const handleSubmitWithVisibility = (isPublic: boolean) => {
    const formDataWithFiles = {
      ...formData,
      arc_visw: isPublic,
      archivos: selectedFiles,
    };
    setShowVisibilityModal(false);
    onSubmit(formDataWithFiles);
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabsContainer}>
        <button
          onClick={() => setActiveTab('datos')}
          style={{
            ...styles.tab,
            ...(activeTab === 'datos' ? styles.tabActive : {}),
          }}
        >
           Datos Principales
        </button>
        <button
          onClick={() => setActiveTab('almacenamiento')}
          style={{
            ...styles.tab,
            ...(activeTab === 'almacenamiento' ? styles.tabActive : {}),
          }}
        >
           Almacenamiento
        </button>
        <button
          onClick={() => setActiveTab('archivos')}
          style={{
            ...styles.tab,
            ...(activeTab === 'archivos' ? styles.tabActive : {}),
          }}
        >
           Archivos
        </button>
      </div>

      <form onSubmit={handleSubmit} style={styles.content}>
        {/* TAB: DATOS PRINCIPALES */}
        {activeTab === 'datos' && (
          <>
            <div style={styles.section}>
              <div style={styles.sectionTitle}>INFORMACIÓN BÁSICA</div>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Código</label>
                  <input type="text" name="arc_codi" value={formData.arc_codi} style={styles.inputReadOnly} readOnly />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Fecha *</label>
                  <input type="date" name="arc_fech" value={formData.arc_fech} onChange={handleChange} style={styles.input as CSSProperties} required />
                </div>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Título *</label>
                <input type="text" name="arc_titu" value={formData.arc_titu} onChange={handleChange} style={styles.input as CSSProperties} required placeholder="Título" />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Descripción</label>
                <textarea name="arc_desc" value={formData.arc_desc} onChange={handleChange} style={styles.textarea as CSSProperties} placeholder="Descripción" />
              </div>
            </div>

            <div style={styles.section}>
              <div style={styles.sectionTitle}>REFERENCIAS Y CLASIFICACIÓN</div>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Origen</label>
                  <input type="text" name="arc_orig" value={formData.arc_orig} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Categoría</label>
                  <input type="text" name="arc_cate" value={formData.arc_cate} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <div style={styles.sectionTitle}>NUMERACIÓN Y FECHAS</div>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Año</label>
                  <input type="number" name="arc_año" value={formData.arc_año} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Número Protocolar</label>
                  <input type="text" name="arc_npro" value={formData.arc_npro} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Segmento</label>
                  <input type="text" name="arc_seg" value={formData.arc_seg} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <div style={styles.sectionTitle}>ASUNTO Y ALCANCES</div>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Tema</label>
                  <input type="text" name="arc_tema" value={formData.arc_tema} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Área</label>
                  <input type="text" name="arc_area" value={formData.arc_area} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Asunto</label>
                <input type="text" name="arc_asun" value={formData.arc_asun} onChange={handleChange} style={styles.input as CSSProperties} />
              </div>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Iniciador</label>
                  <input type="text" name="arc_inic" value={formData.arc_inic} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Destinatario</label>
                  <input type="text" name="arc_dest" value={formData.arc_dest} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <div style={styles.sectionTitle}>GRUPOS Y SERIES</div>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Grupo</label>
                  <input type="text" name="arc_grup" value={formData.arc_grup} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Serie</label>
                  <input type="text" name="arc_seri" value={formData.arc_seri} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Subserie</label>
                  <input type="text" name="arc_sser" value={formData.arc_sser} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB: ALMACENAMIENTO */}
        {activeTab === 'almacenamiento' && (
          <>
            <div style={styles.section}>
              <div style={styles.sectionTitle}>CONSERVACIÓN</div>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Soporte</label>
                  <input type="text" name="arc_sopo" value={formData.arc_sopo} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Estado</label>
                  <input type="text" name="arc_esta" value={formData.arc_esta} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
              </div>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Condición Acceso</label>
                  <input type="text" name="arc_conA" value={formData.arc_conA} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Condición Reproducción</label>
                  <input type="text" name="arc_conR" value={formData.arc_conR} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
              </div>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Lengua</label>
                  <input type="text" name="arc_leng" value={formData.arc_leng} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Lugar Destino</label>
                  <input type="text" name="arc_lugD" value={formData.arc_lugD} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
              </div>
              <div style={{ ...styles.formGroup, marginTop: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="arc_orco" checked={formData.arc_orco} onChange={handleChange} />
                  <span style={styles.label}>Original / Copia</span>
                </label>
              </div>
            </div>

            <div style={styles.section}>
              <div style={styles.sectionTitle}>UBICACIÓN FÍSICA EN ALMACÉN</div>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Sala</label>
                  <input type="text" name="arc_ubsa" value={formData.arc_ubsa} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Pasillo</label>
                  <input type="text" name="arc_pasi" value={formData.arc_pasi} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Estantería</label>
                  <input type="text" name="arc_estan" value={formData.arc_estan} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
              </div>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Casillero</label>
                  <input type="text" name="arc_casi" value={formData.arc_casi} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Caja Número</label>
                  <input type="text" name="arc_caja" value={formData.arc_caja} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <div style={styles.sectionTitle}>NUMERACIÓN DE DOCUMENTOS</div>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Legajo</label>
                  <input type="text" name="arc_lega" value={formData.arc_lega} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Número</label>
                  <input type="text" name="arc_nume" value={formData.arc_nume} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Folios</label>
                  <input type="text" name="arc_foli" value={formData.arc_foli} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
              </div>
              <div style={styles.grid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Hoja</label>
                  <input type="text" name="arc_hoja" value={formData.arc_hoja} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Medidas</label>
                  <input type="text" name="arc_medi" value={formData.arc_medi} onChange={handleChange} style={styles.input as CSSProperties} />
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <div style={styles.sectionTitle}>OBSERVACIONES</div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nota Archivero</label>
                <textarea name="arc_obse" value={formData.arc_obse} onChange={handleChange} style={styles.textarea as CSSProperties} placeholder="Observaciones" />
              </div>
            </div>
          </>
        )}

        {/* TAB: ARCHIVOS */}
        {activeTab === 'archivos' && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>SUBIR ARCHIVOS (PDF, Imágenes, etc.)</div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Seleccionar archivos</label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                style={styles.fileInput as CSSProperties}
                accept=".pdf,.jpg,.jpeg,.png,.gif,.doc,.docx"
              />
              <small style={{ color: '#999', marginTop: '0.25rem' }}>
                Formatos permitidos: PDF, imágenes (JPG, PNG, GIF) y documentos (DOC, DOCX)
              </small>
            </div>

            {selectedFiles.length > 0 && (
              <div style={styles.fileList as CSSProperties}>
                <h4 style={{ margin: '0 0 0.5rem 0' }}>Archivos seleccionados ({selectedFiles.length}):</h4>
                {selectedFiles.map((file, index) => (
                  <div key={index} style={styles.fileItem as CSSProperties}>
                    <span>{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: '#ff6b6b',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                      }}
                    >
                      ✕ Eliminar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={styles.buttonGroup as CSSProperties}>
          <button type="button" onClick={onClose} style={{ ...styles.button, ...styles.cancelButton } as CSSProperties} disabled={loading}>
            Cancelar
          </button>
          <button type="submit" disabled={loading} style={{ ...styles.button, ...styles.submitButton, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' } as CSSProperties}>
            {loading ? 'Guardando...' : '✓ Guardar Registro'}
          </button>
        </div>
      </form>

      {/* MODAL DE VISIBILIDAD */}
      {showVisibilityModal && (
        <div style={styles.modal as CSSProperties}>
          <div style={styles.modalContent as CSSProperties}>
            <div style={styles.modalTitle}>Establecer Visibilidad del Registro</div>
            <div style={styles.modalDescription}>
              Selecciona si deseas que este registro sea visible al público sin necesidad de login, o si debe ser privado (solo accesible para usuarios logueados).
            </div>
            <div style={styles.modalButtons as CSSProperties}>
              <button
                type="button"
                onClick={() => handleSubmitWithVisibility(false)}
                style={{ ...styles.modalButton, ...styles.privateButton } as CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Privado (Solo Logueados)
              </button>
              <button
                type="button"
                onClick={() => handleSubmitWithVisibility(true)}
                style={{ ...styles.modalButton, ...styles.publicButton } as CSSProperties}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Público
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
