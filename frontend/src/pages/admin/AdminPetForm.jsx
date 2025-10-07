import { useEffect, useState } from 'react'
import { api } from '../../api'
import { Link, useNavigate, useParams } from 'react-router-dom'

const empty = {
  species:'Dog', name:'', sex:'Male', size:'Medium',
  arrivalDate: new Date().toISOString().slice(0,10),
  temperament:'Sociable', energyLevel:'Neutral',
  goodWithDogs:true, goodWithCats:true, neutered:false,
  breed:'', isTrained:false, litterTrained:true, odorControlTrained:false
}

export default function AdminPetForm(){
  const { id } = useParams()
  const nav = useNavigate()
  const [f, setF] = useState(empty)
  const [error, setError] = useState('')

  useEffect(()=>{
    (async()=>{
      if(!id) return
      try{
        const p = await api.getPet(id)
        setF({
          ...f, ...p,
          arrivalDate: p.arrivalDate || new Date().toISOString().slice(0,10)
        })
      }catch(e){ setError(e.message) }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id])

  const onChange = e => {
    const { name, value, type, checked } = e.target
    setF(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const onSubmit = async(e)=>{
    e.preventDefault()
    try{
      if (id) await api.updatePet(id, f)
      else await api.createPet(f)
      nav('/admin/pets')
    }catch(e){ setError(e.message) }
  }

  return (
    <div>
      <div className="row" style={{marginBottom:12}}>
        <Link className="btn btn-ghost" to="/admin">🏠 Admin</Link>
        <Link className="btn btn-ghost" to="/admin/pets">🐾 Pets</Link>
      </div>

      <form className="form" onSubmit={onSubmit}>
        <div className="row" style={{justifyContent:'space-between'}}>
          <h2>{id ? 'Edit Pet' : 'Add New Pet'}</h2>
          <button className="btn btn-primary">{id ? 'Save' : 'Add Pet'}</button>
        </div>

        {error && <p className="muted">Error: {error}</p>}

        <div className="field">
          <label>Name</label>
          <input className="control" name="name" value={f.name} onChange={onChange} placeholder="Enter pet's name"/>
        </div>

        <div className="field">
          <label>Species</label>
          <select className="control" name="species" value={f.species} onChange={onChange}>
            <option>Dog</option><option>Cat</option><option>Ferret</option>
          </select>
        </div>

        <div className="field">
          <label>Breed</label>
          <input className="control" name="breed" value={f.breed||''} onChange={onChange} placeholder="Select breed"/>
        </div>

        <div className="row">
          <div className="field" style={{flex:1}}>
            <label>Gender</label>
            <select className="control" name="sex" value={f.sex} onChange={onChange}>
              <option>Male</option><option>Female</option>
            </select>
          </div>
          <div className="field" style={{flex:1}}>
            <label>Size</label>
            <select className="control" name="size" value={f.size} onChange={onChange}>
              <option>Small</option><option>Medium</option><option>Large</option>
            </select>
          </div>
        </div>

        {/* Specific toggles */}
        {f.species === 'Dog' && (
          <div className="field">
            <label><input type="checkbox" name="isTrained" checked={!!f.isTrained} onChange={onChange} /> Trained</label>
          </div>
        )}
        {f.species === 'Cat' && (
          <div className="field">
            <label><input type="checkbox" name="litterTrained" checked={!!f.litterTrained} onChange={onChange} /> Litter trained</label>
          </div>
        )}
        {f.species === 'Ferret' && (
          <div className="field">
            <label><input type="checkbox" name="odorControlTrained" checked={!!f.odorControlTrained} onChange={onChange} /> Odor control trained</label>
          </div>
        )}

        <div className="dropzone">Upload Photo • Browse Files</div>
      </form>
    </div>
  )
}
