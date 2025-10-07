// src/pages/admin/AdminAddPet.jsx
import { Link } from 'react-router-dom'
import PetForm from '../../components/PetForm.jsx'

export default function AdminAddPet() {
  return (
    <div style={{ padding: 24, maxWidth: 960, margin: '0 auto' }}>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 16
      }}>
        <h1 style={{ margin: 0 }}>Crear nuevo pet</h1>
        <Link to="/admin/pets" style={{
          textDecoration: 'none',
          padding: '8px 12px',
          borderRadius: 8,
          border: '1px solid #ddd'
        }}>
          ← Volver a la lista
        </Link>
      </header>

      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: 16,
        boxShadow: '0 2px 14px rgba(0,0,0,.06)'
      }}>
        <PetForm />
      </div>
    </div>
  )
}
