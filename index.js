const mysql = require("mysql2/promise");
const { initDatabase } = require("./db-init");


console.log("🔍 MYSQLHOST =", process.env.MYSQLHOST);
console.log("🔍 MYSQLPORT =", process.env.MYSQLPORT);

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,       // ⛔ PAS localhost
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQLPORT),
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0
});

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ MySQL Railway CONNECTÉ");
    connection.release();
    
    await initDatabase(pool);
  } catch (err) {
    console.error("❌ ERREUR MYSQL DÉTAILLÉE");
    console.error("Code:", err.code);
    console.error("Message:", err.message);
    console.error("Host:", process.env.MYSQLHOST);
    console.error("Port:", process.env.MYSQLPORT);
  }
})();
