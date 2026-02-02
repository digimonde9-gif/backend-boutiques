console.log("DB UTILISÉE =", process.env.MYSQLDATABASE);
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const storeRoutes = require("./routes/stores.routes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// ✅ POOL MYSQL UNIQUE
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE, // railway
  port: Number(process.env.MYSQLPORT),
  waitForConnections: true,
  connectionLimit: 10,
});

// 🔍 Test DB au démarrage
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ MySQL connecté à la base:", process.env.MYSQLDATABASE);
    conn.release();
  } catch (err) {
    console.error("❌ ERREUR MYSQL:", err.message);
  }
})();

// 🔹 Route test racine
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend-boutiques opérationnel 🚀",
  });
});

// 🔹 Health DB
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

// 🔹 ROUTES (AVEC POOL)
app.use("/api/auth", authRoutes(pool));
app.use("/api/stores", storeRoutes(pool));

// 🚀 START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Backend démarré sur le port ${PORT}`);
});
