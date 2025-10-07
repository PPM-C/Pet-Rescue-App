import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { petPlaceholder } from '../api'

export default function PetCard({ pet, admin=false, onDelete }) {
  const { ids, toggle } = useFavorites()
  const fav = ids.includes(pet.id)

  return (
    <div className="card">
      <div style={{position:'relative'}}>
        <img className="thumb" src={pet.photoUrl || petPlaceholder(pet.species)} alt={pet.name}/>
        {!admin && (
          <button className={`heart ${fav ? 'is-active':''}`} onClick={()=>toggle(pet.id)}>
            <span>♥</span>
          </button>
        )}
      </div>
      <div className="content">
        <h3 className="title">{pet.name}</h3>
        <div className="muted">{pet.species} • {pet.sex} • {pet.size}</div>
        {admin ? (
          <div className="row" style={{marginTop:10}}>
            <Link className="btn btn-soft" to={`/admin/pets/${pet.id}/edit`}>Edit</Link>
            <button className="btn btn-danger-soft" onClick={()=>onDelete?.(pet.id)}>Delete</button>
          </div>
        ) : (
          <div className="row" style={{marginTop:10}}>
            <Link className="btn btn-primary" to={`/user/adoption-form?petId=${pet.id}&petName=${encodeURIComponent(pet.name)}`}>Adoption Request</Link>
            <Link className="btn btn-ghost" to={`/user/visit-request?petId=${pet.id}&petName=${encodeURIComponent(pet.name)}`}>Schedule Visit</Link>
          </div>
        )}
      </div>
    </div>
  )
}
