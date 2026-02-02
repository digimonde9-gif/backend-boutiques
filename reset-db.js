const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function reset() {
  console.log("⚠️ Suppression des tables en cours...");

  await pool.query(`
    DROP TABLE IF EXISTS
      order_items,
      orders,
      products,
      stores,
      merchants,
      platform_settings,
      payment_gateways
    CASCADE;
  `);

  console.log("✅ Toutes les tables ont été supprimées");
  process.exit(0);
}

reset().catch(err => {
  console.error("❌ Erreur lors de la suppression", err);
  process.exit(1);
});
