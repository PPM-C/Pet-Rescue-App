// src/App.jsx
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

// ADMIN pages
import AdminHome from './pages/admin/AdminHome.jsx'
import AdminAdoptionRequests from './pages/admin/AdminAdoptionRequests.jsx'
import AdminSearch from './pages/admin/AdminSearch.jsx'
import AdminPets from './pages/admin/AdminPets.jsx'
import AdminPetForm from './pages/admin/AdminPetForm.jsx'
import AdminAdopters from './pages/admin/AdminAdopters.jsx'
import AdminAdopterForm from './pages/admin/AdminAdopterForm.jsx'
import AdminVisits from './pages/admin/AdminVisits.jsx'

// USER pages
import UserHome from './pages/user/UserHome.jsx'
import UserPets from './pages/user/UserPets.jsx'
import UserFavorites from './pages/user/UserFavorites.jsx'
import UserAdoptionForm from './pages/user/UserAdoptionForm.jsx'
import UserVisitRequest from './pages/user/UserVisitRequest.jsx'

// Shared
import HealthIndicator from './components/HealthIndicator.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'

export default function App() {
  const nav = useNavigate()

  return (
    <FavoritesProvider>
      <div className="container">
        <header className="header">
          <h1
            className="brand"
            style={{ cursor: 'pointer' }}
            onClick={() => nav('/')}
          >
            PetRescue
          </h1>

          <nav className="navbar">
            <Link to="/admin">Admin</Link>
            <Link to="/user">User</Link>
          </nav>

          <HealthIndicator />
        </header>

        <hr />

        <Routes>
          {/* Home con elección de perfil */}
          <Route
            path="/"
            element={
              <div className="tiles">
                <Link className="tile" to="/admin">
                  <div className="tile-icon">👩‍💼</div>
                  <div className="tile-label">Admin</div>
                </Link>
                <Link className="tile" to="/user">
                  <div className="tile-icon">👤</div>
                  <div className="tile-label">User</div>
                </Link>
              </div>
            }
          />

          {/* ADMIN */}
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/adoption-requests" element={<AdminAdoptionRequests />} />
          <Route path="/admin/search" element={<AdminSearch />} />
          <Route path="/admin/pets" element={<AdminPets />} />
          <Route path="/admin/pets/new" element={<AdminPetForm />} />
          <Route path="/admin/pets/:id/edit" element={<AdminPetForm />} />
          <Route path="/admin/adopters" element={<AdminAdopters />} />
          <Route path="/admin/adopters/new" element={<AdminAdopterForm />} />
          <Route path="/admin/adopters/:id/edit" element={<AdminAdopterForm />} />
          <Route path="/admin/visits" element={<AdminVisits />} />

          {/* USER */}
          <Route path="/user" element={<UserHome />} />
          <Route path="/user/pets" element={<UserPets />} />
          <Route path="/user/favorites" element={<UserFavorites />} />
          <Route path="/user/adoption-form" element={<UserAdoptionForm />} />
          <Route path="/user/visit-request" element={<UserVisitRequest />} />
        </Routes>

        <footer className="footer">
          © {new Date().getFullYear()} PetRescue
        </footer>
      </div>
    </FavoritesProvider>
  )
}
