const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/:merchantId", async (req, res) => {
  const { merchantId } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM stores WHERE merchant_id = ?",
      [merchantId]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
