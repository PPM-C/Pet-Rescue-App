import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../../api'

export default function AdminHome(){
  const [pending, setPending] = useState(0)

  useEffect(()=>{
    (async()=>{
      try{
        const all = await api.listRequests()
        setPending(all.filter(r => r.status === 'Pending').length)
      }catch{ setPending(0) }
    })()
  },[])

  return (
    <div className="tiles">
      <Link className="tile has-bubble" to="/admin/adoption-requests">
        <div className="tile-icon">🔔</div>
        <div className="tile-label">Adoption Requests</div>
        {pending > 0 && <div className="bubble">{pending}</div>}
      </Link>
      <Link className="tile" to="/admin/search">
        <div className="tile-icon">🔎</div>
        <div className="tile-label">Search</div>
      </Link>
      <Link className="tile" to="/admin/pets">
        <div className="tile-icon">🐾</div>
        <div className="tile-label">Pets</div>
      </Link>
      <Link className="tile" to="/admin/pets/new">
        <div className="tile-icon">➕</div>
        <div className="tile-label">Add Pet</div>
      </Link>
      <Link className="tile" to="/admin/adopters">
        <div className="tile-icon">🧑‍🤝‍🧑</div>
        <div className="tile-label">Adopters</div>
      </Link>
      <Link className="tile" to="/admin/adopters/new">
        <div className="tile-icon">➕</div>
        <div className="tile-label">Add Adopter</div>
      </Link>
      <Link className="tile" to="/admin/visits">
        <div className="tile-icon">📅</div>
        <div className="tile-label">Visits</div>
      </Link>
    </div>
  )
}
