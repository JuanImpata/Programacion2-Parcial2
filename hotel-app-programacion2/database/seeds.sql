USE hotel_app_db;

-- password para todos: Admin123$ (hasheado con bcrypt)
INSERT INTO usuarios (usuario, password, rol) VALUES
('admin', '$2b$10$FQxvaVcinhf0Atp/kaJSAemy8zoRHhvPK717rpWM.0FS6x/RPZap6', 'admin'),
('usuario1', '$2b$10$FQxvaVcinhf0Atp/kaJSAemy8zoRHhvPK717rpWM.0FS6x/RPZap6', 'usuario'),
('moderador1', '$2b$10$FQxvaVcinhf0Atp/kaJSAemy8zoRHhvPK717rpWM.0FS6x/RPZap6', 'moderador'),
('usuario2', '$2b$10$FQxvaVcinhf0Atp/kaJSAemy8zoRHhvPK717rpWM.0FS6x/RPZap6', 'usuario'),
('usuario3', '$2b$10$FQxvaVcinhf0Atp/kaJSAemy8zoRHhvPK717rpWM.0FS6x/RPZap6', 'usuario');

INSERT INTO categoria (tipo_IVA, descripcion) VALUES
(19.00, 'Una estrella'),
(19.00, 'Dos estrellas'),
(19.00, 'Tres estrellas'),
(19.00, 'Cuatro estrellas'),
(19.00, 'Cinco estrellas');

INSERT INTO hotel (nombre, direccion, telefono, año_construccion, cod_categoria) VALUES
('Hotel Pereira Plaza', 'Cra 7 # 19-20, Pereira', '3101234567', 1995, 3),
('Hotel Dann Carlton', 'Av. 30 de Agosto # 30-10', '3207654321', 2000, 5),
('Hotel Movich', 'Calle 17 # 8-50, Pereira', '3114567890', 2010, 4),
('Hotel Soratama', 'Cra 13 # 15-30, Pereira', '3209876543', 1988, 2),
('Hotel Bolivar', 'Calle 20 # 5-10, Pereira', '3151234567', 1975, 1);

INSERT INTO habitacion (tipo, cod_hotel) VALUES
('Suite', 1), ('Doble', 1), ('Individual', 2),
('Suite', 2), ('Doble', 3), ('Individual', 3),
('Suite', 4), ('Doble', 5), ('Individual', 4), ('Doble', 5);

INSERT INTO reservante (nombre, direccion, telefono, tipo, nombre_beneficiario) VALUES
('Juan Pérez', 'Calle 5 # 10-20, Pereira', '3101111111', 'particular', NULL),
('María López', 'Cra 8 # 20-30, Medellín', '3202222222', 'particular', NULL),
('Viajes Colombia SAS', 'Calle 100 # 15-20, Bogotá', '3113333333', 'agencia', 'Carlos Gómez'),
('Travel Express', 'Av. El Dorado # 50-30, Bogotá', '3204444444', 'agencia', 'Ana Martínez'),
('Pedro Ramírez', 'Cra 15 # 30-40, Cali', '3155555555', 'particular', NULL);

INSERT INTO reserva (precio, fecha_inicio, fecha_fin, cod_reservante, cod_habitacion) VALUES
(250000.00, '2026-05-01', '2026-05-05', 1, 1),
(180000.00, '2026-05-03', '2026-05-07', 2, 3),
(320000.00, '2026-05-10', '2026-05-15', 3, 4),
(150000.00, '2026-05-12', '2026-05-14', 4, 6),
(200000.00, '2026-05-20', '2026-05-25', 5, 2);
