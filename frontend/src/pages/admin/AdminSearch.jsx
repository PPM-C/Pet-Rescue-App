import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api'
import PetCard from '../../components/PetCard.jsx'

export default function AdminSearch(){
  const [q, setQ] = useState('')
  const [data, setData] = useState([])

  useEffect(()=>{ (async()=> setData((await api.listPets()).content || []))() },[])

  const list = data.filter(p =>
    (p.name||'').toLowerCase().includes(q.toLowerCase()) ||
    (p.species||'').toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div>
      <div className="row" style={{marginBottom:12}}>
        <Link className="btn btn-ghost" to="/admin">🏠 Admin</Link>
      </div>
      <div className="field">
        <label>Search</label>
        <input className="control" placeholder="Name or species..." value={q} onChange={e=>setQ(e.target.value)} />
      </div>
      <div className="grid" style={{marginTop:12}}>
        {list.map(p => <PetCard key={p.id} pet={p} admin />)}
      </div>
    </div>
  )
}
