'use client';

import { useRouter } from 'next/navigation';
import './home.css';

export default function Home() {
  const router = useRouter();

  return (
    <div className="home-page">
      <div className="home-container">
        <h1 className="home-title">Archivo Histórico Diocesano</h1>
        <p className="home-subtitle">Sistema de gestión de documentos</p>

        <button
          onClick={() => router.push('/registros')}
          className="home-button"
        >
          TODOS LOS REGISTROS HISTÓRICOS
        </button>
      </div>
    </div>
  );
}
