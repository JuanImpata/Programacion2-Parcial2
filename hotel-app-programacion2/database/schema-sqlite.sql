-- SQLite Schema for Hotel App
-- Converted from MySQL to SQLite

CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    imagen TEXT DEFAULT NULL,
    rol TEXT NOT NULL DEFAULT 'usuario' CHECK (rol IN ('admin','usuario','moderador')),
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categoria (
    cod_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo_IVA REAL NOT NULL,
    descripcion TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS hotel (
    cod_hotel INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    direccion TEXT NOT NULL,
    telefono TEXT NOT NULL,
    año_construccion INTEGER NOT NULL,
    cod_categoria INTEGER NOT NULL,
    FOREIGN KEY (cod_categoria) REFERENCES categoria(cod_categoria)
);

CREATE TABLE IF NOT EXISTS habitacion (
    cod_habitacion INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT NOT NULL,
    cod_hotel INTEGER NOT NULL,
    FOREIGN KEY (cod_hotel) REFERENCES hotel(cod_hotel)
);

CREATE TABLE IF NOT EXISTS reservante (
    cod_reservante INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    direccion TEXT NOT NULL,
    telefono TEXT NOT NULL,
    tipo TEXT NOT NULL CHECK (tipo IN ('particular','agencia')),
    nombre_beneficiario TEXT DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS reserva (
    cod_reserva INTEGER PRIMARY KEY AUTOINCREMENT,
    precio REAL NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    cod_reservante INTEGER NOT NULL,
    cod_habitacion INTEGER NOT NULL,
    FOREIGN KEY (cod_reservante) REFERENCES reservante(cod_reservante),
    FOREIGN KEY (cod_habitacion) REFERENCES habitacion(cod_habitacion)
);