import { useEffect, useState } from 'react'
import { api } from '../../api/index.js'
import { Link } from 'react-router-dom'
import { useFavorites } from '../../context/FavoritesContext.jsx'

export default function UserFavorites() {
  const { ids } = useFavorites()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    (async()=>{
      try {
        setLoading(true)
        const list = []
        for (const id of ids) list.push(await api.getPet(id))
        setItems(list)
      } finally { setLoading(false) }
    })()
  }, [ids])

  return (
    <div>
      <div className="row" style={{marginBottom: 12}}>
        <Link className="btn btn-ghost" to="/user">👤 User Home</Link>
      </div>
      <h2>Lovely Pets</h2>
      {loading && <p>Cargando...</p>}
      <div className="grid">
        {items.map(p=>(
          <div key={p.id} className="card card-row">
            <img className="thumb" src={p.photoUrl || 'https://placehold.co/200x200?text=Pet'} alt={p.name}/>
            <div style={{flex:1}}>
              <h3 className="title">{p.name}</h3>
              <div className="muted">{p.species} • {p.sex} • {p.size}</div>
              <div className="row">
                <Link className="btn" to={`/user/adoption-form?petId=${p.id}&petName=${encodeURIComponent(p.name)}`}>Adoption Request</Link>
                <Link className="btn" to={`/user/visit-request?petId=${p.id}&petName=${encodeURIComponent(p.name)}`}>Schedule your visit</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!loading && !items.length && <p>No tienes favoritos todavía.</p>}
    </div>
  )
}
