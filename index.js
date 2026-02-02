const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const storeRoutes = require("./routes/stores.routes");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

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

// 🔹 Rendre le pool accessible aux routes
app.locals.db = pool;

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

// 🔹 Route racine (test)
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend-boutiques opérationnel 🚀",
  });
});

// 🔹 Routes API (OBLIGATOIRE AVANT app.listen)
app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);

// 🔹 Lancement du serveur (UNE SEULE FOIS)
app.listen(PORT, () => {
  console.log(`🚀 Backend démarré sur le port ${PORT}`);
});
