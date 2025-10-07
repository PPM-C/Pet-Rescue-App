import { Link } from 'react-router-dom'

export default function AdminDashboard(){
  return (
    <div className="container">
      <div className="header"><span className="title">Admin Dashboard</span></div>
      <div className="grid grid-2" style={{marginTop:16}}>
        <Link className="card" to="/admin/adoption-requests">Adoption Requests</Link>
        <Link className="card" to="/admin/pets">Pets</Link>
        <Link className="card" to="/admin/pets/new">Add Pet</Link>
        <Link className="card" to="/admin/adopters">Adopters</Link>
        <Link className="card" to="/admin/adopters/new">Add Adopter</Link>
        <Link className="card" to="/admin/visits">Visits</Link>
      </div>
    </div>
  )
}

