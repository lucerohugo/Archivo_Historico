'use client';

import React, { useState } from 'react';

interface RegistroFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  loading?: boolean;
}

const styles = {
  overlay: {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
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
    flexDirection: 'column' as const,
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
    transition: 'border-color 0.3s ease',
  },
  textarea: {
    padding: '0.65rem 0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    minHeight: '80px',
    resize: 'vertical' as const,
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end',
    marginTop: '2rem',
    paddingTop: '2rem',
    borderTop: '1px solid #ddd',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  submitButton: {
    backgroundColor: '#2d5f6f',
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
};

export default function RegistroForm({ onSubmit, onClose, loading = false }: RegistroFormProps) {
  const [formData, setFormData] = useState({
    arc_codi: '',
    arc_fech: '',
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
    arc_meta: '',
    arc_obse: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.overlay}>
      <div style={styles.section}>
        <div style={styles.sectionTitle}>DATOS PRINCIPALES DE REGISTRO</div>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Código *</label>
            <input type="text" name="arc_codi" value={formData.arc_codi} onChange={handleChange} style={styles.input} required placeholder="ARQ-2026-001" />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Fecha *</label>
            <input type="date" name="arc_fech" value={formData.arc_fech} onChange={handleChange} style={styles.input} required />
          </div>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Título *</label>
          <input type="text" name="arc_titu" value={formData.arc_titu} onChange={handleChange} style={styles.input} required placeholder="Título" />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Descripción</label>
          <textarea name="arc_desc" value={formData.arc_desc} onChange={handleChange} style={styles.textarea} placeholder="Descripción" />
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>REFERENCIAS Y CLASIFICACIÓN</div>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Origen</label>
            <input type="text" name="arc_orig" value={formData.arc_orig} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Categoría</label>
            <input type="text" name="arc_cate" value={formData.arc_cate} onChange={handleChange} style={styles.input} />
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>NUMERACIÓN Y FECHAS</div>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Año</label>
            <input type="number" name="arc_año" value={formData.arc_año} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Número Protocolar</label>
            <input type="text" name="arc_npro" value={formData.arc_npro} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Segmento</label>
            <input type="text" name="arc_seg" value={formData.arc_seg} onChange={handleChange} style={styles.input} />
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>ASUNTO Y ALCANCES</div>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Tema</label>
            <input type="text" name="arc_tema" value={formData.arc_tema} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Área</label>
            <input type="text" name="arc_area" value={formData.arc_area} onChange={handleChange} style={styles.input} />
          </div>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Asunto</label>
          <input type="text" name="arc_asun" value={formData.arc_asun} onChange={handleChange} style={styles.input} />
        </div>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Iniciador</label>
            <input type="text" name="arc_inic" value={formData.arc_inic} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Destinatario</label>
            <input type="text" name="arc_dest" value={formData.arc_dest} onChange={handleChange} style={styles.input} />
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}> GRUPOS Y SERIES</div>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Grupo</label>
            <input type="text" name="arc_grup" value={formData.arc_grup} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Serie</label>
            <input type="text" name="arc_seri" value={formData.arc_seri} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Subserie</label>
            <input type="text" name="arc_sser" value={formData.arc_sser} onChange={handleChange} style={styles.input} />
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>🏪 CONSERVACIÓN Y UBICACIÓN</div>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Soporte</label>
            <input type="text" name="arc_sopo" value={formData.arc_sopo} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Estado</label>
            <input type="text" name="arc_esta" value={formData.arc_esta} onChange={handleChange} style={styles.input} />
          </div>
        </div>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Condición Acceso</label>
            <input type="text" name="arc_conA" value={formData.arc_conA} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Condición Reproducción</label>
            <input type="text" name="arc_conR" value={formData.arc_conR} onChange={handleChange} style={styles.input} />
          </div>
        </div>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Lengua</label>
            <input type="text" name="arc_leng" value={formData.arc_leng} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Lugar Destino</label>
            <input type="text" name="arc_lugD" value={formData.arc_lugD} onChange={handleChange} style={styles.input} />
          </div>
        </div>
        <div style={{ ...styles.formGroup, marginTop: '0.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" name="arc_orco" checked={formData.arc_orco} onChange={handleChange} style={{ cursor: 'pointer' }} />
            <span style={styles.label}>Original / Copia</span>
          </label>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}> UBICACIÓN FÍSICA EN ALMACÉN</div>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Sala</label>
            <input type="text" name="arc_ubsa" value={formData.arc_ubsa} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Pasillo</label>
            <input type="text" name="arc_pasi" value={formData.arc_pasi} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Estantería</label>
            <input type="text" name="arc_estan" value={formData.arc_estan} onChange={handleChange} style={styles.input} />
          </div>
        </div>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Casillero</label>
            <input type="text" name="arc_casi" value={formData.arc_casi} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Caja Número</label>
            <input type="text" name="arc_caja" value={formData.arc_caja} onChange={handleChange} style={styles.input} />
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}>NUMERACIÓN DE DOCUMENTOS</div>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Legajo</label>
            <input type="text" name="arc_lega" value={formData.arc_lega} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Número</label>
            <input type="text" name="arc_nume" value={formData.arc_nume} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Folios</label>
            <input type="text" name="arc_foli" value={formData.arc_foli} onChange={handleChange} style={styles.input} />
          </div>
        </div>
        <div style={styles.grid}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Hoja</label>
            <input type="text" name="arc_hoja" value={formData.arc_hoja} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Medidas</label>
            <input type="text" name="arc_medi" value={formData.arc_medi} onChange={handleChange} style={styles.input} />
          </div>
        </div>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionTitle}> METADATA Y OBSERVACIONES</div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Metadata</label>
          <textarea name="arc_meta" value={formData.arc_meta} onChange={handleChange} style={styles.textarea} placeholder="Información técnica" />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nota Archivero</label>
          <textarea name="arc_obse" value={formData.arc_obse} onChange={handleChange} style={styles.textarea} placeholder="Observaciones" />
        </div>
      </div>

      <div style={styles.buttonGroup}>
        <button type="button" onClick={onClose} style={{ ...styles.button, ...styles.cancelButton }} disabled={loading}>
          Cancelar
        </button>
        <button type="submit" disabled={loading} style={{ ...styles.button, ...styles.submitButton, opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Guardando...' : '✓ Guardar Registro'}
        </button>
      </div>
    </form>
  );
}
