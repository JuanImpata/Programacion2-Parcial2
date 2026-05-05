const db = require('./config/db');

(async () => {
  try {
    const conn = await db.getConnection();
    console.log('\n✅ CONECTADO A MYSQL\n');
    
    // Ver BD actual
    const [rows] = await conn.query('SELECT DATABASE()');
    console.log('📍 Base de datos:', rows[0]['DATABASE()']);
    
    // Ver tablas
    const [tables] = await conn.query(`
      SELECT TABLE_NAME FROM information_schema.TABLES 
      WHERE TABLE_SCHEMA = 'hotel_app_db'
    `);
    
    if (tables.length === 0) {
      console.log('❌ NO HAY TABLAS. Necesitas ejecutar schema.sql');
    } else {
      console.log('\n✅ TABLAS ENCONTRADAS:', tables.length);
      tables.forEach(t => console.log('   -', t.TABLE_NAME));
      
      // Ver datos
      const [usuarios] = await conn.query('SELECT COUNT(*) as count FROM usuarios');
      const [hoteles] = await conn.query('SELECT COUNT(*) as count FROM hotel');
      const [reservas] = await conn.query('SELECT COUNT(*) as count FROM reserva');
      
      console.log('\n✅ DATOS ENCONTRADOS:');
      console.log('   - Usuarios:', usuarios[0].count);
      console.log('   - Hoteles:', hoteles[0].count);
      console.log('   - Reservas:', reservas[0].count);
    }
    
    conn.release();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR DE CONEXIÓN');
    console.error('Código:', error.code);
    console.error('Mensaje:', error.message);
    console.error('\nDetalles completos:', error);
    process.exit(1);
  }
})();
