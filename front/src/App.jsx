/*
  App.jsx
  - Point d'entrée principal de l'application React.
  - Fournit le contexte d'authentification (`AuthProvider`) à toute l'application.
  - Définit les routes publiques et privées (via `PrivateRoute`).
  - Les routes protégées utilisent `PrivateRoute` pour rediriger si non authentifié
    et pour restreindre l'accès admin lorsque demandé.
*/
import { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Users from './pages/Users.jsx';

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>} />

            <Route path="/users" element={
              <PrivateRoute adminOnly={true}>
                <Users />
              </PrivateRoute>} />
          </Routes>
        </Router>

      </AuthProvider>

    </>
  )
}

export default App
