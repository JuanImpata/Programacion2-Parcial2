const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'hotel_app.db');

// Eliminar BD anterior si existe
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
  console.log('🗑️  BD anterior eliminada');
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error al crear BD:', err.message);
    process.exit(1);
  }
  console.log('✅ BD SQLite creada');
});

// Función para ejecutar SQL
const runSQL = (sql) => {
  return new Promise((resolve, reject) => {
    db.exec(sql, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

async function initDatabase() {
  try {
    // Leer y ejecutar schema
    console.log('📄 Ejecutando schema...');
    const schemaSQL = fs.readFileSync(path.join(__dirname, 'schema-sqlite.sql'), 'utf8');
    await runSQL(schemaSQL);
    console.log('✅ Schema ejecutado');

    // Leer y ejecutar seeds
    console.log('🌱 Ejecutando seeds...');
    const seedsSQL = fs.readFileSync(path.join(__dirname, 'seeds-sqlite.sql'), 'utf8');
    await runSQL(seedsSQL);
    console.log('✅ Seeds ejecutados');

    // Verificar datos
    console.log('\n📊 Verificando datos...');
    const tables = ['usuarios', 'categoria', 'hotel', 'habitacion', 'reservante', 'reserva'];

    for (const table of tables) {
      const count = await new Promise((resolve, reject) => {
        db.get(`SELECT COUNT(*) as count FROM ${table}`, (err, row) => {
          if (err) reject(err);
          else resolve(row.count);
        });
      });
      console.log(`   - ${table}: ${count} registros`);
    }

    console.log('\n🎉 BASE DE DATOS INICIALIZADA CON ÉXITO!');
    console.log('📁 Ubicación:', dbPath);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    db.close();
  }
}

initDatabase();