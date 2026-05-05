# Arquitectura del Sistema - Hotel App

## 1. Descripción General

Hotel App es una aplicación web completa de tipo cliente/servidor con una separación clara de responsabilidades en tres capas: presentación, lógica de negocio y persistencia. Esta arquitectura es el estándar moderno para aplicaciones web empresariales.

## 2. Arquitectura de Tres Capas

```
┌─────────────────────────────────────────────────────────────┐
│                   CAPA DE PRESENTACIÓN                       │
│         (Frontend: React + Vite + TailwindCSS)              │
│                  http://localhost:5173                       │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/JSON (Axios)
                       │
┌──────────────────────▼──────────────────────────────────────┐
│               CAPA DE LÓGICA DE NEGOCIO                      │
│            (Backend: Node.js + Express)                      │
│                 http://localhost:3001                        │
│        ├─ Validación de datos                               │
│        ├─ Autenticación JWT + bcrypt                        │
│        ├─ Control de acceso (RBAC)                          │
│        └─ Operaciones CRUD                                  │
└──────────────────────┬──────────────────────────────────────┘
                       │ SQL (mysql2)
                       │
┌──────────────────────▼──────────────────────────────────────┐
│               CAPA DE PERSISTENCIA                           │
│                  (MySQL v8+)                                │
│           localhost:3306 / hotel_app_db                     │
└─────────────────────────────────────────────────────────────┘
```

## 3. Componentes

### Frontend (React + Vite + TailwindCSS)
- **Responsabilidad**: Interfaz de usuario reactiva
- **Estructura**:
  - `src/pages/` - Páginas (Login, Dashboard, Hoteles, Reservas, Reservantes)
  - `src/components/` - Componentes reutilizables (Navbar)
  - `src/hooks/` - Custom hooks (useAuth)
  - `src/context/` - Context API (AuthContext)
  - `src/services/` - Servicios HTTP (api.js con Axios)
- **Flujo**: Usuario → Interfaz → petición HTTP → Backend

### Backend (Node.js + Express)
- **Responsabilidad**: Lógica de negocio y gestión de datos
- **Estructura**:
  - `routes/` - Definición de endpoints API
  - `controllers/` - Lógica de negocio por entidad
  - `middleware/` - Validación de token, control de roles
  - `config/db.js` - Conexión a MySQL
- **Patrones**:
  - REST API con verbos HTTP: GET, POST, PUT, DELETE
  - Middleware de autenticación en todas las rutas
  - Control de acceso basado en roles (RBAC)

### Base de Datos (MySQL)
- **Responsabilidad**: Almacenamiento persistente de datos
- **Entidades principales**:
  - `usuarios` - Credenciales y roles
  - `categoria` - Clasificación de hoteles
  - `hotel` - Información de hoteles
  - `habitacion` - Cuartos disponibles
  - `reservante` - Clientes (particulares/agencias)
  - `reserva` - Reservas de habitaciones

## 4. Flujo de Comunicación

### Ejemplo: Login de Usuario
1. Usuario ingresa credenciales en `Login.jsx`
2. React envía POST a `/api/auth/login` con Axios
3. Express recibe, busca usuario en MySQL
4. Valida con bcrypt, genera JWT
5. Responde con token + usuario + rol
6. Frontend guarda en localStorage
7. Redirecciona a Dashboard
8. Cada petición posterior incluye `Authorization: Bearer <token>`

### Ejemplo: Crear Hotel
1. Admin completa formulario en `Hoteles.jsx`
2. Axios interceptor añade Authorization header
3. Backend `verifyToken` valida JWT
4. Backend `checkRole('admin')` verifica permiso
5. `hotelController.create()` valida datos
6. Ejecuta INSERT en MySQL
7. SweetAlert2 confirma éxito
8. Frontend recarga lista

## 5. Seguridad

- **Autenticación**: JWT con expiración de 8 horas
- **Contraseñas**: Hasheadas con bcrypt (mínimo 10 rounds)
- **Autorización**: Control de roles en middleware
  - `admin`: acceso total
  - `moderador`: editar/eliminar reservas y reservantes
  - `usuario`: solo lectura
- **Intercepción**: Todas las rutas protegidas requieren token válido
- **Variables de entorno**: JWT_SECRET, DB_HOST, etc. en `.env`

## 6. Estándares de Respuesta

### Respuesta Exitosa
```json
{
  "success": true,
  "data": [...],
  "message": "Operación exitosa"
}
```

### Respuesta de Error
```json
{
  "success": false,
  "data": null,
  "message": "Error específico"
}
```

## 7. Tecnologías por Capa

| Componente | Tecnología | Versión |
|-----------|-----------|---------|
| **Frontend** | React | v18+ |
| | Vite | v5+ |
| | TailwindCSS | v3+ |
| | React Router | v6+ |
| | Axios | v1+ |
| | SweetAlert2 | v11+ |
| **Backend** | Node.js | v18+ |
| | Express | v4+ |
| | bcrypt | v5+ |
| | JWT | v9+ |
| | mysql2 | v3+ |
| **BD** | MySQL | v8+ |

## 8. Diagrama de Componentes

```
┌─────────────────────────┐
│   React Application     │
├─────────────────────────┤
│ ├─ App.jsx              │
│ ├─ pages/*              │
│ ├─ components/Navbar    │
│ ├─ hooks/useAuth        │
│ ├─ context/AuthContext  │
│ └─ services/api.js      │
└────────────┬────────────┘
             │ HTTP
┌────────────▼────────────┐
│   Express Server        │
├─────────────────────────┤
│ ├─ server.js            │
│ ├─ routes/*             │
│ ├─ controllers/*         │
│ ├─ middleware/*          │
│ └─ config/db.js         │
└────────────┬────────────┘
             │ SQL
┌────────────▼────────────┐
│   MySQL Database        │
├─────────────────────────┤
│ ├─ usuarios             │
│ ├─ categoria            │
│ ├─ hotel                │
│ ├─ habitacion           │
│ ├─ reservante           │
│ └─ reserva              │
└─────────────────────────┘
```
