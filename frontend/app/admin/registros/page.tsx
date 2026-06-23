'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';

interface Registro {
  arc_codi: number;
  arc_titu: string;
  arc_desc: string;
  arc_fech: string;
  arc_año: number;
  arc_cate: string;
  arc_tema: string;
  arc_visw: boolean;
  archivos: Array<{
    id: number;
    nombre: string;
    archivo: string;
    tipo: string;
  }>;
}

// Construir URL completa del archivo
const getFileUrl = (filePath: string): string => {
  if (!filePath) return '';
  if (filePath.startsWith('http')) return filePath;
  const baseUrl = 'http://localhost:8000';
  return `${baseUrl}${filePath}`;
};

export default function AdminRegistrosPage() {
  const router = useRouter();
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [filteredRegistros, setFilteredRegistros] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | ''>('');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchRegistros();
  }, []);

  useEffect(() => {
    filterRegistros();
  }, [registros, searchTerm, selectedYear, fechaDesde, fechaHasta]);

  const fetchRegistros = async () => {
    try {
      setLoading(true);
      const response = await api.get('/registros/');
      setRegistros(response.data.results || response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching registros:', err);
      setError('No se pudieron cargar los registros. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  // Función para parsear fechas sin problema de zona horaria
  const parseDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // Función para formatear fecha sin perder un día
  const formatDate = (dateString: string): string => {
    const date = parseDate(dateString);
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const filterRegistros = () => {
    let filtered = registros;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.arc_titu.toLowerCase().includes(term) ||
          r.arc_desc?.toLowerCase().includes(term) ||
          r.arc_cate?.toLowerCase().includes(term)
      );
    }

    if (selectedYear !== '') {
      filtered = filtered.filter((r) => r.arc_año === selectedYear);
    }

    if (fechaDesde) {
      const desde = parseDate(fechaDesde);
      filtered = filtered.filter((r) => parseDate(r.arc_fech) >= desde);
    }

    if (fechaHasta) {
      const hasta = parseDate(fechaHasta);
      hasta.setHours(23, 59, 59, 999);
      filtered = filtered.filter((r) => parseDate(r.arc_fech) <= hasta);
    }

    setFilteredRegistros(filtered);
    setPage(1);
  };

  const handleDeleteRegistro = async (id: number, titulo: string) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar el registro "${titulo}"?`)) {
      return;
    }

    try {
      await api.delete(`/registros/${id}/`);
      setRegistros(registros.filter((r) => r.arc_codi !== id));
      setError(null);
    } catch (err: any) {
      console.error('Error deleting registro:', err);
      setError('Error al eliminar el registro. Intenta de nuevo.');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const paginatedRegistros = filteredRegistros.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredRegistros.length / itemsPerPage);

  if (loading) {
    return (
      <div className="registros-page">
        <div className="registros-container">
          <div className="loading">Cargando registros...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="registros-page">
      <div className="registros-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={() => router.push('/registrar')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              fontSize: '0.95rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#5a6268';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#6c757d';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ← Volver
          </button>
          <h1 className="page-title" style={{ marginBottom: '0', flex: 1 }}>TODOS LOS REGISTROS HISTÓRICOS (ADMIN)</h1>
        </div>

        {error && <div className="form-error">{error}</div>}

        <div className="search-section">
          <label className="search-label">Buscar y Filtrar</label>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar por código, título o año..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="filter-section">
            <div className="filter-group">
              <label className="filter-label">Filtrar por Año</label>
              <select
                className="filter-input"
                value={selectedYear === '' ? '' : selectedYear}
                onChange={(e) => setSelectedYear(e.target.value === '' ? '' : Number(e.target.value))}
              >
                <option value="">Todos los años</option>
                {[...new Set(registros.map(r => r.arc_año))].sort((a, b) => (b || 0) - (a || 0)).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label">Fecha Desde</label>
              <input
                type="date"
                className="filter-input"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label className="filter-label">Fecha Hasta</label>
              <input
                type="date"
                className="filter-input"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}
              />
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedYear('');
                setFechaDesde('');
                setFechaHasta('');
              }}
              className="filter-button"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>

        {loading ? (
          <div className="empty-message">Cargando registros...</div>
        ) : paginatedRegistros.length === 0 ? (
          <div className="empty-message">
            {registros.length === 0
              ? 'No hay registros disponibles en este momento.'
              : 'No se encontraron registros que coincidan con tu búsqueda.'}
          </div>
        ) : (
          <>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Fecha</th>
                    <th>Título Referencia</th>
                    <th>Año</th>
                    <th>Visibilidad</th>
                    <th>Archivos</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRegistros.map((registro) => (
                    <tr key={registro.arc_codi} className="table-row">
                      <td className="table-cell">
                        <Link href={`/registros/${registro.arc_codi}`} className="table-link">
                          {registro.arc_codi}
                        </Link>
                      </td>
                      <td className="table-cell">{formatDate(registro.arc_fech)}</td>
                      <td className="table-cell">{registro.arc_titu}</td>
                      <td className="table-cell">{registro.arc_año || '-'}</td>
                      <td className="table-cell">
                        <span
                          style={{
                            padding: '0.3rem 0.6rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            backgroundColor: registro.arc_visw ? '#d4edda' : '#f8d7da',
                            color: registro.arc_visw ? '#155724' : '#721c24',
                          }}
                        >
                          {registro.arc_visw ? 'PÚBLICO' : 'PRIVADO'}
                        </span>
                      </td>
                      <td className="table-cell">
                        {registro.archivos && registro.archivos.length > 0 ? (
                          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {registro.archivos.map((archivo) => {
                              const ext = archivo.nombre ? archivo.nombre.split('.').pop()?.toUpperCase() || 'FILE' : 'FILE';
                              const fileUrl = getFileUrl(archivo.archivo);
                              return (
                                <a
                                  key={archivo.id}
                                  href={fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="action-button"
                                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem', textDecoration: 'none', fontWeight: '700' }}
                                  title={archivo.nombre}
                                >
                                  {ext}
                                </a>
                              );
                            })}
                          </div>
                        ) : (
                          <span style={{ color: '#999' }}>-</span>
                        )}
                      </td>
                      <td className="table-cell">
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <button
                            onClick={() => router.push(`/registrar/editar/${registro.arc_codi}`)}
                            style={{
                              padding: '0.4rem 0.8rem',
                              backgroundColor: '#0d6efd',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontWeight: '600',
                              fontSize: '0.75rem',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#0b5ed7';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#0d6efd';
                            }}
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteRegistro(registro.arc_codi, registro.arc_titu)}
                            style={{
                              padding: '0.4rem 0.8rem',
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontWeight: '600',
                              fontSize: '0.75rem',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#c82333';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#dc3545';
                            }}
                            title="Eliminar registro"
                          >
                            Borrar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-button"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  Anterior
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    className={`pagination-button ${page === p ? 'active' : ''}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                ))}

                <button
                  className="pagination-button"
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
