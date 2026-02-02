const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function init() {
  console.log("⏳ Initialisation de la base...");

  await pool.query(`
    CREATE TABLE IF NOT EXISTS shops (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      whatsapp TEXT NOT NULL,
      slug TEXT UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      shop_id INTEGER REFERENCES shops(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      price INTEGER,
      image TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("✅ Tables créées avec succès");
  process.exit(0);
}

init().catch(err => {
  console.error("❌ Erreur création tables", err);
  process.exit(1);
});
