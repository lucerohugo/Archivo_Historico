'use client';

import React, { useState, useEffect } from 'react';

interface RegistroListProps {
  registros?: any[];
  loading?: boolean;
  onRegistroClick?: (registro: any) => void;
}

const styles = {
  container: {
    overflowX: 'auto' as const,
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #ddd',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: '0.9rem',
  },
  thead: {
    backgroundColor: '#2d5f6f',
    color: '#fff',
  },
  th: {
    padding: '1rem',
    textAlign: 'left' as const,
    fontWeight: '600',
    borderBottom: '2px solid #2d5f6f',
  },
  td: {
    padding: '0.75rem 1rem',
    borderBottom: '1px solid #eee',
  },
  tr: {
    cursor: 'pointer' as const,
    transition: 'background-color 0.2s ease',
  },
  trHover: {
    backgroundColor: '#e8f4f8',
  },
  rowEven: {
    backgroundColor: '#f9f9f9',
  },
  rowOdd: {
    backgroundColor: '#fff',
  },
  loading: {
    padding: '2rem',
    textAlign: 'center' as const,
    color: '#999',
  },
  empty: {
    padding: '2rem',
    textAlign: 'center' as const,
    color: '#bbb',
    backgroundColor: '#f9f9f9',
  },
};

export default function RegistroList({ registros = [], loading = false, onRegistroClick }: RegistroListProps) {
  const [apiRegistros, setApiRegistros] = useState<any[]>([]);

  useEffect(() => {
    // Aquí conectarías con tu API
    setApiRegistros(registros);
  }, [registros]);

  if (loading) {
    return <div style={styles.loading}>Cargando registros...</div>;
  }

  if (!apiRegistros || apiRegistros.length === 0) {
    return <div style={styles.empty}>No hay registros registrados aún.</div>;
  }

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>Código</th>
            <th style={styles.th}>Fecha</th>
            <th style={styles.th}>Título</th>
            <th style={styles.th}>Categoría</th>
            <th style={styles.th}>Año</th>
          </tr>
        </thead>
        <tbody>
          {apiRegistros.map((reg: any, idx: number) => (
            <tr 
              key={idx} 
              style={{
                ...styles.tr,
                ...(idx % 2 === 0 ? styles.rowEven : styles.rowOdd)
              }}
              onClick={() => onRegistroClick?.(reg)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e8f4f8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#f9f9f9' : '#fff';
              }}
            >
              <td style={styles.td}><strong>{reg.arc_codi}</strong></td>
              <td style={styles.td}>{new Date(reg.arc_fech).toLocaleDateString('es-ES')}</td>
              <td style={styles.td}>{reg.arc_titu}</td>
              <td style={styles.td}>{reg.arc_cate || '-'}</td>
              <td style={styles.td}>{reg.arc_año || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
