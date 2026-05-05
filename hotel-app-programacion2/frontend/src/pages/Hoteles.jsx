import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import api from '../services/api'
import Swal from 'sweetalert2'

const initialForm = { nombre: '', direccion: '', telefono: '', anio_construccion: '', cod_categoria: '' }

export default function Hoteles() {
  const [hoteles, setHoteles] = useState([])
  const [categorias, setCategorias] = useState([])
  const [form, setForm] = useState(initialForm)
  const [editId, setEditId] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState('')
  const rol = localStorage.getItem('rol')

  const fetchData = async () => {
    try {
      const [h, c] = await Promise.all([api.get('/hoteles'), api.get('/categorias')])
      setHoteles(h.data.data)
      setCategorias(c.data.data)
    } catch (err) {
      console.error('Error cargando hoteles o categorías', err)
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editId) {
        await api.put(`/hoteles/${editId}`, form)
        Swal.fire('✅ Actualizado', 'Hotel actualizado correctamente', 'success')
      } else {
        await api.post('/hoteles', form)
        Swal.fire('✅ Creado', 'Hotel creado correctamente', 'success')
      }
      setForm(initialForm); setEditId(null); setShowForm(false); fetchData()
    } catch (err) {
      Swal.fire('❌ Error', 'No se pudo guardar el hotel', 'error')
    }
  }

  const handleEdit = (hotel) => {
    setForm({
      nombre: hotel.nombre,
      direccion: hotel.direccion,
      telefono: hotel.telefono,
      anio_construccion: hotel.anio_construccion,
      cod_categoria: hotel.cod_categoria
    })
    setEditId(hotel.cod_hotel)
    setShowForm(true)
  }

  const handleDelete = async (id, nombre) => {
    const result = await Swal.fire({
      title: '¿Eliminar hotel?',
      text: `¿Seguro que deseas eliminar "${nombre}"? Esta acción no se puede deshacer.`,
      icon: 'warning', showCancelButton: true,
      confirmButtonColor: '#d33', cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar'
    })
    if (result.isConfirmed) {
      try {
        await api.delete(`/hoteles/${id}`)
        Swal.fire('✅ Eliminado', 'Hotel eliminado correctamente', 'success')
        fetchData()
      } catch {
        Swal.fire('❌ Error', 'No se pudo eliminar el hotel', 'error')
      }
    }
  }

  const filtered = hoteles.filter(h =>
    h.nombre?.toLowerCase().includes(search.toLowerCase()) ||
    h.direccion?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-900">🏨 Gestión de Hoteles</h1>
          {rol === 'admin' && (
            <button onClick={() => { setShowForm(!showForm); setEditId(null); setForm(initialForm) }}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition">
              {showForm ? '✕ Cerrar' : '+ Nuevo Hotel'}
            </button>
          )}
        </div>

        <input type="text" placeholder="🔍 Buscar hotel..." value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full mb-4 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />

        {showForm && (
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="text-lg font-bold mb-4 text-blue-900">{editId ? '✏️ Editar Hotel' : '➕ Nuevo Hotel'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input className="border rounded-lg px-3 py-2 col-span-2" placeholder="Nombre del hotel" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
              <input className="border rounded-lg px-3 py-2 col-span-2" placeholder="Dirección" value={form.direccion} onChange={e => setForm({ ...form, direccion: e.target.value })} required />
              <input className="border rounded-lg px-3 py-2" placeholder="Teléfono" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} required />
              <input className="border rounded-lg px-3 py-2" placeholder="Año de construcción" type="number" value={form.anio_construccion} onChange={e => setForm({ ...form, anio_construccion: e.target.value })} required />
              <select className="border rounded-lg px-3 py-2 col-span-2" value={form.cod_categoria} onChange={e => setForm({ ...form, cod_categoria: e.target.value })} required>
                <option value="">Seleccionar categoría</option>
                {categorias.map(c => <option key={c.cod_categoria} value={c.cod_categoria}>{c.descripcion}</option>)}
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
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Dirección</th>
                <th className="px-4 py-3 text-left">Teléfono</th>
                <th className="px-4 py-3 text-left">Año</th>
                <th className="px-4 py-3 text-left">Categoría</th>
                {rol === 'admin' && <th className="px-4 py-3 text-center">Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((h, i) => (
                <tr key={h.cod_hotel} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3">{h.cod_hotel}</td>
                  <td className="px-4 py-3 font-medium">{h.nombre}</td>
                  <td className="px-4 py-3">{h.direccion}</td>
                  <td className="px-4 py-3">{h.telefono}</td>
                  <td className="px-4 py-3">{h.anio_construccion}</td>
                  <td className="px-4 py-3">{h.categoria_nombre}</td>
                  {rol === 'admin' && (
                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => handleEdit(h)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs font-semibold">✏️ Editar</button>
                        <button onClick={() => handleDelete(h.cod_hotel, h.nombre)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs font-semibold">🗑️ Eliminar</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="7" className="text-center py-6 text-gray-400">No hay hoteles registrados</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}