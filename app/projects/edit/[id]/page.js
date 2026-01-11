import { useEffect, useState } from 'react';
import { apiFetch } from '../../../../utils/api';
import { useRouter } from 'next/navigation';

export default function EditProjectPage({ params }) {
  const { id } = params;
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) setToken(t);
    else window.location.href = '/login';
  }, []);

  useEffect(() => {
    if (!token) return;
    apiFetch(`/api/projects/${id}`, { token })
      .then(data => setProject(data))
      .catch(err => setError(err.message));
  }, [id, token]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await apiFetch(`/api/projects/${id}`, {
        method: 'PUT',
        token,
        body: JSON.stringify(project)
      });
      setSuccess('Proyecto actualizado');
      setTimeout(() => router.push(`/projects/${id}`), 1200);
    } catch (err) {
      setError(err.message);
    }
  }

  if (!token) return <div style={{ padding: 32 }}>Inicia sesión para editar proyectos.</div>;
  if (!project) return <div style={{ padding: 32 }}>Cargando...</div>;

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 32 }}>
      <h2>Editar Proyecto</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={project.client} onChange={e => setProject({ ...project, client: e.target.value })} required style={{ width: '100%', marginBottom: 8 }} />
        <input type="text" value={project.address} onChange={e => setProject({ ...project, address: e.target.value })} required style={{ width: '100%', marginBottom: 8 }} />
        <select value={project.sidingType} onChange={e => setProject({ ...project, sidingType: e.target.value })} style={{ width: '100%', marginBottom: 8 }}>
          <option value="Vinyl">Vinyl</option>
          <option value="Fiber">Fiber</option>
          <option value="Wood">Wood</option>
        </select>
        <input type="number" value={project.area} onChange={e => setProject({ ...project, area: Number(e.target.value) })} required style={{ width: '100%', marginBottom: 8 }} />
        <input type="number" value={project.price} onChange={e => setProject({ ...project, price: Number(e.target.value) })} required style={{ width: '100%', marginBottom: 8 }} />
        <select value={project.status} onChange={e => setProject({ ...project, status: e.target.value })} style={{ width: '100%', marginBottom: 8 }}>
          <option value="pending">Pendiente</option>
          <option value="in_progress">En progreso</option>
          <option value="finished">Finalizado</option>
        </select>
        <input type="date" value={project.startDate?.slice(0,10)} onChange={e => setProject({ ...project, startDate: e.target.value })} required style={{ width: '100%', marginBottom: 8 }} />
        <textarea value={project.notes} onChange={e => setProject({ ...project, notes: e.target.value })} style={{ width: '100%', marginBottom: 8 }} />
        <button type="submit" style={{ width: '100%' }}>Guardar Cambios</button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
    </div>
  );
}
