import { useState } from 'react'
import { createPet } from '../api/pets'   // <- asegúrate de que existe y exporta createPet

const SPECIES = ['Dog', 'Cat', 'Ferret']
const SEXES = ['Female', 'Male']
const SIZES = ['Small', 'Medium', 'Large']
const TEMPERAMENTS = ['Sociable', 'Reactive', 'Shy', 'Insecure']
const ENERGY = ['Low', 'Medium', 'High']

const todayStr = () => new Date().toISOString().slice(0, 10)

export default function PetForm() {
  const [form, setForm] = useState({
    // obligatorios
    name: '',
    species: 'Dog',
    sex: 'Female',
    size: 'Medium',
    temperament: 'Sociable',
    arrivalDate: todayStr(),

    // opcionales generales
    age: '',
    shelterId: '',
    energyLevel: 'Medium',
    goodWithDogs: true,
    goodWithCats: true,
    neutered: false,
    photoUrl: '',
    notes: '',

    // opcionales por especie
    breed: '',          // Dog
    isTrained: false,   // Dog
    litterTrained: true // Cat
  })

  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)
  const [serverMsg, setServerMsg] = useState('')

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    setErrors(errs => ({ ...errs, [name]: undefined }))
  }

  const validate = () => {
    const errs = {}
    const name = (form.name || '').trim()
    if (!name) errs.name = 'El nombre es obligatorio'
    if (!form.arrivalDate) errs.arrivalDate = 'La fecha es obligatoria'
    else if (form.arrivalDate > todayStr()) errs.arrivalDate = 'La fecha no puede ser futura'
    if (form.age !== '' && Number(form.age) < 0) errs.age = 'Edad no puede ser negativa'
    if (form.shelterId !== '' && Number(form.shelterId) < 1) errs.shelterId = 'Shelter ID debe ser ≥ 1'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setServerMsg('')
    if (!validate()) return

    const base = {
      name: form.name.trim(),
      species: form.species,
      sex: form.sex,
      size: form.size,
      temperament: form.temperament,
      arrivalDate: form.arrivalDate,
      energyLevel: form.energyLevel,
      goodWithDogs: !!form.goodWithDogs,
      goodWithCats: !!form.goodWithCats,
      neutered: !!form.neutered,
      ...(form.age === '' ? {} : { age: Number(form.age) }),
      ...(form.shelterId === '' ? {} : { shelterId: Number(form.shelterId) }),
      ...(form.photoUrl.trim() ? { photoUrl: form.photoUrl.trim() } : {}),
      ...(form.notes.trim() ? { notes: form.notes.trim() } : {}),
    }

    // Campos específicos por especie
    let payload = base
    if (form.species === 'Dog') {
      payload = {
        ...base,
        ...(form.breed.trim() ? { breed: form.breed.trim() } : {}),
        isTrained: !!form.isTrained,
      }
    } else if (form.species === 'Cat') {
      payload = {
        ...base,
        litterTrained: !!form.litterTrained,
      }
    }

    setSaving(true)
    try {
      const created = await createPet(payload)
      setServerMsg(`✅ Pet creado (id: ${created?.id ?? 'desconocido'})`)
      // reset conservando defaults
      setForm({
        name: '',
        species: 'Dog',
        sex: 'Female',
        size: 'Medium',
        temperament: 'Sociable',
        arrivalDate: todayStr(),
        age: '',
        shelterId: '',
        energyLevel: 'Medium',
        goodWithDogs: true,
        goodWithCats: true,
        neutered: false,
        photoUrl: '',
        notes: '',
        breed: '',
        isTrained: false,
        litterTrained: true
      })
    } catch (err) {
      setServerMsg(`❌ ${err.message || 'No se pudo crear el pet'}`)
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const FieldError = ({ name }) =>
    errors[name] ? <div style={{ color: 'crimson', fontSize: 12 }}>{errors[name]}</div> : null

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 560 }}>
      {/* Básicos */}
      <div>
        <label>Nombre *</label>
        <input name="name" placeholder="Ej: Luna" value={form.name} onChange={onChange} />
        <FieldError name="name" />
      </div>

      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div>
          <label>Especie</label>
          <select name="species" value={form.species} onChange={onChange}>
            {SPECIES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label>Sex</label>
          <select name="sex" value={form.sex} onChange={onChange}>
            {SEXES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label>Size</label>
          <select name="size" value={form.size} onChange={onChange}>
            {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label>Temperament</label>
          <select name="temperament" value={form.temperament} onChange={onChange}>
            {TEMPERAMENTS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Fecha */}
      <div>
        <label>Arrival date *</label>
        <input type="date" name="arrivalDate" max={todayStr()} value={form.arrivalDate} onChange={onChange} />
        <FieldError name="arrivalDate" />
      </div>

      {/* Opcionales generales */}
      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <div>
          <label>Edad (opcional)</label>
          <input type="number" name="age" min="0" value={form.age} onChange={onChange} placeholder="Ej: 2" />
          <FieldError name="age" />
        </div>
        <div>
          <label>Shelter ID (opcional)</label>
          <input type="number" name="shelterId" min="1" value={form.shelterId} onChange={onChange} placeholder="Ej: 1" />
          <FieldError name="shelterId" />
        </div>
        <div>
          <label>Energy level</label>
          <select name="energyLevel" value={form.energyLevel} onChange={onChange}>
            {ENERGY.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
        <div>
          <label>Photo URL</label>
          <input name="photoUrl" value={form.photoUrl} onChange={onChange} placeholder="https://..." />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <label><input type="checkbox" name="goodWithDogs" checked={form.goodWithDogs} onChange={onChange} /> Good with dogs</label>
        <label><input type="checkbox" name="goodWithCats" checked={form.goodWithCats} onChange={onChange} /> Good with cats</label>
        <label><input type="checkbox" name="neutered" checked={form.neutered} onChange={onChange} /> Neutered</label>
      </div>

      <div>
        <label>Notas</label>
        <textarea name="notes" value={form.notes} onChange={onChange} rows={3} placeholder="Notas del pet..." />
      </div>

      {/* Campos por especie */}
      {form.species === 'Dog' && (
        <div style={{ borderTop: '1px solid #ddd', paddingTop: 8 }}>
          <strong>Datos de perro</strong>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <label>Breed</label>
              <input name="breed" value={form.breed} onChange={onChange} placeholder="Ej: Labrador" />
            </div>
            <label style={{ alignSelf: 'end' }}>
              <input type="checkbox" name="isTrained" checked={form.isTrained} onChange={onChange} /> Trained
            </label>
          </div>
        </div>
      )}

      {form.species === 'Cat' && (
        <div style={{ borderTop: '1px solid #ddd', paddingTop: 8 }}>
          <strong>Datos de gato</strong>
          <label>
            <input type="checkbox" name="litterTrained" checked={form.litterTrained} onChange={onChange} /> Litter trained
          </label>
        </div>
      )}

      <button type="submit" disabled={saving}>
        {saving ? 'Creando…' : 'Crear pet'}
      </button>

      {serverMsg && <div style={{ marginTop: 8 }}>{serverMsg}</div>}
    </form>
  )
}
