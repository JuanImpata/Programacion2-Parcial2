import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import api from '../services/api'
import Swal from 'sweetalert2'

const initialForm = { nombre: '', direccion: '', telefono: '', tipo: 'particular', nombre_beneficiario: '' }

export default function Reservantes() {
  const [reservantes, setReservantes] = useState([])
  const [form, setForm] = useState(initialForm)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const rol = localStorage.getItem('rol')

  const fetchData = async () => {
    const res = await api.get('/reservantes')
    setReservantes(res.data.data)
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId) {
        await api.put(`/reservantes/${editId}`, form)
        Swal.fire('Actualizado', 'Reservante actualizado correctamente', 'success')
      } else {
        await api.post('/reservantes', form)
        Swal.fire('Creado', 'Reservante creado correctamente', 'success')
      }
      setForm(initialForm); setEditId(null); setShowForm(false); fetchData()
    } catch (err) {
      Swal.fire('Error', 'No se pudo guardar el reservante', 'error')
    }
  }

  const handleEdit = (r) => {
    setForm({ nombre: r.nombre, direccion: r.direccion, telefono: r.telefono, tipo: r.tipo, nombre_beneficiario: r.nombre_beneficiario || '' })
    setEditId(r.cod_reservante); setShowForm(true)
  }

  const handleDelete = async (id, nombre) => {
    const result = await Swal.fire({
      title: '¿Eliminar reservante?', text: `¿Seguro que deseas eliminar a "${nombre}"?`,
      icon: 'warning', showCancelButton: true,
      confirmButtonColor: '#d33', cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar'
    })
    if (result.isConfirmed) {
      try {
        await api.delete(`/reservantes/${id}`)
        Swal.fire('Eliminado', 'Reservante eliminado', 'success'); fetchData()
      } catch { Swal.fire('Error', 'No se pudo eliminar', 'error') }
    }
  }

  const filtered = reservantes.filter(r =>
    r.nombre.toLowerCase().includes(search.toLowerCase()) ||
    r.tipo.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-900">👥 Gestión de Reservantes</h1>
          <button onClick={() => { setShowForm(true); setEditId(null); setForm(initialForm) }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition">
            + Nuevo Reservante
          </button>
        </div>

        <input type="text" placeholder="Buscar reservante..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full mb-4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500" />

        {showForm && (
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="text-lg font-bold mb-4 text-purple-700">{editId ? 'Editar Reservante' : 'Nuevo Reservante'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input className="border rounded-lg px-3 py-2 col-span-2" placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
              <input className="border rounded-lg px-3 py-2 col-span-2" placeholder="Dirección" value={form.direccion} onChange={e => setForm({ ...form, direccion: e.target.value })} required />
              <input className="border rounded-lg px-3 py-2" placeholder="Teléfono" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} required />
              <select className="border rounded-lg px-3 py-2" value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
                <option value="particular">Particular</option>
                <option value="agencia">Agencia de viaje</option>
              </select>
              {form.tipo === 'agencia' && (
                <input className="border rounded-lg px-3 py-2 col-span-2" placeholder="Nombre beneficiario" value={form.nombre_beneficiario} onChange={e => setForm({ ...form, nombre_beneficiario: e.target.value })} />
              )}
              <div className="col-span-2 flex gap-3">
                <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold">{editId ? 'Actualizar' : 'Crear'}</button>
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold">Cancelar</button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Dirección</th>
                <th className="px-4 py-3 text-left">Teléfono</th>
                <th className="px-4 py-3 text-left">Tipo</th>
                <th className="px-4 py-3 text-left">Beneficiario</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={r.cod_reservante} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3">{r.cod_reservante}</td>
                  <td className="px-4 py-3 font-medium">{r.nombre}</td>
                  <td className="px-4 py-3">{r.direccion}</td>
                  <td className="px-4 py-3">{r.telefono}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${r.tipo === 'agencia' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {r.tipo}
                    </span>
                  </td>
                  <td className="px-4 py-3">{r.nombre_beneficiario || '-'}</td>
                  <td className="px-4 py-3 flex gap-2 justify-center">
                    {(rol === 'admin' || rol === 'moderador') && (
                      <button onClick={() => handleEdit(r)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">Editar</button>
                    )}
                    {rol === 'admin' && (
                      <button onClick={() => handleDelete(r.cod_reservante, r.nombre)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">Eliminar</button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="7" className="text-center py-6 text-gray-400">No hay reservantes</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
