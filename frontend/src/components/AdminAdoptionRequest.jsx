import { useEffect, useState } from 'react'
import { listAdoptionRequests, approveRequest, rejectRequest, cancelRequest } from '../api/adoptionRequests'

export default function AdminAdoptionRequests(){
  const [data, setData] = useState({ data:[], meta:{} })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true); setError('')
    try { setData(await listAdoptionRequests({ page:1, size:20 })) }
    catch(e){ setError(e.message) }
    finally { setLoading(false) }
  }
  useEffect(()=>{ load() },[])

  const act = async (fn, id) => {
    try { await fn(id); await load() } catch(e){ alert(e.message) }
  }

  return (
    <div>
      <h2>Adoption requests</h2>
      {loading && <p>Cargando…</p>}
      {error && <p style={{color:'crimson'}}>{error}</p>}
      <ul style={{ listStyle:'none', padding:0 }}>
        {data.data.map(r => (
          <li key={r.id} style={{ border:'1px solid #eee', borderRadius:8, padding:10, margin:'8px 0' }}>
            <div>Req #{r.id} — petId: {r.petId} — adopterId: {r.adopterId} — <b>{r.status}</b></div>
            <div style={{ marginTop:6, display:'flex', gap:8 }}>
              <button onClick={()=>act(approveRequest,r.id)}>Aprobar</button>
              <button onClick={()=>act(rejectRequest,r.id)}>Rechazar</button>
              <button onClick={()=>act(cancelRequest,r.id)}>Cancelar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
