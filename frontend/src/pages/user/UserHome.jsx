import { Link } from 'react-router-dom'

export default function UserHome(){
  return (
    <div className="tiles">
      <Link className="tile" to="/user/pets">
        <div className="tile-icon">🐾</div>
        <div className="tile-label">Pets</div>
      </Link>
      <Link className="tile" to="/user/favorites">
        <div className="tile-icon">❤️</div>
        <div className="tile-label">Lovely Pets</div>
      </Link>
      <Link className="tile" to="/user/adoption-form">
        <div className="tile-icon">📝</div>
        <div className="tile-label">Adoption Forms</div>
      </Link>
      <Link className="tile" to="/user/visit-request">
        <div className="tile-icon">📅</div>
        <div className="tile-label">Visit Request</div>
      </Link>
    </div>
  )
}
