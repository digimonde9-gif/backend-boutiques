// ===============================
// IMPORTS
// ===============================
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const storeRoutes = require("./routes/stores.routes");

// ===============================
// APP EXPRESS
// ===============================
const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// CONFIG PORT
// ===============================
const PORT = process.env.PORT || 3000;

// ===============================
// MYSQL POOL (Railway)
// ===============================
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: Number(process.env.MYSQLPORT),
  waitForConnections: true,
  connectionLimit: 5,
});

// ===============================
// TEST MYSQL AU DÉMARRAGE
// ===============================
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Railway CONNECTÉ");
    connection.release();
  } catch (err) {
    console.error("❌ ERREUR MYSQL", err.message);
  }
})();

// ===============================
// ROUTES
// ===============================

// Route test
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend-boutiques opérationnel 🚀",
  });
});

// Health check DB
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

// Routes métiers
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);

// ===============================
// START SERVER (UNE SEULE FOIS)
// ===============================
app.listen(PORT, () => {
  console.log(`🚀 Backend démarré sur le port ${PORT}`);
});

// ===============================
// EXPORT POOL (pour les routes)
// ===============================
module.exports = pool;
