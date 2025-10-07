import { Link } from 'react-router-dom'

export default function UserDashboard(){
  return (
    <div className="container">
      <div className="header"><span className="title">User Dashboard</span></div>
      <div className="grid grid-2" style={{marginTop:16}}>
        <Link className="card" to="/user/pets">Pets</Link>
        <Link className="card" to="/user/favorites">Lovely Pets</Link>
        <Link className="card" to="/user/adoption-form">Adoption Forms</Link>
        <Link className="card" to="/user/visit-request">Visit Request</Link>
      </div>
    </div>
  )
}

