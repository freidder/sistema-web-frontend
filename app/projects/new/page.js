import { useState } from 'react';
import { apiFetch } from '../../utils/api';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
  const [client, setClient] = useState('');
  const [address, setAddress] = useState('');
  const [sidingType, setSidingType] = useState('Vinyl');
  const [area, setArea] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('pending');
  const [startDate, setStartDate] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();

  useState(() => {
    const t = localStorage.getItem('token');
    if (t) setToken(t);
    else window.location.href = '/login';
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const data = await apiFetch('/api/projects', {
        method: 'POST',
        token,
        body: JSON.stringify({ client, address, sidingType, area: Number(area), price: Number(price), status, startDate, notes })
      });
      setSuccess('Proyecto creado correctamente');
      setTimeout(() => router.push(`/projects/${data._id}`), 1200);
    } catch (err) {
      setError(err.message);
    }
  }

  if (!token) return <div style={{ padding: 32 }}>Inicia sesión para crear proyectos.</div>;

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 32 }}>
      <h2>Nuevo Proyecto</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Cliente" value={client} onChange={e => setClient(e.target.value)} required style={{ width: '100%', marginBottom: 8 }} />
        <input type="text" placeholder="Dirección" value={address} onChange={e => setAddress(e.target.value)} required style={{ width: '100%', marginBottom: 8 }} />
        <select value={sidingType} onChange={e => setSidingType(e.target.value)} style={{ width: '100%', marginBottom: 8 }}>
          <option value="Vinyl">Vinyl</option>
          <option value="Fiber">Fiber</option>
          <option value="Wood">Wood</option>
        </select>
        <input type="number" placeholder="Área (m2)" value={area} onChange={e => setArea(e.target.value)} required style={{ width: '100%', marginBottom: 8 }} />
        <input type="number" placeholder="Precio" value={price} onChange={e => setPrice(e.target.value)} required style={{ width: '100%', marginBottom: 8 }} />
        <select value={status} onChange={e => setStatus(e.target.value)} style={{ width: '100%', marginBottom: 8 }}>
          <option value="pending">Pendiente</option>
          <option value="in_progress">En progreso</option>
          <option value="finished">Finalizado</option>
        </select>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required style={{ width: '100%', marginBottom: 8 }} />
        <textarea placeholder="Notas" value={notes} onChange={e => setNotes(e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
        <button type="submit" style={{ width: '100%' }}>Crear Proyecto</button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
    </div>
  );
}
