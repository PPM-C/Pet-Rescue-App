import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { api } from '../../api'
import ImagePicker from '../../components/ImagePicker.jsx'
import { MdHome } from 'react-icons/md'

const base = { firstName:'', lastName:'', docId:'', email:'', phone:'', birthDate:'', avatarUrl:'' }

export default function AdminAdopterForm() {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const nav = useNavigate()
  const [form, setForm] = useState(base)
  const [error, setError] = useState('')

  useEffect(()=> {
    if (isEdit) (async()=> {
      try {
        const a = await api.getAdopter(id)
        setForm({
          firstName:a.firstName||'', lastName:a.lastName||'', docId:a.docId||'',
          email:a.email||'', phone:a.phone||'', birthDate:a.birthDate||'',
          avatarUrl:a.avatarUrl||''
        })
      } catch(e){ setError(e.message) }
    })()
  }, [id])

  const onChange = e => {
    const { name, value } = e.target
    setForm(f=> ({...f, [name]: value}))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isEdit) await api.updateAdopter(id, form)
      else await api.createAdopter(form)
      nav('/admin/adopters')
    } catch(e){ setError(e.message) }
  }

  return (
    <div>
      <div className="row" style={{marginBottom: 12}}>
        <Link className="btn btn-ghost" to="/admin"><MdHome style={{marginRight:6}}/> Admin Home</Link>
      </div>

      <form onSubmit={onSubmit} className="form-grid two" style={{maxWidth: 700}}>
        <h2 style={{gridColumn:'1/-1'}}>{isEdit ? 'Editar Adopter' : 'Add Adopter'}</h2>
        {error && <p className="alert-error" style={{gridColumn:'1/-1'}}>Error: {error}</p>}

        <div className="field"><label>Nombre</label><input className="input" name="firstName" value={form.firstName} onChange={onChange} required/></div>
        <div className="field"><label>Apellidos</label><input className="input" name="lastName" value={form.lastName} onChange={onChange} required/></div>
        <div className="field"><label>DNI</label><input className="input" name="docId" value={form.docId} onChange={onChange} required/></div>
        <div className="field"><label>Email</label><input className="input" type="email" name="email" value={form.email} onChange={onChange} required/></div>
        <div className="field"><label>Teléfono</label><input className="input" name="phone" value={form.phone} onChange={onChange} required/></div>
        <div className="field"><label>Fecha nacimiento</label><input className="input" type="date" name="birthDate" value={form.birthDate} onChange={onChange} required/></div>
        <ImagePicker label="Foto (avatar)" value={form.avatarUrl} onChange={v=>setForm(f=>({...f, avatarUrl:v}))}/>
        <div style={{gridColumn:'1/-1'}} className="row">
          <button className="btn btn-primary" type="submit">{isEdit ? 'Guardar' : 'Crear'}</button>
          <Link className="btn" to="/admin/adopters">Cancelar</Link>
        </div>
      </form>
    </div>
  )
}
