import { useEffect, useState } from 'react'
import { api } from '../../api'
import { Link } from 'react-router-dom'
import { MdHome } from 'react-icons/md'

export default function AdminAdoptionRequests() {
  const [items, setItems] = useState([])
  const [pets, setPets] = useState(new Map())
  const [adopters, setAdopters] = useState(new Map())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(()=>{ load() }, [])

  async function load() {
    try {
      setLoading(true); setError('')
      const page = await api.listAdoptionRequests()
      const list = page.content || []
      const petIds = [...new Set(list.map(i => i.petId))]
      const adopterIds = [...new Set(list.map(i => i.adopterId))]

      const petMap = new Map()
      await Promise.all(petIds.map(async id => petMap.set(id, await api.getPet(id))))
      setPets(petMap)

      const adopterMap = new Map()
      await Promise.all(adopterIds.map(async id => adopterMap.set(id, await api.getAdopter(id))))
      setAdopters(adopterMap)

      setItems(list)
    } catch (e) { setError(e.message) } finally { setLoading(false) }
  }

  return (
    <div>
      <div className="row" style={{marginBottom: 12}}>
        <Link className="btn btn-ghost" to="/admin"><MdHome style={{marginRight:6}}/> Admin Home</Link>
      </div>

      <h2>Adoption Requests</h2>
      {loading && <p>Cargando...</p>}
      {error && <p className="alert-error">Error: {error}</p>}

      <div className="grid">
        {items.map(r=>{
          const pet = pets.get(r.petId)
          const adopter = adopters.get(r.adopterId)
          const isPending = r.status === 'Pending'
          return (
            <div key={r.id} className="card">
              <div className="space-between">
                <strong>Solicitud #{r.id}</strong>
                <span className={`badge ${isPending? 'badge-warn':'badge-neutral'}`}>{r.status}</span>
              </div>
              <div className="row">
                <img className="thumb" src={pet?.photoUrl || 'https://placehold.co/200x200?text=Pet'} alt={pet?.name}/>
                <div>
                  <div><strong>Pet:</strong> {pet ? `${pet.name} (${pet.species})` : r.petId}</div>
                  <div><strong>Adopter:</strong> {adopter ? `${adopter.firstName} ${adopter.lastName}` : r.adopterId}</div>
                </div>
              </div>
              {r.message && <p className="muted">“{r.message}”</p>}
              {r.decidedAt && <small className="muted">Decidido: {r.decidedAt}</small>}
            </div>
          )
        })}
      </div>
      {!loading && !items.length && <p>No hay solicitudes.</p>}
    </div>
  )
}
