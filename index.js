const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Boutiques en ligne 🚀");
});
pool.query("SELECT NOW()")
  .then(res => console.log("✅ Base de données connectée :", res.rows))
  .catch(err => console.error("❌ Erreur base de données :", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Serveur lancé sur le port " + PORT);
});
