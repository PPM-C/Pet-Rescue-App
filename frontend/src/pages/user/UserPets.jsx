import { useEffect, useState } from 'react'
import { api } from '../../api'
import { Link, useNavigate } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext.jsx'

export default function UserPets() {
  const nav = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { ids, toggle, isFav } = useFavorites()

  useEffect(()=>{ load() }, [])
  const load = async () => {
    try { setLoading(true); setError(''); const page = await api.listPets(); setItems(page.content || []) }
    catch(e){ setError(e.message) } finally { setLoading(false) }
  }

  return (
    <div>
      <div className="row" style={{marginBottom: 12}}>
        <Link className="btn btn-ghost" to="/user">👤 User Home</Link>
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
              <div className="muted">{p.species} • {p.sex} • {p.size} • {p.status}</div>
              <div className="row">
                <button className="btn" onClick={()=>nav(`/user/adoption-form?petId=${p.id}&petName=${encodeURIComponent(p.name)}`)}>Adoption Request</button>
                <button className="btn" onClick={()=>nav(`/user/visit-request?petId=${p.id}&petName=${encodeURIComponent(p.name)}`)}>Schedule your visit</button>
                <button className="btn btn-ghost" onClick={()=>toggle(p.id)}>{isFav(p.id) ? '💖' : '🤍'}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!loading && !items.length && <p>No hay mascotas.</p>}
    </div>
  )
}
