'use client';

import { useRouter } from 'next/navigation';
import RegistroForm from '@/components/RegistroForm';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '1.5rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1a1a1a',
    margin: '0 0 0.5rem 0',
  },
  backButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#666',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    transition: 'all 0.3s ease',
  },
  content: {
    maxWidth: '100%',
    margin: '0 auto',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
};

export default function RegistrarPage() {
  const router = useRouter();

  const handleFormSubmit = () => {
    router.push('/registros');
  };

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button
          onClick={() => router.push('/')}
          style={styles.backButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          ← Inicio
        </button>
        <h1 style={styles.title}>➕ Registrar Nuevo Archivo Histórico</h1>
      </div>

      <div style={styles.content}>
        <RegistroForm onSubmit={handleFormSubmit} onClose={handleClose} />
      </div>
    </div>
  );
}
