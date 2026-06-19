'use client';

import { useRouter } from 'next/navigation';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '1.5rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '3rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0 0 0.5rem 0',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
    margin: '0',
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  },
  mainButton: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    backgroundColor: '#2d5f6f',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(45, 95, 111, 0.3)',
  },
};

export default function Home() {
  const router = useRouter();

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Archivo Histórico Diocesano</h1>
        <p style={styles.subtitle}>Sistema de gestión de documentos</p>
      </div>

      <div style={styles.buttonContainer}>
        <button
          onClick={() => router.push('/registros')}
          style={styles.mainButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
           VER TODOS LOS REGISTROS
        </button>

        <button
          onClick={() => router.push('/registrar')}
          style={styles.mainButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          ➕ REGISTRAR ARCHIVO HISTORICO
        </button>
      </div>
    </div>
  );
}
