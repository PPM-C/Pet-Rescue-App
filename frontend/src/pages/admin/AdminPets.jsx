import { useEffect, useState } from 'react'
import { api } from '../../api'
import { Link, useNavigate } from 'react-router-dom'
import { MdHome } from 'react-icons/md'

export default function AdminPets() {
  const nav = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  useEffect(()=>{ load() }, [])
  const load = async () => {
    try { setLoading(true); setError(''); const page = await api.listPets(); setItems(page.content || []) }
    catch(e){ setError(e.message) } finally { setLoading(false) }
  }
  const del = async (id) => {
    if (!confirm('¿Eliminar mascota?')) return
    try { await api.deletePet(id); load() } catch(e){ alert(e.message) }
  }
  return (
    <div>
      <div className="row" style={{marginBottom: 12}}>
        <Link className="btn btn-ghost" to="/admin"><MdHome style={{marginRight:6}}/> Admin Home</Link>
        <button className="btn btn-primary" onClick={()=>nav('/admin/pets/new')}>+ Add Pet</button>
      </div>
      <h2>Pets</h2>
      {loading && <p>Cargando...</p>}
      {error && <p className="alert-error">Error: {error}</p>}
      <div className="grid">
        {items.map(p=>(
          <div key={p.id} className="card card-row">
            <img className="thumb" src={p.photoUrl || 'https://placehold.co/200x200?text=Pet'} alt={p.name}/>
            <div style={{flex:1}}>
              <h3 className="title">{p.name}</h3>
              <div className="muted">{p.species} • {p.sex} • {p.size}</div>
              <div><span className="badge badge-neutral">{p.status}</span></div>
            </div>
            <div className="row">
              <Link className="btn" to={`/admin/pets/${p.id}/edit`}>Editar</Link>
              <button className="btn" onClick={()=>del(p.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
