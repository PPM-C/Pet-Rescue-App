import { useEffect, useState } from 'react'
import { api } from '../../api'
import { Link } from 'react-router-dom'
import { MdHome } from 'react-icons/md'

export default function AdminVisits() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    try { setLoading(true); setError(''); const page = await api.listVisits(); setItems(page.content || []) }
    catch(e){ setError(e.message) } finally { setLoading(false) }
  }
  useEffect(()=>{ load() }, [])

  const reschedule = async (v) => {
    const iso = prompt('Nueva fecha (ISO: 2025-09-20T16:00):', v.scheduledAt?.slice(0,16).replace(' ','T'))
    if (!iso) return
    try { await api.rescheduleVisit(v.id, { scheduledAt: iso, notes: v.notes }) ; load() } catch(e){ alert(e.message) }
  }
  const cancel = async (v) => {
    if (!confirm('¿Cancelar visita?')) return
    try { await api.cancelVisit(v.id, 'Cancelada por Admin'); load() } catch(e){ alert(e.message) }
  }

  return (
    <div>
      <div className="row" style={{marginBottom: 12}}>
        <Link className="btn btn-ghost" to="/admin"><MdHome style={{marginRight:6}}/> Admin Home</Link>
      </div>
      <h2>Visits</h2>
      {loading && <p>Cargando...</p>}
      {error && <p className="alert-error">Error: {error}</p>}
      <div className="grid">
        {items.map(v=>(
          <div key={v.id} className="card">
            <div className="space-between">
              <strong>Visit #{v.id}</strong>
              <span className="badge">{v.status}</span>
            </div>
            <div style={{fontSize: 24, fontWeight: 800}}>{(v.scheduledAt || '').replace('T',' ')}</div>
            <div className="muted">Request: {v.adoptionRequestId}</div>
            {v.notes && <div className="muted">Notas: {v.notes}</div>}
            <div className="row" style={{marginTop:8}}>
              <button className="btn" onClick={()=>reschedule(v)}>Editar</button>
              <button className="btn" onClick={()=>cancel(v)}>Borrar</button>
            </div>
          </div>
        ))}
      </div>
      {!loading && !items.length && <p>No hay visitas.</p>}
    </div>
  )
}
