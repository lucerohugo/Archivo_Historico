import React from 'react';
import Layout from '@/components/Layout';

export default function RegistrosPage() {
  return (
    <Layout>
      <div style={styles.container}>
        <h2 style={styles.title}>Registros Históricos</h2>
        <p style={styles.subtitle}>
          Lista de registros disponibles. Implementaremos la funcionalidad completa en breve.
        </p>
        
        <div style={styles.placeholder}>
          <p>Los registros se cargarán desde el backend API aquí.</p>
        </div>
      </div>
    </Layout>
  );
}

const styles = {
  container: {
    padding: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '600',
    margin: '0 0 1rem 0',
    color: '#1a1a1a',
  },
  subtitle: {
    color: '#666',
    marginBottom: '2rem',
  },
  placeholder: {
    padding: '2rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    border: '1px dashed #d5d5d5',
    textAlign: 'center' as const,
    color: '#999',
  },
};
