import { useEffect, useState } from 'react'
import { getPets, deletePet } from '../../services/pets'


export default function AdminPets(){
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    try{
      setLoading(true)
      setError('')
      const data = await getPets()
      setPets(Array.isArray(data) ? data : [])
    }catch(e){
      setError('No se pudieron cargar los pets')
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if(!confirm('¿Borrar este pet?')) return
    try{
      await deletePet(id)
      setPets(prev => prev.filter(p => p.id !== id))
    }catch(e){
      alert('Error al borrar')
    }
  }

  if(loading) return <div className="container"><div className="header"><span className="title">Pets</span></div><p>Cargando…</p></div>
  if(error)   return <div className="container"><div className="header"><span className="title">Pets</span></div><p style={{color:'#b93333'}}>{error}</p></div>

  return (
    <div className="container">
      <div className="header"><span className="title">Pets</span></div>
      <div className="list" style={{marginTop:16}}>
        {pets.map(p => (
          <div className="item" key={p.id}>
            <strong>{p.name}</strong> — {p.species} — {p.status}
            <div style={{display:'flex', gap:8, marginTop:8}}>
              <button className="btn secondary">Edit</button>
              <button className="btn secondary" onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
