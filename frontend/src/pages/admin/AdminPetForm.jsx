import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { api } from '../../api'
import ImagePicker from '../../components/ImagePicker.jsx'
import { MdHome } from 'react-icons/md'

const base = {
  species: 'Dog',
  name: '', sex: 'Male', size: 'Medium',
  arrivalDate: new Date().toISOString().slice(0,10),
  temperament: 'Sociable', energyLevel: 'Neutral',
  goodWithDogs: true, goodWithCats: true, neutered: false,
  shelterId: 1, breed: '', isTrained: false, litterTrained: true, odorControlTrained: false,
  photoUrl: ''
}

export default function AdminPetForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const nav = useNavigate()
  const [form, setForm] = useState(base)
  const [error, setError] = useState('')

  useEffect(()=>{
    if (isEdit) (async()=>{
      try { const data = await api.getPet(id); setForm({ ...base, ...data }) }
      catch(e){ setError(e.message) }
    })()
  }, [id])

  const onChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEdit) await api.updatePet(id, form)
      else await api.createPet(form)
      nav('/admin/pets')
    } catch (e) { setError(e.message) }
  }

  return (
    <div>
      <div className="row" style={{marginBottom: 12}}>
        <Link className="btn btn-ghost" to="/admin"><MdHome style={{marginRight:6}}/> Admin Home</Link>
      </div>

      <form onSubmit={onSubmit} className="form-grid two" style={{maxWidth: 780}}>
        <h2 style={{gridColumn:'1/-1'}}>{isEdit ? 'Editar Pet' : 'Add Pet'}</h2>
        {error && <p className="alert-error" style={{gridColumn:'1/-1'}}>Error: {error}</p>}

        <div className="field">
          <label>Nombre</label>
          <input className="input" name="name" value={form.name} onChange={onChange} required/>
        </div>

        <ImagePicker label="Foto del Pet" value={form.photoUrl} onChange={v=>setForm(f=>({...f, photoUrl: v}))}/>

        <div className="field">
          <label>Especie</label>
          <select className="select" name="species" value={form.species} onChange={onChange}>
            <option>Dog</option><option>Cat</option><option>Ferret</option>
          </select>
        </div>

        <div className="field">
          <label>Sexo</label>
          <select className="select" name="sex" value={form.sex} onChange={onChange}>
            <option>Male</option><option>Female</option>
          </select>
        </div>

        <div className="field">
          <label>Tamaño</label>
          <select className="select" name="size" value={form.size} onChange={onChange}>
            <option>Small</option><option>Medium</option><option>Large</option>
          </select>
        </div>

        <div className="field">
          <label>Temperamento</label>
          <select className="select" name="temperament" value={form.temperament} onChange={onChange}>
            <option>Sociable</option><option>Reactive</option><option>Shy</option><option>Insecure</option>
          </select>
        </div>

        <div className="field">
          <label>Energía</label>
          <select className="select" name="energyLevel" value={form.energyLevel} onChange={onChange}>
            <option>Inactive</option><option>Neutral</option><option>Active</option>
          </select>
        </div>

        <div className="field">
          <label>Fecha llegada</label>
          <input className="input" type="date" name="arrivalDate" value={form.arrivalDate} onChange={onChange} required/>
        </div>

        <div className="field"><label><input className="checkbox" type="checkbox" name="goodWithDogs" checked={!!form.goodWithDogs} onChange={onChange}/> Compatible con perros</label></div>
        <div className="field"><label><input className="checkbox" type="checkbox" name="goodWithCats" checked={!!form.goodWithCats} onChange={onChange}/> Compatible con gatos</label></div>
        <div className="field"><label><input className="checkbox" type="checkbox" name="neutered" checked={!!form.neutered} onChange={onChange}/> Esterilizado</label></div>

        <div className="field">
          <label>Shelter ID</label>
          <input className="input" name="shelterId" type="number" value={form.shelterId} onChange={onChange} required/>
        </div>

        {form.species === 'Dog' && (
          <>
            <div className="field"><label>Raza</label><input className="input" name="breed" value={form.breed||''} onChange={onChange}/></div>
            <div className="field"><label><input className="checkbox" type="checkbox" name="isTrained" checked={!!form.isTrained} onChange={onChange}/> Adiestrado</label></div>
          </>
        )}
        {form.species === 'Cat' && (
          <>
            <div className="field"><label>Raza</label><input className="input" name="breed" value={form.breed||''} onChange={onChange}/></div>
            <div className="field"><label><input className="checkbox" type="checkbox" name="litterTrained" checked={!!form.litterTrained} onChange={onChange}/> Usa arenero</label></div>
          </>
        )}
        {form.species === 'Ferret' && (
          <>
            <div className="field"><label>Raza</label><input className="input" name="breed" value={form.breed||''} onChange={onChange}/></div>
            <div className="field"><label><input className="checkbox" type="checkbox" name="odorControlTrained" checked={!!form.odorControlTrained} onChange={onChange}/> Control olor</label></div>
          </>
        )}

        <div style={{gridColumn:'1/-1'}} className="row">
          <button className="btn btn-primary" type="submit">{isEdit ? 'Guardar' : 'Crear'}</button>
          <Link className="btn" to="/admin/pets">Cancelar</Link>
        </div>
      </form>
    </div>
  )
}
