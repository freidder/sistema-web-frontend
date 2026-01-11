import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getToken, removeToken, getUserRole } from '../utils/auth';

export default function RootLayout({ children }) {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  useEffect(() => {
    setToken(getToken());
    setRole(getUserRole());
  }, []);
  function handleLogout() {
    removeToken();
    setToken(null);
    setRole(null);
    window.location.href = '/login';
  }
  return (
    <html lang="es">
      <body style={{ fontFamily: 'sans-serif', background: '#f7f7f7', margin: 0 }}>
        <nav style={{ background: '#222', color: '#fff', padding: '12px 32px', display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link href="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</Link>
          <Link href="/register" style={{ color: '#fff', textDecoration: 'none' }}>Registro</Link>
          <Link href="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
          <Link href="/projects" style={{ color: '#fff', textDecoration: 'none' }}>Proyectos</Link>
          {token && (
            <>
              <span style={{ marginLeft: 16 }}>Usuario: {role}</span>
              <button onClick={handleLogout} style={{ marginLeft: 16, background: '#e00', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: 4, cursor: 'pointer' }}>Logout</button>
            </>
          )}
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
