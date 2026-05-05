import { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [usuario, setUsuario] = useState(null)
  const [rol, setRol] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedUsuario = localStorage.getItem('usuario')
    const storedRol = localStorage.getItem('rol')
    if (storedToken) {
      setToken(storedToken)
      setUsuario(storedUsuario)
      setRol(storedRol)
    }
  }, [])

  const login = ({ token, usuario, rol }) => {
    localStorage.setItem('token', token)
    localStorage.setItem('usuario', usuario)
    localStorage.setItem('rol', rol)
    setToken(token)
    setUsuario(usuario)
    setRol(rol)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    localStorage.removeItem('rol')
    setToken(null)
    setUsuario(null)
    setRol(null)
  }

  return (
    <AuthContext.Provider value={{ token, usuario, rol, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
