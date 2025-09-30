import { useMemo, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { api } from '../../api'
import ImagePicker from '../../components/ImagePicker.jsx'

function useQuery() {
  const { search } = useLocation()
  return useMemo(()=> new URLSearchParams(search), [search])
}

export default function UserAdoptionForm() {
  const q = useQuery()
  const nav = useNavigate()
  const petId = q.get('petId')
  const petName = q.get('petName')

  const [adopter, setAdopter] = useState({
    firstName:'', lastName:'', docId:'', email:'', phone:'', birthDate:'', avatarUrl:''
  })
  const [prefs, setPrefs] = useState({ species:'Dog', energyLevel:'Neutral', size:'Medium', message:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [ok, setOk] = useState(false)

  const onChange = (set) => (e) => {
    const { name, value } = e.target
    set(prev => ({...prev, [name]: value}))
  }

  const submit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true); setError(''); setOk(false)
      // 1) crear adopter
      const a = await api.createAdopter(adopter)
      const adopterId = a.id
      // 2) escoger pet si no viene
      let chosenPetId = petId
      if (!chosenPetId) {
        const page = await api.searchPets('') // trae muchos
        const list = (page.content || []).filter(p =>
          (!prefs.species || p.species === prefs.species) &&
          (!prefs.energyLevel || p.energyLevel === prefs.energyLevel) &&
          (!prefs.size || p.size === prefs.size) &&
          p.status === 'Adoptable'
        )
        if (!list.length) throw new Error('No hay mascotas que cumplan tu preferencia ahora mismo.')
        chosenPetId = list[0].id
      }
      // 3) crear adoption request
      await api.createAdoptionRequest({ adopterId, petId: Number(chosenPetId), message: prefs.message })
      setOk(true)
      // opcional: navegar a User Pets
      // nav('/user/pets')
    } catch(e){ setError(e.message) } finally { setLoading(false) }
  }

  return (
    <div>
      <div className="row" style={{marginBottom: 12}}>
        <Link className="btn btn-ghost" to="/user">👤 User Home</Link>
      </div>
      <h2>Adoption Form</h2>
      {petId && <p className="muted">Interesado en: <strong>{petName}</strong> (ID {petId})</p>}
      {error && <p className="alert-error">Error: {error}</p>}
      {ok && <p className="badge badge-success">¡Solicitud enviada! El refugio te contactará.</p>}

      <form onSubmit={submit} className="form-grid two" style={{maxWidth: 800}}>
        <h3 style={{gridColumn:'1/-1'}}>Tus datos</h3>
        <div className="field"><label>Nombre</label><input className="input" name="firstName" value={adopter.firstName} onChange={onChange(setAdopter)} required/></div>
        <div className="field"><label>Apellidos</label><input className="input" name="lastName" value={adopter.lastName} onChange={onChange(setAdopter)} required/></div>
        <div className="field"><label>DNI</label><input className="input" name="docId" value={adopter.docId} onChange={onChange(setAdopter)} required/></div>
        <div className="field"><label>Email</label><input className="input" type="email" name="email" value={adopter.email} onChange={onChange(setAdopter)} required/></div>
        <div className="field"><label>Teléfono</label><input className="input" name="phone" value={adopter.phone} onChange={onChange(setAdopter)} required/></div>
        <div className="field"><label>Nacimiento</label><input className="input" type="date" name="birthDate" value={adopter.birthDate} onChange={onChange(setAdopter)} required/></div>
        <ImagePicker label="Tu foto (opcional)" value={adopter.avatarUrl} onChange={v=>setAdopter(f=>({...f, avatarUrl:v}))}/>

        <h3 style={{gridColumn:'1/-1', marginTop:8}}>Preferencias</h3>
        <div className="field">
          <label>Especie</label>
          <select className="select" name="species" value={prefs.species} onChange={onChange(setPrefs)}>
            <option>Dog</option><option>Cat</option><option>Ferret</option>
          </select>
        </div>
        <div className="field">
          <label>Energía</label>
          <select className="select" name="energyLevel" value={prefs.energyLevel} onChange={onChange(setPrefs)}>
            <option>Inactive</option><option>Neutral</option><option>Active</option>
          </select>
        </div>
        <div className="field">
          <label>Tamaño</label>
          <select className="select" name="size" value={prefs.size} onChange={onChange(setPrefs)}>
            <option>Small</option><option>Medium</option><option>Large</option>
          </select>
        </div>
        <div className="field" style={{gridColumn:'1/-1'}}>
          <label>Mensaje</label>
          <textarea className="textarea" name="message" value={prefs.message} onChange={onChange(setPrefs)} placeholder="Cuéntanos sobre tu hogar y rutina..."/>
        </div>

        <div style={{gridColumn:'1/-1'}} className="row">
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar solicitud'}</button>
          <Link className="btn" to="/user/pets">Cancelar</Link>
        </div>
      </form>
    </div>
  )
}
