'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { AuthCookie } from '@/lib/auth-cookie';
import './page.css';

export default function LoginPage() {
  const router = useRouter();
  const [log_usua, setLog_usua] = useState('');
  const [log_clav, setLog_clav] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Enviando login con:', { log_usua, log_clav });
      
      const response = await api.post('/auth/login/', {
        log_usua,
        log_clav,
      });

      console.log('Respuesta recibida:', response.data);

      // Guardar tokens en localStorage (para acceso del cliente)
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));

      // Guardar tokens en cookies (para middleware del servidor)
      AuthCookie.setTokens(response.data.access, response.data.refresh);

      console.log('Tokens guardados, redirigiendo...');
      
      // Redirigir al dashboard
      router.push('/registrar');
    } catch (err: any) {
      console.error('Error completo:', err);
      console.error('Response data:', err.response?.data);
      
      const errorMsg = 
        err.response?.data?.detail ||
        err.response?.data?.message ||
        (err.response?.data?.non_field_errors ? err.response.data.non_field_errors[0] : null) ||
        'Error en las credenciales. Intenta de nuevo.';
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Archivo Histórico</h1>
          <p className="login-subtitle">Sistema de gestión de documentos</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label className="form-label">Usuario</label>
            <input
              type="text"
              className="form-input"
              value={log_usua}
              onChange={(e) => setLog_usua(e.target.value)}
              disabled={loading}
              placeholder="Ingresa tu usuario"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-input"
              value={log_clav}
              onChange={(e) => setLog_clav(e.target.value)}
              disabled={loading}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Cargando...' : 'Ingresar'}
          </button>
        </form>

        <p className="login-footer">Acceso solo para administradores</p>
      </div>
    </div>
  );
}
