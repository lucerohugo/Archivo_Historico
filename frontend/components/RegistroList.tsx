'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import './RegistroList.css';

interface RegistroListProps {
  registros?: any[];
  loading?: boolean;
  onRegistroClick?: (registro: any) => void;
  onYearsUpdate?: (years: string[]) => void;
  isPublicView?: boolean; // Si es true, siempre oculta registros privados
  filters?: {
    search?: string;
    year?: string;
    dateFrom?: string;
    dateTo?: string;
  };
}

export default function RegistroList({ registros = [], loading: initialLoading = false, onRegistroClick, onYearsUpdate, isPublicView = false, filters = {} }: RegistroListProps) {
  const [apiRegistros, setApiRegistros] = useState<any[]>([]);
  const [loading, setLoading] = useState(initialLoading);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    // Si ya se inicializó, no hacer nada
    if (hasInitialized) return;

    // Si recibimos registros como prop, usarlos
    if (registros && registros.length > 0) {
      setApiRegistros(registros);
      setHasInitialized(true);
    } else {
      // Si no, hacer fetch del API (una sola vez)
      fetchRegistros();
      setHasInitialized(true);
    }
  }, []); // Dependencias vacías para que solo se ejecute una vez

  useEffect(() => {
    // Extraer años únicos y ordenarlos
    if (apiRegistros.length > 0) {
      const years = Array.from(new Set(apiRegistros.map(reg => String(reg.arc_año)))).sort();
      onYearsUpdate?.(years);
    }
  }, [apiRegistros, onYearsUpdate]);

  const fetchRegistros = async () => {
    setLoading(true);
    try {
      const response = await api.get('/registros/');
      console.log('Registros obtenidos:', response.data);
      
      // El response puede ser un array o un objeto con resultados
      const data = Array.isArray(response.data) ? response.data : response.data.results || [];
      setApiRegistros(data);
    } catch (error) {
      console.error('Error fetching registros:', error);
      setApiRegistros([]);
    } finally {
      setLoading(false);
    }
  };

  // Aplicar filtros a los registros
  const filteredRegistros = apiRegistros.filter((registro: any) => {
    // Si es vista pública, SIEMPRE ocultar registros privados (sin importar token)
    if (isPublicView && !registro.arc_visw) {
      return false;
    }

    // Filtro de búsqueda: en código, título y año
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesCodigo = registro.arc_codi.toString().includes(filters.search);
      const matchesTitulo = registro.arc_titu?.toLowerCase().includes(searchLower);
      const matchesYear = registro.arc_año?.toString().includes(filters.search);
      
      if (!matchesCodigo && !matchesTitulo && !matchesYear) {
        return false;
      }
    }

    // Filtro por año (dropdown)
    if (filters.year && String(registro.arc_año) !== filters.year) {
      return false;
    }

    // Filtro por fecha desde
    if (filters.dateFrom) {
      const registroDate = new Date(registro.arc_fech);
      const fromDate = new Date(filters.dateFrom);
      if (registroDate < fromDate) {
        return false;
      }
    }

    // Filtro por fecha hasta
    if (filters.dateTo) {
      const registroDate = new Date(registro.arc_fech);
      const toDate = new Date(filters.dateTo);
      if (registroDate > toDate) {
        return false;
      }
    }

    return true;
  });

  if (loading) {
    return <div className="registro-list-loading">Cargando registros...</div>;
  }

  if (!apiRegistros || apiRegistros.length === 0) {
    return <div className="registro-list-empty">No hay registros registrados aún.</div>;
  }

  if (filteredRegistros.length === 0) {
    return <div className="registro-list-empty">No se encontraron registros que coincidan con los filtros.</div>;
  }

  const getFileIcon = (tipo: string) => {
    switch (tipo) {
      case 'pdf':
        return 'PDF';
      case 'imagen':
        return 'IMG';
      case 'documento':
        return 'DOC';
      default:
        return 'ARH';
    }
  };

  return (
    <div className="registro-list-container">
      <table className="registro-list-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Fecha</th>
            <th>Título Referencia</th>
            <th>Año</th>
            <th>Archivos</th>
          </tr>
        </thead>
        <tbody>
          {filteredRegistros.map((reg: any, idx: number) => (
            <tr key={idx} onClick={() => onRegistroClick?.(reg)}>
              <td>
                <strong className="registro-list-code">{reg.arc_codi}</strong>
              </td>
              <td>{new Date(reg.arc_fech).toLocaleDateString('es-ES')}</td>
              <td>{reg.arc_titu}</td>
              <td>{reg.arc_año || '-'}</td>
              <td>
                {reg.archivos && reg.archivos.length > 0 ? (
                  <div className="registro-list-files">
                    {reg.archivos.slice(0, 3).map((archivo: any, idx: number) => (
                      <a
                        key={idx}
                        href={archivo.archivo}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={archivo.nombre}
                        className="registro-list-file-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="registro-list-file-badge">{getFileIcon(archivo.tipo)}</span>
                      </a>
                    ))}
                    {reg.archivos.length > 3 && (
                      <span className="registro-list-file-count">+{reg.archivos.length - 3}</span>
                    )}
                  </div>
                ) : (
                  <span className="registro-list-no-files">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
