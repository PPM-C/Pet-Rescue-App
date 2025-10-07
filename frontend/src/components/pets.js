import { useState } from 'react'
import { createPet } from '../api/pets'

export default function PetForm({ onCreated }) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const payload = { name }
    if (age !== '') payload.age = Number(age)
    try {
      await createPet(payload)
      alert('Pet creado')
      setName('')
      setAge('')
      onCreated?.()
    } catch (err) {
      console.error(err)
      alert('Error creando el pet: ' + err.message)
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 8, maxWidth: 320 }}>
      <input
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Edad"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button type="submit">Crear</button>
    </form>
  )
}
