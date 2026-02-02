async function initDatabase(db) {
  // 1. MARCHANDS
  await db.query(`
    CREATE TABLE IF NOT EXISTS merchants (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(100) NOT NULL,
      whatsapp_number VARCHAR(20) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      is_admin BOOLEAN DEFAULT FALSE,
      subscription_plan ENUM('starter','pro','premium') DEFAULT 'starter',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // 2. BOUTIQUES
  await db.query(`
    CREATE TABLE IF NOT EXISTS stores (
      id INT AUTO_INCREMENT PRIMARY KEY,
      merchant_id INT NOT NULL,
      name VARCHAR(100) NOT NULL,
      slug VARCHAR(100) UNIQUE NOT NULL,
      logo_url TEXT,
      description TEXT,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (merchant_id) REFERENCES merchants(id) ON DELETE CASCADE
    )
  `);

  // 3. PRODUITS
  await db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      store_id INT NOT NULL,
      name VARCHAR(150) NOT NULL,
      description TEXT,
      price DECIMAL(12,2) DEFAULT 0,
      stock_quantity INT DEFAULT 0,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
    )
  `);

  // 4. COMMANDES
  await db.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      store_id INT NOT NULL,
      customer_name VARCHAR(100),
      customer_phone VARCHAR(20),
      total_amount DECIMAL(12,2),
      payment_status ENUM('pending','paid','failed') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
    )
  `);

  console.log("✅ Toutes les tables MySQL sont créées");
}

module.exports = { initDatabase };
