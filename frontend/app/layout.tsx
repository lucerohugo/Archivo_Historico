import './globals.css';

export const metadata = {
  title: 'Archivo Histórico - Sistema de Gestión Diocesano',
  description: 'Portal de acceso a documentos históricos diocesanos',
  language: 'es',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
