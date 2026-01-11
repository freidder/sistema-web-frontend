import { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/api';
import Link from 'next/link';
import { getUserRole } from '../../utils/auth';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Intentar obtener token de localStorage (si login implementado)
    const t = localStorage.getItem('token');
    if (t) setToken(t);
    else window.location.href = '/login';
  }, []);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    apiFetch('/api/projects', { token })
      .then(data => {
        setProjects(data);
        setError('');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (!token) {
    return <div style={{ padding: 32 }}>Por favor, inicia sesión para ver los proyectos.</div>;
  }

  const role = getUserRole();
  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 32 }}>
      <h2>Proyectos de Siding</h2>
      {(role === 'admin' || role === 'supervisor') && (
        <Link href="/projects/new" style={{ display: 'inline-block', marginBottom: 16, background: '#0070f3', color: '#fff', padding: '8px 16px', borderRadius: 4, textDecoration: 'none' }}>Nuevo Proyecto</Link>
      )}
      {loading && <div>Cargando...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Dirección</th>
            <th>Tipo</th>
            <th>Área</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Inicio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p._id}>
              <td>{p.client}</td>
              <td>{p.address}</td>
              <td>{p.sidingType}</td>
              <td>{p.area}</td>
              <td>{p.price}</td>
              <td>{p.status}</td>
              <td>{new Date(p.startDate).toLocaleDateString()}</td>
              <td>
                <Link href={`/projects/${p._id}`} style={{ marginRight: 8 }}>Ver</Link>
                {(role === 'admin' || role === 'supervisor') && (
                  <Link href={`/projects/edit/${p._id}`}>Editar</Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
