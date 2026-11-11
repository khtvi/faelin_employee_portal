require('dotenv').config();
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const dbFile = process.env.DB_FILE || path.join(__dirname, 'faelin.db');
const db = new Database(dbFile);
db.pragma('foreign_keys = ON');

// Create tables with relational foreign key
db.exec(`
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customerId INTEGER NOT NULL,
    bookTitle TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT NOT NULL DEFAULT 'Fiction',
    quantity INTEGER NOT NULL DEFAULT 1,
    totalPrice REAL NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending',
    orderDate TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES customers(id)
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'staff'
  );
`);

// Seed initial realistic data only when database is empty
const count = db.prepare('SELECT COUNT(*) AS total FROM customers').get().total;

if (count === 0) {
  const addCustomer = db.prepare(
    'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)'
  );

  addCustomer.run('Elena Rostova', 'elena@faelinbooks.com', '0917-111-2222', 'Baguio City');
  addCustomer.run('Marcus Vance', 'marcus.v@example.com', '0918-333-4444', 'Quezon City');
  addCustomer.run('Sofia Alcantara', 'sofia.a@outlook.com', '0919-555-6666', 'Makati City');
  addCustomer.run('Liam Ramos', 'liam.r@gmail.com', '0920-777-8888', 'Cebu City');
  addCustomer.run('Chloe Santos', 'chloe.s@yahoo.com', '0921-999-0000', 'Davao City');
  addCustomer.run('Gabriel Mendoza', 'gabriel.m@gmail.com', '0922-123-9876', 'Iloilo City');
  addCustomer.run('Aria Villanueva', 'aria.v@faelinbooks.com', '0923-456-7890', 'Tagaytay City');
  addCustomer.run('Rafael Aquino', 'rafael.a@example.com', '0924-654-3210', 'Bacolod City');

  const addOrder = db.prepare(
    'INSERT INTO orders (customerId, bookTitle, author, genre, quantity, totalPrice, status) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );

  addOrder.run(1, 'The Name of the Wind', 'Patrick Rothfuss', 'Fantasy', 1, 650.00, 'Completed');
  addOrder.run(1, 'Kafka on the Shore', 'Haruki Murakami', 'Magical Realism', 2, 980.00, 'Pending');
  addOrder.run(2, 'Dune', 'Frank Herbert', 'Sci-Fi', 1, 720.00, 'Confirmed');
  addOrder.run(3, 'Project Hail Mary', 'Andy Weir', 'Sci-Fi', 1, 850.00, 'Pending');
  addOrder.run(3, 'Norwegian Wood', 'Haruki Murakami', 'Fiction', 1, 540.00, 'Completed');
  addOrder.run(4, 'The Song of Achilles', 'Madeline Miller', 'Mythology', 1, 620.00, 'Cancelled');
  addOrder.run(5, 'Six of Crows', 'Leigh Bardugo', 'Fantasy', 2, 1100.00, 'Pending');
  addOrder.run(6, 'Babel', 'R.F. Kuang', 'Historical Fantasy', 1, 890.00, 'Completed');
}

// Seed the demo admin account. It comes ONLY from DEMO_EMAIL and DEMO_PASSWORD
// (your .env on your PC, Render's Environment page when live). It is created
// once, if that email is not in the database yet. No password is hardcoded here.
const demoEmail = process.env.DEMO_EMAIL;
const demoPassword = process.env.DEMO_PASSWORD;

if (demoEmail && demoPassword) {
  const email = demoEmail.trim().toLowerCase();
  const found = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (!found) {
    const hash = bcrypt.hashSync(demoPassword, 10);
    db.prepare(
      "INSERT INTO users (name, email, passwordHash, role) VALUES (?, ?, ?, 'admin')"
    ).run('Demo Admin', email, hash);
  }
}

module.exports = db;
