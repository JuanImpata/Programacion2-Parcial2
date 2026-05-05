const mysql = require('mysql2/promise');
require('dotenv').config();

// Pool de conexiones a MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// Verificar conexión
db.getConnection()
  .then(() => console.log('✅ Conectado a MySQL database'))
  .catch(err => console.error('❌ Error conectando a MySQL:', err.message));

module.exports = db;
