# Modelo Entidad-Relación - Hotel App

## Diagrama ER Textual

```
┌──────────────┐
│   USUARIOS   │
├──────────────┤
│ id (PK)      │
│ usuario      │ UNIQUE
│ password     │ HASH bcrypt
│ rol          │ ENUM: admin, usuario, moderador
│ creado_en    │ TIMESTAMP
└──────────────┘

┌──────────────────┐
│   CATEGORÍA      │
├──────────────────┤
│ cod_categoria(PK)│
│ tipo_IVA         │ DECIMAL(5,2)
│ descripcion      │ VARCHAR(100)
└──────────────────┘
         │
         │ 1:N pertenece_a
         │
┌────────▼─────────────────┐
│       HOTEL              │
├──────────────────────────┤
│ cod_hotel (PK)           │
│ nombre                   │
│ direccion                │
│ telefono                 │
│ año_construccion         │
│ cod_categoria (FK)  ────────┐
└────────┬────────────────┘    │
         │                     │
         │ 1:N aloja           │
         │                     │
┌────────▼──────────────────┐  │
│      HABITACIÓN           │  │
├───────────────────────────┤  │
│ cod_habitacion (PK)       │  │
│ tipo (Suite,Doble,etc)    │  │
│ cod_hotel (FK)  ──────────┼──┘
└────────┬──────────────────┘
         │
         │ N:1 ocupa
         │
         │
┌────────▼──────────────────┐
│      RESERVA              │
├───────────────────────────┤
│ cod_reserva (PK)          │
│ precio                    │
│ fecha_inicio              │
│ fecha_fin                 │
│ cod_reservante (FK)  ─────────┐
│ cod_habitacion (FK)  ──────┐   │
└───────────────────────────┘   │
         ▲                       │
         │ N:1 realiza           │
         │                       │
┌────────┴─────────────────┐     │
│    RESERVANTE            │     │
├──────────────────────────┤     │
│ cod_reservante (PK) ◄────────┐
│ nombre                   │    │
│ direccion                │    │
│ telefono                 │    │
│ tipo (particular/agencia)│    │
│ nombre_beneficiario      │    │
└──────────────────────────┘    │
```

## Descripción de Entidades

### USUARIOS
| Campo | Tipo | Restricción | Descripción |
|-------|------|-------------|-------------|
| id | INT | PK, AUTO_INCREMENT | Identificador único |
| usuario | VARCHAR(50) | UNIQUE, NOT NULL | Nombre de usuario para login |
| password | VARCHAR(255) | NOT NULL | Hash bcrypt de contraseña |
| imagen | VARCHAR(255) | DEFAULT NULL | URL de foto de perfil |
| rol | ENUM | NOT NULL | admin, usuario, moderador |
| creado_en | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Fecha de creación |

### CATEGORÍA
| Campo | Tipo | Restricción | Descripción |
|-------|------|-------------|-------------|
| cod_categoria | INT | PK, AUTO_INCREMENT | Identificador de categoría |
| tipo_IVA | DECIMAL(5,2) | NOT NULL | Porcentaje de IVA aplicable |
| descripcion | VARCHAR(100) | NOT NULL | Descripción (ej: Cinco estrellas) |

### HOTEL
| Campo | Tipo | Restricción | Descripción |
|-------|------|-------------|-------------|
| cod_hotel | INT | PK, AUTO_INCREMENT | Identificador del hotel |
| nombre | VARCHAR(100) | NOT NULL | Nombre del hotel |
| direccion | VARCHAR(150) | NOT NULL | Dirección física |
| telefono | VARCHAR(20) | NOT NULL | Teléfono de contacto |
| año_construccion | INT | NOT NULL | Año en que fue construido |
| cod_categoria | INT | FK, NOT NULL | Referencia a CATEGORÍA |

### HABITACIÓN
| Campo | Tipo | Restricción | Descripción |
|-------|------|-------------|-------------|
| cod_habitacion | INT | PK, AUTO_INCREMENT | Identificador de habitación |
| tipo | VARCHAR(50) | NOT NULL | Tipo (Suite, Doble, Individual) |
| cod_hotel | INT | FK, NOT NULL | Referencia a HOTEL |

### RESERVANTE
| Campo | Tipo | Restricción | Descripción |
|-------|------|-------------|-------------|
| cod_reservante | INT | PK, AUTO_INCREMENT | Identificador del reservante |
| nombre | VARCHAR(100) | NOT NULL | Nombre completo |
| direccion | VARCHAR(150) | NOT NULL | Dirección |
| telefono | VARCHAR(20) | NOT NULL | Teléfono |
| tipo | ENUM | NOT NULL | particular o agencia |
| nombre_beneficiario | VARCHAR(100) | DEFAULT NULL | Nombre de la agencia/contacto |

### RESERVA
| Campo | Tipo | Restricción | Descripción |
|-------|------|-------------|-------------|
| cod_reserva | INT | PK, AUTO_INCREMENT | Identificador de reserva |
| precio | DECIMAL(10,2) | NOT NULL | Precio total |
| fecha_inicio | DATE | NOT NULL | Fecha de entrada |
| fecha_fin | DATE | NOT NULL | Fecha de salida |
| cod_reservante | INT | FK, NOT NULL | Referencia a RESERVANTE |
| cod_habitacion | INT | FK, NOT NULL | Referencia a HABITACIÓN |

## Relaciones

| Relación | Tipo | Descripción |
|----------|------|-------------|
| HOTEL → CATEGORÍA | N:1 | Cada hotel pertenece a una categoría |
| HOTEL ← HABITACIÓN | 1:N | Un hotel tiene múltiples habitaciones |
| RESERVANTE ← RESERVA | 1:N | Un reservante puede hacer múltiples reservas |
| HABITACIÓN ← RESERVA | 1:N | Una habitación puede tener múltiples reservas (en diferentes fechas) |

## Cardinalidad

- 1 Categoría → N Hoteles
- 1 Hotel → N Habitaciones
- 1 Reservante → N Reservas
- 1 Habitación → N Reservas (temporal, diferentes períodos)

## Integridad Referencial

Todas las claves foráneas tienen restricción de integridad referencial:
- ON DELETE RESTRICT (no permite eliminar si hay registros relacionados)
- ON UPDATE RESTRICT (no permite actualizar si hay registros relacionados)

## Normalización

El modelo está normalizado en 3NF (Tercera Forma Normal):
- ✅ 1NF: Todos los atributos son atómicos
- ✅ 2NF: No hay dependencias parciales de la clave primaria
- ✅ 3NF: No hay dependencias transitivas entre atributos
