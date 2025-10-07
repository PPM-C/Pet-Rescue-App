import { Link } from 'react-router-dom'
import HealthCheckButton from '../components/HealthCheckButton.jsx'

export default function Home(){
  return (
    <div className="container">
      <h1 className="title">PetRescue</h1>
      <p>Elige un perfil para continuar:</p>
      <div className="grid grid-2" style={{marginTop:16}}>
        <div className="card">
          <h3>Admin</h3>
          <p>Gestiona pets, adopters, solicitudes y visitas.</p>
          <Link className="btn" to="/admin">Entrar</Link>
        </div>
        <div className="card">
          <h3>User</h3>
          <p>Explora mascotas y envía solicitudes.</p>
          <Link className="btn" to="/user">Entrar</Link>
        </div>
      </div>

      <div style={{marginTop:24}}>
        <HealthCheckButton />
      </div>
    </div>
  )
}
