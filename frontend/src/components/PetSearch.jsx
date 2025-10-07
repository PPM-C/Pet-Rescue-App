import { useEffect, useState } from 'react'
import { listPets } from '../api/pets'

export default function PetSearch({ onPick }) {
  const [q, setQ] = useState('')
  const [res, setRes] = useState([])
  useEffect(() => {
    const t = setTimeout(async () => {
      const data = await listPets({ search: q, page:1, size:10 })
      setRes(data.data)
    }, 300)
    return () => clearTimeout(t)
  }, [q])
  return (
    <div style={{ display:'grid', gap:8 }}>
      <input placeholder="Buscar mascotas..." value={q} onChange={e=>setQ(e.target.value)} />
      <ul style={{ listStyle:'none', padding:0, margin:0 }}>
        {res.map(p => (
          <li key={p.id} style={{ padding:'6px 0', borderBottom:'1px solid #eee', cursor:'pointer' }}
              onClick={() => onPick?.(p)}>
            {p.name} — {p.species}
          </li>
        ))}
      </ul>
    </div>
  )
}
