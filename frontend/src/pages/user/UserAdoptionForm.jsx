import { useState } from 'react'
import { createAdoptionRequest } from '../../services/adoptionRequests.js'

export default function UserAdoptionForm(){
  const [form, setForm] = useState({
    adopterName:'', email:'', phone:'', petId:'', notes:''
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
      setSending(true); setError(''); setOk(false)
      // Ajusta los campos a tu API real
      await createAdoptionRequest({
        adopterName: form.adopterName,
        email: form.email,
        phone: form.phone,
        petId: form.petId ? Number(form.petId) : null,
        notes: form.notes
      })
      setOk(true)
      setForm({ adopterName:'', email:'', phone:'', petId:'', notes:'' })
    }catch(err){
      setError('No se pudo enviar la solicitud')
    }finally{
      setSending(false)
    }
  }

  return (
    <div className="container">
      <div className="header"><span className="title">Adoption Form</span></div>
      <form className="card" onSubmit={onSubmit} style={{marginTop:16, display:'grid', gap:12}}>
        <input name="adopterName" placeholder="Your name" value={form.adopterName} onChange={onChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={onChange} />
        <input name="petId" placeholder="Pet ID (optional)" value={form.petId} onChange={onChange} />
        <textarea name="notes" placeholder="Notes" rows={4} value={form.notes} onChange={onChange} />
        {ok && <p style={{color:'#49B933', fontWeight:700}}>Solicitud enviada ✅</p>}
        {error && <p style={{color:'#b93333'}}>{error}</p>}
        <button className="btn" disabled={sending}>{sending ? 'Enviando…' : 'Enviar'}</button>
      </form>
    </div>
  )
}

