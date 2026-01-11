import { useEffect, useState } from 'react';
import { apiFetch, API_URL } from '../../../utils/api';
import { useRouter } from 'next/router';

export default function ProjectDetailPage({ params }) {
  const { id } = params;
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [uploadMsg, setUploadMsg] = useState('');

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t) setToken(t);
    else window.location.href = '/login';
  }, []);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    apiFetch(`/api/projects/${id}`, { token })
      .then(data => {
        setProject(data);
        setError('');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, token]);

  async function handlePhotoUpload(e) {
    e.preventDefault();
    if (!photoFile) return;
    setUploadMsg('');
    const formData = new FormData();
    formData.append('photo', photoFile);
    const res = await fetch(`${API_URL}/api/projects/${id}/photos`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      setUploadMsg('Foto subida correctamente');
      setProject(data.project);
    } else {
      setUploadMsg(data.message || 'Error al subir foto');
    }
  }

  if (!token) return <div style={{ padding: 32 }}>Inicia sesión para ver el proyecto.</div>;
  if (loading) return <div style={{ padding: 32 }}>Cargando...</div>;
  if (error) return <div style={{ padding: 32, color: 'red' }}>{error}</div>;
  if (!project) return null;

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 32 }}>
      <h2>Proyecto: {project.client}</h2>
      <div><b>Dirección:</b> {project.address}</div>
      <div><b>Tipo:</b> {project.sidingType}</div>
      <div><b>Área:</b> {project.area}</div>
      <div><b>Precio:</b> {project.price}</div>
      <div><b>Estado:</b> {project.status}</div>
      <div><b>Inicio:</b> {new Date(project.startDate).toLocaleDateString()}</div>
      <div><b>Notas:</b> {project.notes}</div>
      <h3>Fotos</h3>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {project.photos && project.photos.length > 0 ? project.photos.map((p, i) => (
          <img key={i} src={`/${p}`} alt="Foto" style={{ width: 120, height: 90, objectFit: 'cover', border: '1px solid #ccc' }} />
        )) : <span>No hay fotos</span>}
      </div>
      <form onSubmit={handlePhotoUpload} style={{ marginTop: 16 }}>
        <input type="file" accept="image/*" onChange={e => setPhotoFile(e.target.files[0])} />
        <button type="submit">Subir foto</button>
      </form>
      {uploadMsg && <div style={{ marginTop: 8, color: uploadMsg.includes('correctamente') ? 'green' : 'red' }}>{uploadMsg}</div>}
    </div>
  );
}
