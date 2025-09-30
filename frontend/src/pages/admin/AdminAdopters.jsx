import { useEffect, useState } from 'react'
import { api } from '../../api'
import { Link, useNavigate } from 'react-router-dom'
import { MdHome } from 'react-icons/md'

export default function AdminAdopters() {
  const nav = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(()=>{ load() }, [])
  const load = async () => {
    try { setLoading(true); setError(''); const page = await api.listAdopters(); setItems(page.content || []) }
    catch(e){ setError(e.message) } finally { setLoading(false) }
  }

  return (
    <div>
      <div className="row" style={{marginBottom: 12}}>
        <Link className="btn btn-ghost" to="/admin"><MdHome style={{marginRight:6}}/> Admin Home</Link>
        <button className="btn btn-primary" onClick={()=>nav('/admin/adopters/new')}>+ Add Adopter</button>
      </div>
      <h2>Adopters</h2>
      {loading && <p>Cargando...</p>}
      {error && <p className="alert-error">Error: {error}</p>}
      <div className="grid">
        {items.map(a=>(
          <div key={a.id} className="card card-row">
            <img className="avatar" src={a.avatarUrl || 'https://placehold.co/128x128?text=Adopter'} alt={a.firstName}/>
            <div style={{flex:1}}>
              <h3 className="title">{a.firstName} {a.lastName}</h3>
              <div className="muted">DNI: {a.docId || '—'} • Nacido: {a.birthDate || '—'}</div>
              <div className="muted">{a.email} • {a.phone}</div>
            </div>
            <div className="row">
              <Link className="btn" to={`/admin/adopters/${a.id}/edit`}>Editar</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
