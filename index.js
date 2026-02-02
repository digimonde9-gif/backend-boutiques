import mysql from "mysql2/promise";
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion MySQL (Hostinger)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

// Test connexion MySQL
(async () => {
  try {
    await db.query("SELECT 1");
    console.log("✅ MySQL connecté avec succès");
  } catch (err) {
    console.error("❌ Erreur connexion MySQL", err);
  }
})();

// Route test
app.get("/", (req, res) => {
  res.send("API LogoApp fonctionne 🚀");
});

// Exemple : créer une boutique
app.post("/stores", async (req, res) => {
  const { merchant_id, name, slug } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO stores (merchant_id, name, slug) VALUES (?, ?, ?)",
      [merchant_id, name, slug]
    );

    res.json({
      success: true,
      store_id: result.insertId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lancement serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Serveur lancé sur le port " + PORT);
});
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connexion MySQL réussie");
    connection.release();
  } catch (err) {
    console.error("❌ Erreur MySQL :", err.message);
  }
})();

