import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import useAuth from './hooks/useAuth'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Hoteles from './pages/Hoteles'
import Habitaciones from './pages/Habitaciones'
import Reservas from './pages/Reservas'
import Reservantes from './pages/Reservantes'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/hoteles" element={<PrivateRoute><Hoteles /></PrivateRoute>} />
        <Route path="/habitaciones" element={<PrivateRoute><Habitaciones /></PrivateRoute>} />
        <Route path="/reservas" element={<PrivateRoute><Reservas /></PrivateRoute>} />
        <Route path="/reservantes" element={<PrivateRoute><Reservantes /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
