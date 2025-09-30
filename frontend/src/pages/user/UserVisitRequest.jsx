import { useMemo, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { api } from '../../api'

function useQuery() {
  const { search } = useLocation()
  return useMemo(()=> new URLSearchParams(search), [search])
}

export default function UserVisitRequest() {
  const q = useQuery()
  const petId = q.get('petId')
  const petName = q.get('petName')

  const [form, setForm] = useState({
    firstName:'', lastName:'', docId:'', email:'', phone:'', birthDate:'',
    scheduledAt: '', notes: ''
  })
  const [info, setInfo] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onChange = e => setForm(f => ({...f, [e.target.name]: e.target.value}))

  const submit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true); setInfo(''); setError('')
      // Crear adopter
      const adopter = await api.createAdopter({
        firstName:form.firstName, lastName:form.lastName, docId:form.docId,
        email:form.email, phone:form.phone, birthDate:form.birthDate, avatarUrl:''
      })
      if (!petId) throw new Error('Falta seleccionar pet (vuelve desde la sección Pets).')
      // Crear adoption request
      const req = await api.createAdoptionRequest({ adopterId: adopter.id, petId: Number(petId), message: form.notes })
      // Programar visita
      await api.scheduleVisit(req.id, { scheduledAt: form.scheduledAt, notes: form.notes })
      setInfo('¡Solicitud enviada! El refugio se pondrá en contacto para confirmar.')
    } catch(e) { setError(e.message) } finally { setLoading(false) }
  }

  return (
    <div>
      <div className="row" style={{marginBottom: 12}}>
        <Link className="btn btn-ghost" to="/user">👤 User Home</Link>
      </div>
      <h2>Visit Request</h2>
      {petId && <p className="muted">Visita para: <strong>{petName}</strong> (ID {petId})</p>}
      {info && <p className="badge badge-success">{info}</p>}
      {error && <p className="alert-error">Error: {error}</p>}

      <form onSubmit={submit} className="form-grid two" style={{maxWidth: 800}}>
        <h3 style={{gridColumn:'1/-1'}}>Tus datos</h3>
        <div className="field"><label>Nombre</label><input className="input" name="firstName" value={form.firstName} onChange={onChange} required/></div>
        <div className="field"><label>Apellidos</label><input className="input" name="lastName" value={form.lastName} onChange={onChange} required/></div>
        <div className="field"><label>DNI</label><input className="input" name="docId" value={form.docId} onChange={onChange} required/></div>
        <div className="field"><label>Email</label><input className="input" type="email" name="email" value={form.email} onChange={onChange} required/></div>
        <div className="field"><label>Teléfono</label><input className="input" name="phone" value={form.phone} onChange={onChange} required/></div>
        <div className="field"><label>Nacimiento</label><input className="input" type="date" name="birthDate" value={form.birthDate} onChange={onChange} required/></div>

        <h3 style={{gridColumn:'1/-1'}}>Visita</h3>
        <div className="field"><label>Fecha y hora</label><input className="input" type="datetime-local" name="scheduledAt" value={form.scheduledAt} onChange={onChange} required/></div>
        <div className="field" style={{gridColumn:'1/-1'}}><label>Notas</label><textarea className="textarea" name="notes" value={form.notes} onChange={onChange} placeholder="Preferencias de horario, etc."/></div>

        <div style={{gridColumn:'1/-1'}} className="row">
          <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar'}</button>
          <Link className="btn" to="/user/pets">Cancelar</Link>
        </div>
      </form>
    </div>
  )
}
