import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import api from '../services/api'
import Swal from 'sweetalert2'

const initialForm = { precio: '', fecha_inicio: '', fecha_fin: '', cod_reservante: '', cod_habitacion: '' }

export default function Reservas() {
  const [reservas, setReservas] = useState([])
  const [reservantes, setReservantes] = useState([])
  const [habitaciones, setHabitaciones] = useState([])
  const [form, setForm] = useState(initialForm)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const rol = localStorage.getItem('rol')

  const fetchData = async () => {
    try {
      const [resReservas, resReservantes, resHabitaciones] = await Promise.all([
        api.get('/reservas'),
        api.get('/reservantes'),
        api.get('/habitaciones')
      ])
      setReservas(resReservas.data.data)
      setReservantes(resReservantes.data.data)
      setHabitaciones(resHabitaciones.data.data)
    } catch (err) {
      console.error('Error cargando reservas, reservantes o habitaciones', err)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId) {
        await api.put(`/reservas/${editId}`, form)
        Swal.fire('Actualizado', 'Reserva actualizada correctamente', 'success')
      } else {
        await api.post('/reservas', form)
        Swal.fire('Creado', 'Reserva creada correctamente', 'success')
      }
      setForm(initialForm); setEditId(null); setShowForm(false); fetchData()
    } catch (err) {
      Swal.fire('Error', 'No se pudo guardar la reserva', 'error')
    }
  }

  const handleEdit = (r) => {
    setForm({
      precio: r.precio, fecha_inicio: r.fecha_inicio?.split('T')[0],
      fecha_fin: r.fecha_fin?.split('T')[0],
      cod_reservante: r.cod_reservante, cod_habitacion: r.cod_habitacion
    })
    setEditId(r.cod_reserva); setShowForm(true)
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Eliminar reserva?', text: '¿Seguro que deseas eliminar esta reserva?',
      icon: 'warning', showCancelButton: true,
      confirmButtonColor: '#d33', cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar'
    })
    if (result.isConfirmed) {
      try {
        await api.delete(`/reservas/${id}`)
        Swal.fire('Eliminado', 'Reserva eliminada', 'success'); fetchData()
      } catch { Swal.fire('Error', 'No se pudo eliminar', 'error') }
    }
  }

  const filtered = reservas.filter(r =>
    r.reservante_nombre?.toLowerCase().includes(search.toLowerCase()) ||
    r.hotel_nombre?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-900">📋 Gestión de Reservas</h1>
          <button onClick={() => { setShowForm(true); setEditId(null); setForm(initialForm) }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition">
            + Nueva Reserva
          </button>
        </div>

        <input type="text" placeholder="Buscar reserva..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full mb-4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500" />

        {showForm && (
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="text-lg font-bold mb-4 text-green-700">{editId ? 'Editar Reserva' : 'Nueva Reserva'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input className="border rounded-lg px-3 py-2" placeholder="Precio" type="number" step="0.01" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} required />
              <input className="border rounded-lg px-3 py-2" type="date" placeholder="Fecha inicio" value={form.fecha_inicio} onChange={e => setForm({ ...form, fecha_inicio: e.target.value })} required />
              <input className="border rounded-lg px-3 py-2" type="date" placeholder="Fecha fin" value={form.fecha_fin} onChange={e => setForm({ ...form, fecha_fin: e.target.value })} required />
              <select className="border rounded-lg px-3 py-2" value={form.cod_reservante} onChange={e => setForm({ ...form, cod_reservante: e.target.value })} required>
                <option value="">Seleccionar reservante</option>
                {reservantes.map(r => (
                  <option key={r.cod_reservante} value={r.cod_reservante}>{r.nombre}</option>
                ))}
              </select>
              <select className="border rounded-lg px-3 py-2" value={form.cod_habitacion} onChange={e => setForm({ ...form, cod_habitacion: e.target.value })} required>
                <option value="">Seleccionar habitación</option>
                {habitaciones.map(h => (
                  <option key={h.cod_habitacion} value={h.cod_habitacion}>{`${h.hotel_nombre} - ${h.tipo}`}</option>
                ))}
              </select>
              <div className="col-span-2 flex gap-3">
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold">{editId ? 'Actualizar' : 'Crear'}</button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold">Cancelar</button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Reservante</th>
                <th className="px-4 py-3 text-left">Hotel</th>
                <th className="px-4 py-3 text-left">Habitación</th>
                <th className="px-4 py-3 text-left">Precio</th>
                <th className="px-4 py-3 text-left">Inicio</th>
                <th className="px-4 py-3 text-left">Fin</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.cod_reserva} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3">{r.cod_reserva}</td>
                  <td className="px-4 py-3">{r.reservante_nombre}</td>
                  <td className="px-4 py-3">{r.hotel_nombre}</td>
                  <td className="px-4 py-3">{r.habitacion_tipo}</td>
                  <td className="px-4 py-3">${Number(r.precio).toLocaleString()}</td>
                  <td className="px-4 py-3">{r.fecha_inicio?.split('T')[0]}</td>
                  <td className="px-4 py-3">{r.fecha_fin?.split('T')[0]}</td>
                  <td className="px-4 py-3 flex gap-2 justify-center">
                    {(rol === 'admin' || rol === 'moderador') && (
                      <button onClick={() => handleEdit(r)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">Editar</button>
                    )}
                    {rol === 'admin' && (
                      <button onClick={() => handleDelete(r.cod_reserva)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">Eliminar</button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="8" className="text-center py-6 text-gray-400">No hay reservas</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
