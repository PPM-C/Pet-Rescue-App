import { Routes, Route, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { getHealth } from './api/api.js'

import Home from './pages/Home.jsx'
// Admin
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AdminAdoptionRequests from './pages/admin/AdminAdoptionRequests.jsx'
import AdminPets from './pages/admin/AdminPets.jsx'
import AdminAddPet from './pages/admin/AdminAddPet.jsx'
import AdminAdopters from './pages/admin/AdminAdopters.jsx'
import AdminAddAdopter from './pages/admin/AdminAddAdopter.jsx'
import AdminVisits from './pages/admin/AdminVisits.jsx'
// User
import UserDashboard from './pages/user/UserDashboard.jsx'
import UserPets from './pages/user/UserPets.jsx'
import UserFavorites from './pages/user/UserFavorites.jsx'
import UserAdoptionForm from './pages/user/UserAdoptionForm.jsx'
import UserVisitRequest from './pages/user/UserVisitRequest.jsx'

export default function App() {
  useEffect(() => {
    getHealth().then(console.log).catch(console.error)
  }, [])

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/adoption-requests" element={<AdminAdoptionRequests />} />
        <Route path="/admin/pets" element={<AdminPets />} />
        <Route path="/admin/pets/new" element={<AdminAddPet />} />
        <Route path="/admin/adopters" element={<AdminAdopters />} />
        <Route path="/admin/adopters/new" element={<AdminAddAdopter />} />
        <Route path="/admin/visits" element={<AdminVisits />} />
        {/* User */}
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/user/pets" element={<UserPets />} />
        <Route path="/user/favorites" element={<UserFavorites />} />
        <Route path="/user/adoption-form" element={<UserAdoptionForm />} />
        <Route path="/user/visit-request" element={<UserVisitRequest />} />
        {/* Fallback */}
        <Route
          path="*"
          element={
            <div style={{ padding: 24 }}>
              <h1>404</h1>
              <p>Ruta no encontrada.</p>
              <Link className="btn" to="/">Volver al inicio</Link>
            </div>
          }
        />
      </Routes>
    </div>
  )
}
