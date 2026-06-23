'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './home.css';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Si está autenticado, va a /registrar (crear nuevo registro)
      router.push('/registrar/crear');
    } else {
      // Si no está autenticado, va a /login
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="home-page">
      <div className="home-container">
        <h1 className="home-title">Archivo Histórico Diocesano</h1>
        <p className="home-subtitle">Cargando...</p>
      </div>
    </div>
  );
}
