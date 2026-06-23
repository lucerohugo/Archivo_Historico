import axios, { AxiosInstance, AxiosError } from 'axios';
import { AuthCookie } from './auth-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para refrescar token si expira
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;
        
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh/`, {
            refresh: refreshToken,
          });

          const { access } = response.data;
          
          // Actualizar en localStorage
          localStorage.setItem('access_token', access);
          
          // Actualizar en cookies
          AuthCookie.setTokens(access, refreshToken);
          
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        } else {
          // Sin refresh token, limpiar y redirigir a login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('usuario');
            AuthCookie.clearTokens();
            window.location.href = '/login';
          }
        }
      } catch (refreshError) {
        // Error al refrescar, limpiar tokens y redirigir
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('usuario');
          AuthCookie.clearTokens();
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
