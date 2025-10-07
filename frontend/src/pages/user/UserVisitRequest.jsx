import { useState } from 'react'
import { createVisit } from '../../services/visits'

export default function UserVisitRequest(){
  const [form, setForm] = useState({
    name:'', email:'', phone:'', petId:'', message:''
  })
  const [ok, setOk] = useState(false)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({...prev, [name]: value}))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try{
      setSending(true); setOk(false); setError('')
      // Ajusta a los nombres que espera tu API de "Visit"
      await createVisit({
        requesterName: form.name,
        email: form.email,
        phone: form.phone,
        petId: form.petId ? Number(form.petId) : null,
        message: form.message
      })
      setOk(true)
      setForm({name:'', email:'', phone:'', petId:'', message:''})
    }catch(err){
      setError('No se pudo crear la visita')
    }finally{
      setSending(false)
    }
  }

  return (
    <div className="container">
      <div className="header"><span className="title">Visit Request</span></div>
      <form className="card" onSubmit={onSubmit} style={{marginTop:16, display:'grid', gap:12}}>
        <input name="name" placeholder="Your name" value={form.name} onChange={onChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} />
        <input name="petId" placeholder="Pet ID (optional)" value={form.petId} onChange={onChange} />
        <textarea name="message" placeholder="Message" rows={4} value={form.message} onChange={onChange} />
        {ok && <p style={{color:'#49B933', fontWeight:700}}>Solicitud enviada ✅</p>}
        {error && <p style={{color:'#b93333'}}>{error}</p>}
        <button className="btn" disabled={sending}>{sending ? 'Enviando…' : 'Enviar'}</button>
      </form>
    </div>
  )
}
