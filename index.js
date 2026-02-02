// ===============================
// IMPORTS
// ===============================
const mysql = require("mysql2/promise");

// ===============================
// CONFIGURATION MYSQL
// ===============================
const db = mysql.createPool({
  host: process.env.DB_HOST,       // ex: srv2121.hstgr.io
  user: process.env.DB_USER,       // ex: u224983997_logoappci
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,   // ex: u224983997_logoapp
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ===============================
// TEST DE CONNEXION MYSQL
// ===============================
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connexion MySQL réussie avec Hostinger");
    connection.release();
  } catch (error) {
    console.error("❌ Erreur de connexion MySQL");
    console.error("Message :", error.message);
    console.error("Code :", error.code);
  }
})();

// ===============================
// EXPORT (pour la suite de l'app)
// ===============================
module.exports = db;
