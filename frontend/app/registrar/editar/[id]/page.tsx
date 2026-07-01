'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/lib/api';
import '../../crear/page.css';

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
  archivos?: Array<{ id: number; archivo: string; nombre: string }>;
}

interface RegistroResponse extends FormData {
  arc_codi: number;
}

export default function EditarRegistroPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
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
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showVisibilityModal, setShowVisibilityModal] = useState(false);
  const [archivos, setArchivos] = useState<any[]>([]);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [fileUploadSuccess, setFileUploadSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      loadRegistro();
    }
  }, [id]);

  const loadRegistro = async () => {
    try {
      setLoading(true);
      const response = await api.get<RegistroResponse>(`/registros/${id}/`);
      console.log('Registro cargado:', response.data);
      console.log('Archivos:', response.data.archivos);
      setFormData(response.data);
      setArchivos(response.data.archivos || []);
      setError(null);
    } catch (err) {
      console.error('Error loading registro:', err);
      setError('No se pudo cargar el registro. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowVisibilityModal(true);
  };

  const handleConfirmVisibility = async (isPublic: boolean) => {
    setShowVisibilityModal(false);
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const dataToSend = {
        ...formData,
        arc_visw: isPublic,
      };
      await api.put(`/registros/${id}/`, dataToSend);
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/registros');
      }, 2000);
    } catch (err: any) {
      console.error('Error updating registro:', err);
      setError(err.response?.data?.detail || 'Error al actualizar el registro. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingFile(true);
    let successCount = 0;
    let errorMsg = '';

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formDataFile = new FormData();
        formDataFile.append('archivo', file);
        formDataFile.append('registro', id);
        formDataFile.append('nombre', file.name);
        formDataFile.append('tipo', getFileType(file.type));

        try {
          const fileResponse = await api.post('/archivos/', formDataFile, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          successCount++;
        } catch (err) {
          errorMsg = `Error al cargar ${file.name}`;
        }
      }

      if (successCount > 0) {
        setFileUploadSuccess(true);
        // Recargar archivos
        const response = await api.get(`/registros/${id}/`);
        setArchivos(response.data.archivos || []);
        setTimeout(() => setFileUploadSuccess(false), 2000);
      }

      if (errorMsg) {
        setError(errorMsg);
        setTimeout(() => setError(null), 2000);
      }

      // Limpiar input
      e.target.value = '';
    } catch (err: any) {
      console.error('Error uploading files:', err);
      setError('Error al cargar los archivos.');
      setTimeout(() => setError(null), 2000);
    } finally {
      setUploadingFile(false);
    }
  };

  const handleDeleteFile = async (archivoId: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este archivo?')) {
      return;
    }

    try {
      await api.delete(`/archivos/${archivoId}/`);
      setArchivos(archivos.filter((a) => a.id !== archivoId));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err: any) {
      console.error('Error deleting file:', err);
      setError('Error al eliminar el archivo. Intenta de nuevo.');
      setTimeout(() => setError(null), 2000);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="form-page">
        <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="form-page">
        <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando registro...</div>
      </div>
    );
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
      <h1 className="form-title">{formData.arc_codi && formData.arc_titu ? `${formData.arc_codi} - ${formData.arc_titu}` : 'Editar Registro Histórico'}</h1>

        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">¡Registro actualizado correctamente! Redirigiendo...</div>}
        {fileUploadSuccess && <div className="form-success">Archivo(s) cargado(s) exitosamente</div>}

        <form onSubmit={handleSubmit}>
          {/* TABS */}
          <div className="tab-container">
            <button
              type="button"
              className={`tab-button ${tab === 'datos' ? 'active' : ''}`}
              onClick={() => setTab('datos')}
            >
              DATOS PRINCIPALES
            </button>
            <button
              type="button"
              className={`tab-button ${tab === 'almacenamiento' ? 'active' : ''}`}
              onClick={() => setTab('almacenamiento')}
            >
              ALMACENAMIENTO
            </button>
            <button
              type="button"
              className={`tab-button ${tab === 'archivos' ? 'active' : ''}`}
              onClick={() => setTab('archivos')}
            >
              ARCHIVOS
            </button>
          </div>

          {/* TAB: DATOS PRINCIPALES */}
          {tab === 'datos' && (
            <>
              <div className="section-header">DATOS PRINCIPALES DE REGISTRO</div>
              <div className="section-content">
                <div className="form-grid date-title">
                  <div className="form-group">
                    <label className="form-label required">FECHA RECEPCIÓN</label>
                    <input
                      type="date"
                      name="arc_fech"
                      className="form-input"
                      value={formData.arc_fech}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label required">TÍTULO REFERENCIA</label>
                    <input
                      type="text"
                      name="arc_titu"
                      className="form-input"
                      value={formData.arc_titu}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                  </div>
                </div>
                <div className="form-grid full">
                  <div className="form-group">
                    <label className="form-label">DESCRIPCIÓN BREVE</label>
                    <textarea
                      name="arc_desc"
                      className="form-textarea"
                      value={formData.arc_desc}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <div className="section-header">REFERENCIAS Y CLASIFICACIÓN</div>
              <div className="section-content">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">ORIGEN</label>
                    <input
                      type="text"
                      name="arc_orig"
                      className="form-input"
                      value={formData.arc_orig}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CATEGORÍA</label>
                    <input
                      type="text"
                      name="arc_cate"
                      className="form-input"
                      value={formData.arc_cate}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <div className="section-header">NUMERACIÓN Y FECHAS</div>
              <div className="section-content">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">AÑO</label>
                    <input
                      type="number"
                      name="arc_año"
                      className="form-input"
                      value={formData.arc_año}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">NÚMERO PROTOCOLAR</label>
                    <input
                      type="text"
                      name="arc_npro"
                      className="form-input"
                      value={formData.arc_npro}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">SEGMENTO</label>
                    <select
                      name="arc_seg"
                      className="form-select"
                      value={formData.arc_seg}
                      onChange={handleChange}
                      disabled={loading}
                    >
                      <option value="">Seleccionar</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="section-header">ASUNTO Y ALCANCES</div>
              <div className="section-content">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">TEMA</label>
                    <input
                      type="text"
                      name="arc_tema"
                      className="form-input"
                      value={formData.arc_tema}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ÁREA</label>
                    <input
                      type="text"
                      name="arc_area"
                      className="form-input"
                      value={formData.arc_area}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="form-grid full">
                  <div className="form-group">
                    <label className="form-label">ASUNTO</label>
                    <textarea
                      name="arc_asun"
                      className="form-textarea"
                      value={formData.arc_asun}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">INICIADOR</label>
                    <input
                      type="text"
                      name="arc_inic"
                      className="form-input"
                      value={formData.arc_inic}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">DESTINATARIO</label>
                    <input
                      type="text"
                      name="arc_dest"
                      className="form-input"
                      value={formData.arc_dest}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB: ALMACENAMIENTO */}
          {tab === 'almacenamiento' && (
            <>
              <div className="section-header">GRUPOS Y SERIES</div>
              <div className="section-content">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">GRUPO</label>
                    <input
                      type="text"
                      name="arc_grup"
                      className="form-input"
                      value={formData.arc_grup}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">SERIE</label>
                    <input
                      type="text"
                      name="arc_seri"
                      className="form-input"
                      value={formData.arc_seri}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">SUBSERIE</label>
                    <input
                      type="text"
                      name="arc_sser"
                      className="form-input"
                      value={formData.arc_sser}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <div className="section-header">CONSERVACIÓN Y UBICACIÓN</div>
              <div className="section-content">
                {/* PRINCIPALES: Soporte, Estado, Condiciones, Lengua, Original/Copia */}
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">SOPORTE</label>
                    <input
                      type="text"
                      name="arc_sopo"
                      className="form-input"
                      value={formData.arc_sopo}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ESTADO CONSERVACIÓN</label>
                    <select
                      name="arc_esta"
                      className="form-select"
                      value={formData.arc_esta}
                      onChange={handleChange}
                      disabled={loading}
                    >
                      <option value="EXCELENTE">EXCELENTE</option>
                      <option value="BUENO">BUENO</option>
                      <option value="REGULAR">REGULAR</option>
                      <option value="MALO">MALO</option>
                    </select>
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">COND. DE ACCESO</label>
                    <select
                      name="arc_conA"
                      className="form-select"
                      value={formData.arc_conA}
                      onChange={handleChange}
                      disabled={loading}
                    >
                      <option value="EXCELENTE">EXCELENTE</option>
                      <option value="BUENO">BUENO</option>
                      <option value="REGULAR">REGULAR</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">COND. DE REPRODUCCIÓN</label>
                    <select
                      name="arc_conR"
                      className="form-select"
                      value={formData.arc_conR}
                      onChange={handleChange}
                      disabled={loading}
                    >
                      <option value="EXCELENTE">EXCELENTE</option>
                      <option value="BUENO">BUENO</option>
                      <option value="REGULAR">REGULAR</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">LENGUA ESCRITURA</label>
                    <input
                      type="text"
                      name="arc_leng"
                      className="form-input"
                      value={formData.arc_leng}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">ORIGINAL / COPIA</label>
                    <select
                      name="arc_orco"
                      className="form-select"
                      value={formData.arc_orco ? 'SI' : 'NO'}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          arc_orco: e.target.value === 'SI',
                        }));
                      }}
                      disabled={loading}
                    >
                      <option value="SI">ORIGINAL</option>
                      <option value="NO">COPIA</option>
                    </select>
                  </div>
                </div>

                {/* UBICACIÓN: Lugar Destino, Sala, Pasillo, Estantería, Casillero */}
                <div className="form-grid full">
                  <div className="form-group">
                    <label className="form-label">LUGAR DESTINO</label>
                    <input
                      type="text"
                      name="arc_lugD"
                      className="form-input"
                      value={formData.arc_lugD}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="form-grid full">
                  <div className="form-group">
                    <label className="form-label">UBICACIÓN SALA</label>
                    <input
                      type="text"
                      name="arc_ubsa"
                      className="form-input"
                      value={formData.arc_ubsa}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">PASILLO</label>
                    <input
                      type="text"
                      name="arc_pasi"
                      className="form-input"
                      value={formData.arc_pasi}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ESTANTERÍA</label>
                    <input
                      type="text"
                      name="arc_estan"
                      className="form-input"
                      value={formData.arc_estan}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CASILLERO</label>
                    <input
                      type="text"
                      name="arc_casi"
                      className="form-input"
                      value={formData.arc_casi}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* NUMERACIÓN: Caja, Legajo, Número, Folios, Hojas, Medidas */}
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">CAJA NRO</label>
                    <input
                      type="text"
                      name="arc_caja"
                      className="form-input"
                      value={formData.arc_caja}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">LEGAJO</label>
                    <input
                      type="text"
                      name="arc_lega"
                      className="form-input"
                      value={formData.arc_lega}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">NÚMERO</label>
                    <input
                      type="text"
                      name="arc_nume"
                      className="form-input"
                      value={formData.arc_nume}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">FOLIOS</label>
                    <input
                      type="text"
                      name="arc_foli"
                      className="form-input"
                      value={formData.arc_foli}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">HOJAS</label>
                    <input
                      type="text"
                      name="arc_hoja"
                      className="form-input"
                      value={formData.arc_hoja}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">MEDIDAS</label>
                    <input
                      type="text"
                      name="arc_medi"
                      className="form-input"
                      value={formData.arc_medi}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              <div className="section-header">OBSERVACIONES</div>
              <div className="section-content">
                <div className="form-grid full">
                  <div className="form-group">
                    <label className="form-label">NOTA ARCHIVERO</label>
                    <textarea
                      name="arc_obse"
                      className="form-textarea"
                      value={formData.arc_obse}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB: ARCHIVOS */}
          {tab === 'archivos' && (
            <>
              <div className="section-header">ARCHIVOS ADJUNTOS</div>
              <div className="section-content">
                {/* ÁREA DE CARGA */}
                <div className="form-grid full">
                  <label htmlFor="file-upload" style={{
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
                      id="file-upload"
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      disabled={uploadingFile}
                      style={{
                        display: 'none',
                      }}
                    />
                  </label>
                </div>

                {/* LISTA DE ARCHIVOS */}
                {archivos && archivos.length > 0 && (
                  <div className="form-grid full" style={{ marginTop: 'var(--spacing-lg)' }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--spacing-sm)',
                    }}>
                      {archivos.map((archivo) => {
                        const ext = archivo.nombre ? archivo.nombre.split('.').pop()?.toLowerCase() || 'archivo' : 'archivo';
                        return (
                          <div key={archivo.id} style={{
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
                                  {archivo.nombre}
                                </span>
                                <span style={{
                                  color: '#999',
                                  fontSize: '0.85rem',
                                }}>
                                  .{ext}
                                </span>
                              </div>
                            </div>
                            <div style={{
                              display: 'flex',
                              gap: 'var(--spacing-sm)',
                              alignItems: 'center',
                            }}>
                              <a
                                href={getFileUrl(archivo.archivo)}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  padding: '0.5rem 1rem',
                                  backgroundColor: '#0d6efd',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontWeight: '600',
                                  fontSize: '0.85rem',
                                  textDecoration: 'none',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = '#0a58ca';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = '#0d6efd';
                                }}
                              >
                                Visualizar
                              </a>
                              <button
                                onClick={() => handleDeleteFile(archivo.id)}
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
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
            <button type="button" className="btn-cancel" onClick={() => router.back()} disabled={loading}>
              Cancelar
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
