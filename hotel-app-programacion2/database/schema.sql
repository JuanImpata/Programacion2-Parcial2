CREATE DATABASE IF NOT EXISTS hotel_app_db;
USE hotel_app_db;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    imagen VARCHAR(255) DEFAULT NULL,
    rol ENUM('admin','usuario','moderador') NOT NULL DEFAULT 'usuario',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categoria (
    cod_categoria INT AUTO_INCREMENT PRIMARY KEY,
    tipo_IVA DECIMAL(5,2) NOT NULL,
    descripcion VARCHAR(100) NOT NULL
);

CREATE TABLE hotel (
    cod_hotel INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    año_construccion INT NOT NULL,
    cod_categoria INT NOT NULL,
    FOREIGN KEY (cod_categoria) REFERENCES categoria(cod_categoria)
);

CREATE TABLE habitacion (
    cod_habitacion INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    cod_hotel INT NOT NULL,
    FOREIGN KEY (cod_hotel) REFERENCES hotel(cod_hotel)
);

CREATE TABLE reservante (
    cod_reservante INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    tipo ENUM('particular','agencia') NOT NULL,
    nombre_beneficiario VARCHAR(100) DEFAULT NULL
);

CREATE TABLE reserva (
    cod_reserva INT AUTO_INCREMENT PRIMARY KEY,
    precio DECIMAL(10,2) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    cod_reservante INT NOT NULL,
    cod_habitacion INT NOT NULL,
    FOREIGN KEY (cod_reservante) REFERENCES reservante(cod_reservante),
    FOREIGN KEY (cod_habitacion) REFERENCES habitacion(cod_habitacion)
);
