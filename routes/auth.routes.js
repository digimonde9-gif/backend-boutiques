const express = require("express");
const router = express.Router();
const pool = require("../db");

// TEST LOGIN (VERSION SIMPLE)
router.post("/login", async (req, res) => {
  try {
    const { whatsapp_number, password } = req.body;

    // 1️⃣ Vérification basique
    if (!whatsapp_number || !password) {
      return res.status(400).json({
        message: "whatsapp_number et password sont requis"
      });
    }

    // 2️⃣ Chercher le marchand en base
    const [rows] = await pool.query(
      "SELECT * FROM merchants WHERE whatsapp_number = ?",
      [whatsapp_number]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message: "Utilisateur introuvable"
      });
    }

    // 3️⃣ (TEMPORAIRE) On ne vérifie PAS encore le mot de passe
    // 👉 On teste juste que la route et la DB fonctionnent

    return res.json({
      message: "Login OK (test)",
      merchant: {
        id: rows[0].id,
        full_name: rows[0].full_name,
        whatsapp_number: rows[0].whatsapp_number
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur",
      error: error.message
    });
  }
});

module.exports = router;
