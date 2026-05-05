import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function Navbar() {
  const navigate = useNavigate()
  const { usuario, rol, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-blue-900 text-white px-6 py-3 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-6">
        <span className="text-xl font-bold">🏨 Hotel App</span>
        <Link to="/" className="hover:text-blue-300 transition">Dashboard</Link>
        <Link to="/hoteles" className="hover:text-blue-300 transition">Hoteles</Link>
        <Link to="/habitaciones" className="hover:text-blue-300 transition">Habitaciones</Link>
        <Link to="/reservas" className="hover:text-blue-300 transition">Reservas</Link>
        <Link to="/reservantes" className="hover:text-blue-300 transition">Reservantes</Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm">👤 {usuario}</span>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
          rol === 'admin' ? 'bg-yellow-400 text-yellow-900' :
          rol === 'moderador' ? 'bg-green-400 text-green-900' :
          'bg-blue-400 text-blue-900'
        }`}>{rol}</span>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg transition"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}
