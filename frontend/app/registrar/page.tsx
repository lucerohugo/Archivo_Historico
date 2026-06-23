'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AuthCookie } from '@/lib/auth-cookie';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '2rem',
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
    fontWeight: '400',
  },
  logoutButton: {
    position: 'absolute' as const,
    top: '1.5rem',
    right: '1.5rem',
    padding: '0.75rem 1.5rem',
    fontSize: '0.9rem',
    fontWeight: '600',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(217, 83, 79, 0.2)',
  },
  buttonContainer: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  },
  adminButton: {
    padding: '1.5rem 2.5rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    backgroundColor: '#2d5f6f',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(45, 95, 111, 0.3)',
  },
};

export default function AdminPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (!token) {
      router.push('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div style={{ ...styles.container, justifyContent: 'center' }}>Cargando...</div>;
  }

  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('usuario');

    // Limpiar cookies
    AuthCookie.clearTokens();

    // Redirigir a login
    router.push('/login');
  };

  return (
    <div style={styles.container}>
      <button
        onClick={handleLogout}
        style={styles.logoutButton}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.9';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Cerrar sesión
      </button>

      <div style={styles.header}>
        <h1 style={styles.title}>Archivo Histórico Diocesano</h1>
        <p style={styles.subtitle}>Sistema de gestión de documentos</p>
        {/* <h4>Admin</h4> */}
      </div>

      <div style={styles.buttonContainer}>
        <button
          onClick={() => router.push('/registrar/crear')}
          style={styles.adminButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(45, 95, 111, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 95, 111, 0.3)';
          }}
        >
          <div>CARGAR NUEVO ARCHIVO HISTÓRICO</div>
        </button>

        <button
          onClick={() => router.push('/admin/registros')}
          style={styles.adminButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(45, 95, 111, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 95, 111, 0.3)';
          }}
        >
          <div>TODOS LOS REGISTROS HISTÓRICOS</div>
        </button>
      </div>
    </div>
  );
}
