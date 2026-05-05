import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import api from '../services/api'

export default function Dashboard() {
  const [stats, setStats] = useState({ hoteles: 0, reservas: 0, reservantes: 0 })
  const usuario = localStorage.getItem('usuario')
  const rol = localStorage.getItem('rol')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [h, r, rs] = await Promise.all([
          api.get('/hoteles'),
          api.get('/reservas'),
          api.get('/reservantes')
        ])
        setStats({
          hoteles: h.data.data.length,
          reservas: r.data.data.length,
          reservantes: rs.data.data.length
        })
      } catch (err) {
        console.error(err)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow p-8 mb-8 flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-blue-700 flex items-center justify-center text-4xl text-white">
            👤
          </div>
          <div>
            <h2 className="text-2xl font-bold text-blue-900">Bienvenido, {usuario}</h2>
            <span className={`text-sm px-3 py-1 rounded-full font-semibold ${
              rol === 'admin' ? 'bg-yellow-100 text-yellow-800' :
              rol === 'moderador' ? 'bg-green-100 text-green-800' :
              'bg-blue-100 text-blue-800'
            }`}>{rol}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-700 text-white rounded-2xl shadow p-6 text-center">
            <div className="text-5xl mb-2">🏨</div>
            <div className="text-4xl font-bold">{stats.hoteles}</div>
            <div className="text-blue-200 mt-1">Hoteles registrados</div>
          </div>
          <div className="bg-green-600 text-white rounded-2xl shadow p-6 text-center">
            <div className="text-5xl mb-2">📋</div>
            <div className="text-4xl font-bold">{stats.reservas}</div>
            <div className="text-green-200 mt-1">Reservas activas</div>
          </div>
          <div className="bg-purple-600 text-white rounded-2xl shadow p-6 text-center">
            <div className="text-5xl mb-2">👥</div>
            <div className="text-4xl font-bold">{stats.reservantes}</div>
            <div className="text-purple-200 mt-1">Reservantes</div>
          </div>
        </div>
      </div>
    </div>
  )
}
