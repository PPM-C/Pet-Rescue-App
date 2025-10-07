import { useEffect, useState } from 'react'
import { listAdoptionRequests } from '../api/adoptionRequests'
import { listVisits, createVisit, updateVisit, cancelVisit, deleteVisit } from '../api/visits'

export default function AdminVisits(){
  const [requests, setRequests] = useState([])
  const [visits, setVisits] = useState([])
  const [form, setForm] = useState({ requestId:'', scheduledAt:'', notes:'' })
  const [error, setError] = useState('')

  const load = async () => {
    try {
      const r = await listAdoptionRequests({ status:'Approved', page:1, size:50 })
      setRequests(r.data)
      const v = await listVisits({ page:1, size:50 })
      setVisits(v.data)
    } catch(e){ setError(e.message) }
  }
  useEffect(()=>{ load() },[])

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const addVisit = async (e) => {
    e.preventDefault()
    try {
      if (!form.requestId || !form.scheduledAt) throw new Error('requestId y fecha/hora requeridos')
      await createVisit({ requestId: Number(form.requestId), scheduledAt: form.scheduledAt, notes: form.notes || undefined })
      setForm({ requestId:'', scheduledAt:'', notes:'' })
      await load()
    } catch(e){ alert(e.message) }
  }

  const editVisit = async (id) => {
    const dt = prompt('Nueva fecha-hora (YYYY-MM-DDTHH:mm):')
    if (!dt) return
    try { await updateVisit(id, { scheduledAt: dt }); await load() } catch(e){ alert(e.message) }
  }

  return (
    <div>
      <h2>Visits</h2>
      {error && <p style={{color:'crimson'}}>{error}</p>}

      <form onSubmit={addVisit} style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:12 }}>
        <select name="requestId" value={form.requestId} onChange={onChange}>
          <option value="">Request aprobada…</option>
          {requests.map(r => <option key={r.id} value={r.id}>Req #{r.id} — Pet {r.petId} — Adopter {r.adopterId}</option>)}
        </select>
        <input type="datetime-local" name="scheduledAt" value={form.scheduledAt} onChange={onChange}/>
        <input name="notes" placeholder="Notas" value={form.notes} onChange={onChange}/>
        <button>Crear visita</button>
      </form>

      <ul style={{ listStyle:'none', padding:0 }}>
        {visits.map(v => (
          <li key={v.id} style={{ border:'1px solid #eee', borderRadius:8, padding:10, margin:'8px 0' }}>
            <div>Visit #{v.id} — Req {v.requestId} — {v.status} — {v.scheduledAt}</div>
            <div style={{ marginTop:6, display:'flex', gap:8 }}>
              <button onClick={()=>editVisit(v.id)}>Editar</button>
              <button onClick={()=>cancelVisit(v.id).then(load)}>Cancelar</button>
              <button onClick={()=>deleteVisit(v.id).then(load)}>Borrar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
