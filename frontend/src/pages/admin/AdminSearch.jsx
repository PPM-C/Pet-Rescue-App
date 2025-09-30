import { useState } from 'react'
import { api } from '../../api'
import { Link } from 'react-router-dom'
import { MdHome } from 'react-icons/md'

export default function AdminSearch() {
  const [q, setQ] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const search = async () => {
    try {
      setLoading(true); setError('')
      const page = await api.searchPets(q)
      setItems(page.content || [])
    } catch (e) { setError(e.message) } finally { setLoading(false) }
  }

  return (
    <div>
      <div className="row" style={{marginBottom: 12}}>
        <Link className="btn btn-ghost" to="/admin"><MdHome style={{marginRight:6}}/> Admin Home</Link>
      </div>

      <h2>Search Pets</h2>
      <div className="row">
        <input className="input" placeholder="Nombre..." value={q} onChange={e=>setQ(e.target.value)}/>
        <button className="btn" onClick={search}>Buscar</button>
      </div>
      {loading && <p>Cargando...</p>}
      {error && <p className="alert-error">Error: {error}</p>}

      <div className="grid">
        {items.map(p=>(
          <div key={p.id} className="card card-row">
            <img className="thumb" src={p.photoUrl || 'https://placehold.co/200x200?text=Pet'} alt={p.name}/>
            <div style={{flex:1}}>
              <h3 className="title">{p.name}</h3>
              <div className="muted">{p.species} • {p.sex} • {p.size} • {p.status}</div>
            </div>
            <div className="row">
              <Link className="btn" to={`/admin/pets/${p.id}/edit`}>Editar</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
