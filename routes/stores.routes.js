const express = require("express");

module.exports = (pool) => {
  const router = express.Router();

  // 📦 LISTE DES BOUTIQUES
  router.get("/", async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM stores");
      res.json(rows);
    } catch (error) {
      console.error("❌ ERREUR STORES:", error.message);
      res.status(500).json({
        message: "Erreur serveur",
        error: error.message
      });
    }
  });

  return router;
};
