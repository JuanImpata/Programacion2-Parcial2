import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import api from '../services/api'
import Swal from 'sweetalert2'

const initialForm = { tipo: '', cod_hotel: '' }

export default function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([])
  const [hoteles, setHoteles] = useState([])
  const [form, setForm] = useState(initialForm)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const rol = localStorage.getItem('rol')

  const fetchData = async () => {
    try {
      const [h, ht] = await Promise.all([api.get('/habitaciones'), api.get('/hoteles')])
      setHabitaciones(h.data.data)
      setHoteles(ht.data.data)
    } catch (err) {
      console.error('Error cargando habitaciones', err)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId) {
        await api.put(`/habitaciones/${editId}`, form)
        Swal.fire('✅ Actualizado', 'Habitación actualizada correctamente', 'success')
      } else {
        await api.post('/habitaciones', form)
        Swal.fire('✅ Creado', 'Habitación creada correctamente', 'success')
      }
      setForm(initialForm); setEditId(null); setShowForm(false); fetchData()
    } catch (err) {
      Swal.fire('❌ Error', 'No se pudo guardar la habitación', 'error')
    }
  }

  const handleEdit = (hab) => {
    setForm({ tipo: hab.tipo, cod_hotel: hab.cod_hotel })
    setEditId(hab.cod_habitacion)
    setShowForm(true)
  }

  const handleDelete = async (id, tipo) => {
    const result = await Swal.fire({
      title: '¿Eliminar habitación?',
      text: `¿Seguro que deseas eliminar la habitación "${tipo}"? Esta acción no se puede deshacer.`,
      icon: 'warning', showCancelButton: true,
      confirmButtonColor: '#d33', cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar'
    })
    if (result.isConfirmed) {
      try {
        await api.delete(`/habitaciones/${id}`)
        Swal.fire('✅ Eliminado', 'Habitación eliminada correctamente', 'success')
        fetchData()
      } catch {
        Swal.fire('❌ Error', 'No se pudo eliminar la habitación', 'error')
      }
    }
  }

  const filtered = habitaciones.filter(h =>
    h.tipo?.toLowerCase().includes(search.toLowerCase()) ||
    h.hotel_nombre?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-900">🛏️ Gestión de Habitaciones</h1>
          {rol === 'admin' && (
            <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm(initialForm) }}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition">
              {showForm ? '✕ Cerrar' : '+ Nueva Habitación'}
            </button>
          )}
        </div>

        <input type="text" placeholder="🔍 Buscar habitación..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full mb-4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        {showForm && (
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="text-lg font-bold mb-4 text-blue-900">{editId ? '✏️ Editar Habitación' : '➕ Nueva Habitación'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <select className="border rounded-lg px-3 py-2 col-span-2" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} required>
                <option value="">Seleccionar tipo</option>
                <option value="Suite">Suite</option>
                <option value="Doble">Doble</option>
                <option value="Individual">Individual</option>
              </select>
              <select className="border rounded-lg px-3 py-2 col-span-2" value={form.cod_hotel} onChange={e => setForm({ ...form, cod_hotel: e.target.value })} required>
                <option value="">Seleccionar hotel</option>
                {hoteles.map(h => <option key={h.cod_hotel} value={h.cod_hotel}>{h.nombre}</option>)}
              </select>
              <div className="col-span-2 flex gap-3">
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-semibold">{editId ? 'Actualizar' : 'Crear'}</button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold">Cancelar</button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Tipo</th>
                <th className="px-4 py-3 text-left">Hotel</th>
                {rol === 'admin' && <th className="px-4 py-3 text-center">Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((h, i) => (
                <tr key={h.cod_habitacion} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3">{h.cod_habitacion}</td>
                  <td className="px-4 py-3 font-medium">{h.tipo}</td>
                  <td className="px-4 py-3">{h.hotel_nombre}</td>
                  {rol === 'admin' && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => handleEdit(h)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">✏️ Editar</button>
                        <button onClick={() => handleDelete(h.cod_habitacion, h.tipo)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">🗑️ Eliminar</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="4" className="text-center py-6 text-gray-400">No hay habitaciones registradas</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}