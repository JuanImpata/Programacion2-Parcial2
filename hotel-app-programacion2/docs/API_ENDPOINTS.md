# API Endpoints - Hotel App

## Base URL
```
http://localhost:3001/api
```

## Autenticación
Todas las rutas excepto `/auth/login` y `/auth/register` requieren:
```
Headers: {
  "Authorization": "Bearer <token_jwt>"
}
```

---

## 1. Autenticación

### POST /auth/register
Registra un nuevo usuario.

**Request:**
```json
{
  "usuario": "newuser",
  "password": "SecurePass123!",
  "rol": "usuario"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Usuario registrado correctamente"
}
```

**Response (500):**
```json
{
  "success": false,
  "message": "Error al registrar usuario"
}
```

---

### POST /auth/login
Inicia sesión y obtiene JWT.

**Request:**
```json
{
  "usuario": "admin",
  "password": "Admin123$"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": "admin",
  "rol": "admin",
  "imagen": null
}
```

**Response (401):**
```json
{
  "success": false,
  "message": "Usuario o contraseña incorrectos"
}
```

---

## 2. Hoteles

### GET /hoteles
Lista todos los hoteles.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "cod_hotel": 1,
      "nombre": "Hotel Pereira Plaza",
      "direccion": "Cra 7 # 19-20, Pereira",
      "telefono": "3101234567",
      "año_construccion": 1995,
      "cod_categoria": 3,
      "categoria": "Tres estrellas"
    }
  ]
}
```

---

### GET /hoteles/:id
Obtiene un hotel específico.

**Response (200):**
```json
{
  "success": true,
  "data": { "cod_hotel": 1, "nombre": "..." }
}
```

---

### POST /hoteles
Crea un nuevo hotel (solo admin).

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "nombre": "Hotel Nuevo",
  "direccion": "Cra 10 # 25-30",
  "telefono": "3107654321",
  "año_construccion": 2023,
  "cod_categoria": 4
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Hotel creado correctamente",
  "id": 6
}
```

---

### PUT /hoteles/:id
Actualiza un hotel (solo admin).

**Request:**
```json
{
  "nombre": "Hotel Actualizado",
  "direccion": "Cra 10 # 25-30",
  "telefono": "3107654321",
  "año_construccion": 2023,
  "cod_categoria": 4
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Hotel actualizado correctamente"
}
```

---

### DELETE /hoteles/:id
Elimina un hotel (solo admin).

**Response (200):**
```json
{
  "success": true,
  "message": "Hotel eliminado correctamente"
}
```

---

## 3. Categorías

### GET /categorias
Lista todas las categorías.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "cod_categoria": 1,
      "tipo_IVA": 19.00,
      "descripcion": "Una estrella"
    }
  ]
}
```

---

### POST /categorias
Crea una nueva categoría (solo admin).

**Request:**
```json
{
  "tipo_IVA": 19.00,
  "descripcion": "Nueva categoría"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Categoría creada correctamente",
  "id": 6
}
```

---

## 4. Habitaciones

### GET /habitaciones
Lista todas las habitaciones.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "cod_habitacion": 1,
      "tipo": "Suite",
      "cod_hotel": 1,
      "hotel_nombre": "Hotel Pereira Plaza"
    }
  ]
}
```

---

### POST /habitaciones
Crea una nueva habitación (solo admin).

**Request:**
```json
{
  "tipo": "Suite",
  "cod_hotel": 1
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Habitación creada correctamente",
  "id": 11
}
```

---

## 5. Reservantes

### GET /reservantes
Lista todos los reservantes.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "cod_reservante": 1,
      "nombre": "Juan Pérez",
      "direccion": "Calle 5 # 10-20",
      "telefono": "3101111111",
      "tipo": "particular",
      "nombre_beneficiario": null
    }
  ]
}
```

---

### POST /reservantes
Crea un nuevo reservante.

**Request:**
```json
{
  "nombre": "Nuevo Cliente",
  "direccion": "Calle 1 # 1-1",
  "telefono": "3109999999",
  "tipo": "particular",
  "nombre_beneficiario": null
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Reservante creado correctamente",
  "id": 6
}
```

---

### PUT /reservantes/:id
Actualiza un reservante (admin/moderador).

**Response (200):**
```json
{
  "success": true,
  "message": "Reservante actualizado correctamente"
}
```

---

### DELETE /reservantes/:id
Elimina un reservante (solo admin).

**Response (200):**
```json
{
  "success": true,
  "message": "Reservante eliminado correctamente"
}
```

---

## 6. Reservas

### GET /reservas
Lista todas las reservas.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "cod_reserva": 1,
      "precio": 250000.00,
      "fecha_inicio": "2026-05-01",
      "fecha_fin": "2026-05-05",
      "reservante_nombre": "Juan Pérez",
      "hotel_nombre": "Hotel Pereira Plaza",
      "habitacion_tipo": "Suite",
      "cod_reservante": 1,
      "cod_habitacion": 1
    }
  ]
}
```

---

### POST /reservas
Crea una nueva reserva.

**Request:**
```json
{
  "precio": 300000.00,
  "fecha_inicio": "2026-06-01",
  "fecha_fin": "2026-06-05",
  "cod_reservante": 1,
  "cod_habitacion": 1
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Reserva creada correctamente",
  "id": 6
}
```

---

### PUT /reservas/:id
Actualiza una reserva (admin/moderador).

**Response (200):**
```json
{
  "success": true,
  "message": "Reserva actualizada correctamente"
}
```

---

### DELETE /reservas/:id
Elimina una reserva (solo admin).

**Response (200):**
```json
{
  "success": true,
  "message": "Reserva eliminada correctamente"
}
```

---

## Códigos de Estado HTTP

| Código | Significado |
|--------|------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Solicitud inválida |
| 401 | Unauthorized - Token inválido/faltante |
| 403 | Forbidden - Acceso denegado (rol insuficiente) |
| 404 | Not Found - Recurso no encontrado |
| 500 | Server Error - Error del servidor |

---

## Restricciones por Rol

| Endpoint | GET | POST | PUT | DELETE |
|----------|-----|------|-----|--------|
| /hoteles | ✅ Todos | 🔒 Admin | 🔒 Admin | 🔒 Admin |
| /categorias | ✅ Todos | 🔒 Admin | 🔒 Admin | 🔒 Admin |
| /habitaciones | ✅ Todos | 🔒 Admin | 🔒 Admin | 🔒 Admin |
| /reservantes | ✅ Todos | ✅ Todos | 🔒 Admin/Moderador | 🔒 Admin |
| /reservas | ✅ Todos | ✅ Todos | 🔒 Admin/Moderador | 🔒 Admin |

🔒 = Requiere rol específico
✅ = Accesible a todos los usuarios autenticados
