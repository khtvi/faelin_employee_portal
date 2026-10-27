# Database Schema Plan - Faelin Bookshop

## Business Overview
**Faelin** is an independent boutique bookstore and online reader community that curates fiction, poetry, and indie literature, offering readers seamless catalog browsing, personalized customer profiles, and book order reservations.

---

## Database Choice: SQLite (via `better-sqlite3`)

The database consists of two relational tables: `customers` (the primary "people" entity) and `orders` (the primary "activity" transaction entity). They are connected through a foreign key relationship (`orders.customer_id` -> `customers.id`).

---

## Table 1: `customers` (People Table)
This table stores records of individual patrons and book buyers registered with Faelin.

| Column Name | SQLite Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` | Unique identifier for each customer |
| `name` | `TEXT` | `NOT NULL` | Full name of the customer |
| `email` | `TEXT` | `NOT NULL UNIQUE` | Customer's email address for notifications and order receipts |
| `phone` | `TEXT` | `NULLABLE` | Contact phone number |
| `address` | `TEXT` | `NULLABLE` | Shipping or billing address |
| `created_at` | `TEXT` | `DEFAULT CURRENT_TIMESTAMP` | Date and time when the customer profile was created |

### SQL Definition
```sql
CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    address TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

---

## Table 2: `orders` (Activity Table)
This table tracks all book purchases and reservation orders placed by customers at Faelin.

| Column Name | SQLite Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` | Unique identifier for each order |
| `customer_id` | `INTEGER` | `NOT NULL, REFERENCES customers(id) ON DELETE CASCADE` | Foreign key referencing the customer who placed the order |
| `book_title` | `TEXT` | `NOT NULL` | Title of the book being ordered |
| `author` | `TEXT` | `NOT NULL` | Author of the ordered book |
| `genre` | `TEXT` | `NULLABLE` | Genre / category (e.g., Fantasy, Classic, Sci-Fi, Fiction) |
| `quantity` | `INTEGER` | `NOT NULL DEFAULT 1` | Number of copies ordered (must be >= 1) |
| `total_price` | `REAL` | `NOT NULL` | Total cost of the order (in PHP / currency) |
| `status` | `TEXT` | `NOT NULL DEFAULT 'pending'` | Current order status (`pending`, `confirmed`, `completed`, `cancelled`) |
| `order_date` | `TEXT` | `DEFAULT CURRENT_TIMESTAMP` | Date and time the order was placed |

### SQL Definition
```sql
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    book_title TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT,
    quantity INTEGER NOT NULL DEFAULT 1 CHECK(quantity > 0),
    total_price REAL NOT NULL CHECK(total_price >= 0),
    status TEXT NOT NULL DEFAULT 'pending',
    order_date TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE CASCADE
);
```

---

## Relationship & Data Integrity

- **Relationship Type**: One-to-Many (`1 : N`)
  - One customer can have zero, one, or multiple book orders.
  - Each order belongs strictly to one customer.
- **Foreign Key Connection**:
  - `orders.customer_id` corresponds to `customers.id`.
- **Integrity Enforcement**:
  - `ON DELETE CASCADE`: If a customer profile is removed, associated order history can be automatically handled or archived safely.
  - Foreign key constraints will be enforced by running `PRAGMA foreign_keys = ON;` in SQLite.

---

## Sample Initial Seed Data

```sql
-- Sample Customers
INSERT INTO customers (name, email, phone, address) VALUES
('Elena Rostova', 'elena@faelinbooks.com', '0917-123-4567', 'Baguio City, Philippines'),
('Marcus Vance', 'marcus.v@example.com', '0928-987-6543', 'Quezon City, Metro Manila');

-- Sample Orders
INSERT INTO orders (customer_id, book_title, author, genre, quantity, total_price, status) VALUES
(1, 'The Name of the Wind', 'Patrick Rothfuss', 'Fantasy', 1, 650.00, 'completed'),
(1, 'Kafka on the Shore', 'Haruki Murakami', 'Magical Realism', 2, 980.00, 'pending'),
(2, 'Dune', 'Frank Herbert', 'Sci-Fi', 1, 720.00, 'confirmed');
```
