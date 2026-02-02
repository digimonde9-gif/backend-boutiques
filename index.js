const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// 🔹 Pool MySQL Railway
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT),
  waitForConnections: true,
  connectionLimit: 5,
});

// 🔹 Test DB au démarrage
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Railway CONNECTÉ");
    connection.release();
  } catch (err) {
    console.error("❌ ERREUR MYSQL", err.message);
  }
})();

// 🔹 Route de test (OBLIGATOIRE)
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend-boutiques opérationnel 🚀",
  });
});

// 🔹 Exemple route API
app.get("/api/health", async (req, res) => {
  try {
    const [rows] = await pool.query("SHOW TABLES");
    res.json({
      db: "connected",
      tables: rows.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 LANCEMENT DU SERVEUR (LA LIGNE LA PLUS IMPORTANTE)
app.listen(PORT, () => {
  console.log(`🚀 Backend démarré sur le port ${PORT}`);
});
