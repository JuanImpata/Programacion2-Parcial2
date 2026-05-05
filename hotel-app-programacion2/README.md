# 🏨 Hotel App - Programación II
**Universidad Libre Seccional Pereira - Facultad de Ingeniería**

## 📋 Descripción General
Aplicación web Full Stack para la gestión integral de una cadena de hoteles. El sistema permite administrar hoteles, categorías, habitaciones, reservantes y reservas con control de acceso basado en roles (RBAC), autenticación segura con JWT y bcrypt, y una interfaz moderna con React + Vite.

**Stack Tecnológico:**
- **Frontend:** React 18 + Vite + TailwindCSS + Axios
- **Backend:** Node.js + Express + bcrypt + JWT
- **Base de Datos:** MySQL v8+ con mysql2
- **Autenticación:** JWT con expiración de 8 horas
- **Validación:** SweetAlert2 para confirmaciones

---

## 📋 Requisitos Previos
- Node.js v18 o superior (LTS recomendado)
- MySQL v8 o superior
- npm v9 o superior
- Git

---

## 🚀 Guía Rápida de Instalación

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tuusuario/hotel-app-programacion2.git
cd hotel-app-programacion2
```

### 2️⃣ Configurar la base de datos
```bash
# Crear base de datos y tablas
mysql -u root -p < database/schema.sql

# Insertar datos de prueba
mysql -u root -p hotel_app_db < database/seeds.sql
```

### 3️⃣ Configurar el backend
```bash
cd backend
npm install
cp .env.example .env

# Editar .env con tus credenciales:
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=tu_contraseña
# DB_NAME=hotel_app_db
# JWT_SECRET=tu_secret_key_super_segura
# PORT=3001

npm run dev
```

### 4️⃣ Configurar el frontend
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🌐 URLs de Acceso

| Componente | URL |
|-----------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3001/api |
| Base de Datos | localhost:3306 |

---

## 👥 Usuarios de Prueba

Todos los usuarios usan la contraseña: **`Admin123$`**

| Usuario | Contraseña | Rol | Permisos |
|---------|-----------|-----|----------|
| admin | Admin123$ | admin | Acceso total a todas las operaciones |
| usuario1 | Admin123$ | usuario | Solo lectura |
| moderador1 | Admin123$ | moderador | Puede editar/eliminar reservas y reservantes |
| usuario2 | Admin123$ | usuario | Solo lectura |
| usuario3 | Admin123$ | usuario | Solo lectura |

---

## 📚 Documentación

Consulta los siguientes documentos en la carpeta `docs/`:

- **[ARQUITECTURA.md](docs/ARQUITECTURA.md)** - Arquitectura del sistema de tres capas
- **[MODELO_ER.md](docs/MODELO_ER.md)** - Diagrama y descripción del modelo Entidad-Relación
- **[API_ENDPOINTS.md](docs/API_ENDPOINTS.md)** - Lista completa de endpoints REST con ejemplos

---

## 🏗️ Estructura del Proyecto

```
hotel-app-programacion2/
├── frontend/                 # Aplicación React
│   ├── src/
│   │   ├── pages/           # Páginas principales (Login, Dashboard, etc.)
│   │   ├── components/      # Componentes reutilizables (Navbar)
│   │   ├── hooks/           # Custom hooks (useAuth)
│   │   ├── context/         # Context API (AuthContext)
│   │   ├── services/        # Servicios HTTP (api.js)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                 # Variables de entorno frontend
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── backend/                  # Servidor Express
│   ├── controllers/         # Lógica de negocio
│   ├── routes/              # Definición de endpoints
│   ├── middleware/          # Autenticación y control de roles
│   ├── config/              # Configuración de BD
│   ├── server.js
│   ├── .env.example         # Plantilla de variables de entorno
│   ├── package.json
│   └── node_modules/
├── database/                 # Scripts SQL
│   ├── schema.sql           # Definición de tablas
│   └── seeds.sql            # Datos de prueba
├── docs/                     # Documentación
│   ├── ARQUITECTURA.md
│   ├── MODELO_ER.md
│   └── API_ENDPOINTS.md
└── README.md
```

---

## ✨ Características Principales

### Autenticación y Seguridad
- ✅ Login seguro con bcrypt (mínimo 10 rounds)
- ✅ JWT con expiración de 8 horas
- ✅ Control de acceso basado en roles (RBAC)
- ✅ Token guardado en localStorage del cliente
- ✅ Variables de entorno para credenciales sensibles

### Dashboard
- ✅ Información del usuario conectado y rol
- ✅ Tarjetas de resumen con estadísticas (hoteles, reservas, reservantes)
- ✅ Menú de navegación según permisos
- ✅ Botón de cierre de sesión

### CRUD del Dominio
- ✅ Gestión completa de Hoteles (Create, Read, Update, Delete)
- ✅ Gestión completa de Categorías
- ✅ Gestión completa de Habitaciones
- ✅ Gestión completa de Reservantes
- ✅ Gestión completa de Reservas
- ✅ Validación en frontend y backend

### Confirmaciones y Alertas
- ✅ SweetAlert2 para confirmaciones de eliminación
- ✅ Mensajes de éxito/error en operaciones
- ✅ Prevención de acciones destructivas sin confirmación

### Control de Roles
- ✅ Frontend: Botones y opciones ocultos según rol
- ✅ Backend: Middleware validando permisos en cada ruta
- ✅ Tres niveles: admin, moderador, usuario

---

## 🔌 Tecnologías Utilizadas

### Frontend
- React 18 - Biblioteca de interfaz de usuario
- Vite 5 - Bundler moderno y rápido
- TailwindCSS 3 - Framework de estilos
- Axios 1 - Cliente HTTP
- React Router 6 - Enrutamiento
- SweetAlert2 11 - Alertas personalizadas

### Backend
- Node.js 18+ - Runtime de JavaScript
- Express 4 - Framework web
- bcrypt 5 - Hashing de contraseñas
- JWT 9 - JSON Web Tokens
- mysql2 3 - Driver de MySQL
- dotenv 16 - Manejo de variables de entorno

### Base de Datos
- MySQL 8+ - Sistema relacional
- 6 tablas normalizadas en 3NF

---

## 📝 Estándares de Código

- Componentes React funcionales con hooks
- Uso de async/await para operaciones asincrónicas
- Manejo de errores con try/catch
- Respuestas JSON estructuradas: `{ success, data, message }`
- Nombres descriptivos para variables y funciones
- Comentarios en secciones no obvias
- Control de versiones con Git

---

## 🚧 Próximas Mejoras

- [ ] Validación de fechas de disponibilidad de habitaciones
- [ ] Exportación de reportes en PDF
- [ ] Notificaciones por email
- [ ] Paginación en listados
- [ ] Búsqueda y filtros avanzados
- [ ] Tests automatizados
- [ ] Documentación de API con Swagger

---

## 📞 Contacto y Soporte

Para consultas o reporte de issues, contacta al equipo de desarrollo.

---

## 📄 Licencia

Este proyecto es parte de la evaluación del curso de Programación II en la Universidad Libre Seccional Pereira.
