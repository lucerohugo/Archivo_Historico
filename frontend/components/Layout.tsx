import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Archivo Histórico</h1>
          <p style={styles.subtitle}>Gestión de Documentos Eclesiásticos</p>
        </div>
      </header>
      
      <nav style={styles.nav}>
        <a href="/" style={styles.navLink}>Inicio</a>
        <a href="/registros" style={styles.navLink}>Registros</a>
        <a href="/buscar" style={styles.navLink}>Buscar</a>
        <a href="/admin" style={styles.navLink}>Admin</a>
      </nav>

      <main style={styles.main}>
        {children}
      </main>

      <footer style={styles.footer}>
        <p>&copy; 2026 Archivo Histórico de la Iglesia. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#fafafa',
    color: '#333',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #e5e5e5',
    padding: '2rem 0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  title: {
    margin: '0 0 0.5rem 0',
    fontSize: '2rem',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  subtitle: {
    margin: '0',
    fontSize: '0.95rem',
    color: '#666',
    fontWeight: '400',
  },
  nav: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #e5e5e5',
    padding: '0.5rem 0',
    display: 'flex',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    paddingLeft: '1rem',
  },
  navLink: {
    padding: '0.75rem 0',
    color: '#666',
    textDecoration: 'none',
    fontSize: '0.95rem',
    borderBottom: '2px solid transparent',
    transition: 'all 0.3s ease',
  },
  main: {
    flex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    padding: '2rem 1rem',
  },
  footer: {
    backgroundColor: '#fff',
    borderTop: '1px solid #e5e5e5',
    padding: '2rem 1rem',
    textAlign: 'center' as const,
    color: '#666',
    fontSize: '0.9rem',
    marginTop: 'auto',
  },
};
