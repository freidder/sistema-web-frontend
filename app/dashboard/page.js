import { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/api';

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [token, setToken] = useState('');
  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) setToken(t);
    else window.location.href = '/login';
  }, []);
  useEffect(() => {
    if (!token) return;
    apiFetch('/api/projects', { token })
      .then(data => setProjects(data))
      .catch(() => setProjects([]));
  }, [token]);
  const total = projects.length;
  const activos = projects.filter(p => p.status === 'in_progress').length;
  const terminados = projects.filter(p => p.status === 'finished').length;
  const pendientes = projects.filter(p => p.status === 'pending').length;
  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 32 }}>
      <h2>Dashboard</h2>
      <div style={{ display: 'flex', gap: 32 }}>
        <div><b>Total proyectos:</b> {total}</div>
        <div><b>Activos:</b> {activos}</div>
        <div><b>Pendientes:</b> {pendientes}</div>
        <div><b>Terminados:</b> {terminados}</div>
      </div>
    </div>
  );
}
