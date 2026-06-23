'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/lib/api';
import '../../registrar/crear/page.css';

interface Registro {
  arc_codi: number;
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
  archivos?: Array<{
    id: number;
    nombre: string;
    archivo: string;
    tipo: string;
  }>;
}

export default function RegistroDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [registro, setRegistro] = useState<Registro | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si el usuario está autenticado, redirigir a la página de edición
    const token = localStorage.getItem('access_token');
    if (token) {
      router.push(`/registrar/editar/${id}`);
      return;
    }

    // Si no está autenticado, cargar la vista de solo lectura
    fetchRegistro();
  }, [id]);

  const fetchRegistro = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/public/registros/${id}/`);
      setRegistro(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching registro:', err);
      setError('No se pudo cargar el registro. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="form-page">
        <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando registro...</div>
      </div>
    );
  }

  if (error || !registro) {
    return (
      <div className="form-page">
        <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
          <div className="form-error">{error || 'Registro no encontrado'}</div>
          <button
            onClick={() => router.back()}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              marginTop: '1rem',
            }}
          >
            ← Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="form-page">
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 var(--spacing-md)' }}>
        <button
          onClick={() => router.back()}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            marginBottom: '1.5rem',
          }}
        >
          ← Volver
        </button>

        <h1 className="form-title">{registro.arc_titu}</h1>

        <div className="section-header">INFORMACIÓN DEL DOCUMENTO</div>
        <div className="section-content">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">CAJA</label>
              <div style={{ padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                {registro.arc_caja || '-'}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">LEGAJO</label>
              <div style={{ padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                {registro.arc_lega || '-'}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">FOLIO</label>
              <div style={{ padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                {registro.arc_foli || '-'}
              </div>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">CANTIDAD DE FOLIOS</label>
              <div style={{ padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                {registro.arc_hoja || '-'}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">AÑO</label>
              <div style={{ padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                {registro.arc_año || '-'}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">FECHA</label>
              <div style={{ padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                {registro.arc_fech ? new Date(registro.arc_fech).toLocaleDateString('es-AR') : '-'}
              </div>
            </div>
          </div>

          <div className="form-grid full">
            <div className="form-group">
              <label className="form-label">CONTENIDO</label>
              <div style={{ padding: '0.75rem', backgroundColor: '#f8f9fa', borderRadius: '4px', border: '1px solid #dee2e6', minHeight: '60px', display: 'flex', alignItems: 'center' }}>
                {registro.arc_titu || '-'}
              </div>
            </div>
          </div>
        </div>

        {registro.archivos && registro.archivos.length > 0 && (
          <>
            <div className="section-header">ARCHIVOS ADJUNTOS</div>
            <div className="section-content">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {registro.archivos.map((archivo) => {
                  const ext = archivo.nombre
                    ? archivo.nombre.split('.').pop()?.toUpperCase() || 'FILE'
                    : 'FILE';
                  return (
                    <div
                      key={archivo.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '1rem',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '6px',
                        border: '1px solid #dee2e6',
                      }}
                    >
                      <div>
                        <strong>{archivo.nombre}</strong>
                        <div style={{ fontSize: '0.85rem', color: '#666' }}>
                          {ext}
                        </div>
                      </div>
                      <a
                        href={archivo.archivo}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '0.6rem 1.2rem',
                          backgroundColor: '#2d5f6f',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '4px',
                          fontWeight: '600',
                          fontSize: '0.85rem',
                        }}
                      >
                        Descargar
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
