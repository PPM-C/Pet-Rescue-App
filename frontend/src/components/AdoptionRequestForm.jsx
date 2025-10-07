import { useState } from 'react'
import { createAdoptionRequest } from '../api/adoptionRequests'

export default function AdoptionRequestForm({ adopterId, onCreated, onError }) {
  const [petName, setPetName] = useState('')
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  const submit = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      if (!petName.trim()) throw new Error('Indica el nombre de la mascota')
      await createAdoptionRequest({ adopterId, petName: petName.trim(), message })
      onCreated?.()
    } catch (e) { onError?.(e.message) }
    finally { setSaving(false) }
  }

  return (
    <form onSubmit={submit} style={{ display:'grid', gap:12, maxWidth:460 }}>
      <label>Mascota (por nombre)
        <input value={petName} onChange={e=>setPetName(e.target.value)} placeholder="Luna" />
      </label>
      <label>Mensaje
        <textarea rows={3} value={message} onChange={e=>setMessage(e.target.value)} />
      </label>
      <button disabled={saving}>{saving ? 'Enviando…' : 'Solicitar adopción'}</button>
    </form>
  )
}
