import { useEffect, useState } from 'react'
import { createPet, getPet, updatePet } from '../api/pets'

const SPECIES = ['Dog','Cat','Ferret']
const SEXES = ['Male','Female']
const SIZES = ['Small','Medium','Large']
const TEMPERAMENTS = ['Sociable','Reactive','Shy','Insecure']

export default function AdminPetForm({ id, onSaved, onError }) {
  const edit = Boolean(id)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name:'', species:'Dog', sex:'Female', size:'Medium',
    temperament:'Sociable', arrivalDate:'', age:'', photoUrl:'', notes:''
  })

  useEffect(() => {
    if (!edit) return
    ;(async () => {
      try {
        const p = await getPet(id)
        setForm({
          name: p.name || '',
          species: p.species || 'Dog',
          sex: p.sex || 'Female',
          size: p.size || 'Medium',
          temperament: p.temperament || 'Sociable',
          arrivalDate: p.arrivalDate || '',
          age: p.age ?? '',
          photoUrl: p.photoUrl || '',
          notes: p.notes || ''
        })
      } catch (e) { onError?.(e.message) }
    })()
  }, [id])

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault(); setSaving(true)
    try {
      const payload = {
        name: form.name.trim(),
        species: form.species, sex: form.sex, size: form.size,
        temperament: form.temperament,
        arrivalDate: form.arrivalDate, // YYYY-MM-DD
        photoUrl: form.photoUrl || undefined,
        notes: form.notes || undefined
      }
      if (!payload.name) throw new Error('El nombre es obligatorio')
      if (edit) await updatePet(id, payload); else await createPet(payload)
      onSaved?.()
    } catch (e) { onError?.(e.message) }
    finally { setSaving(false) }
  }

  return (
    <form onSubmit={onSubmit} style={{ display:'grid', gap:12, maxWidth:520 }}>
      <label>Nombre*<input name="name" value={form.name} onChange={onChange} /></label>
      <label>Especie
        <select name="species" value={form.species} onChange={onChange}>
          {SPECIES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>
      <label>Sexo
        <select name="sex" value={form.sex} onChange={onChange}>
          {SEXES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>
      <label>Tamaño
        <select name="size" value={form.size} onChange={onChange}>
          {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>
      <label>Temperamento
        <select name="temperament" value={form.temperament} onChange={onChange}>
          {TEMPERAMENTS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </label>
      <label>Arrival date
        <input type="date" name="arrivalDate" value={form.arrivalDate} onChange={onChange} />
      </label>
      <label>Foto (URL)
        <input name="photoUrl" value={form.photoUrl} onChange={onChange} />
      </label>
      <label>Notas
        <textarea name="notes" rows={3} value={form.notes} onChange={onChange} />
      </label>
      <button disabled={saving}>{saving ? 'Guardando…' : 'Guardar'}</button>
    </form>
  )
}
