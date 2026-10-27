# Capstone Proposal: Faelin Bookshop Management System

**Course**: Human-Computer Interaction | Final Capstone Project  
**Student Project**: Faelin Bookshop  
**Date**: October 2026  

---

## 1. Business Idea & Description

**Faelin** is an independent boutique bookstore and online reader community that curates fiction, poetry, and indie literature. The system provides book lovers with a clean platform to explore titles, maintain customer accounts, and place reservation or delivery orders.

### Core Relational Entities
1. **Customers**: The primary *people* entity storing customer registration and contact details.
2. **Orders**: The primary *activity* entity tracking book purchases, quantities, total costs, and fulfillment status linked to each customer.

---

## 2. Database Schema Design (`schema-plan.md`)

The system utilizes SQLite with `better-sqlite3`. Foreign keys are strictly enforced to maintain referential integrity between customer accounts and their orders.

### Table 1: `customers` (People Table)

| Column Name | SQLite Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` | Unique identifier for each customer |
| `name` | `TEXT` | `NOT NULL` | Full name of the customer |
| `email` | `TEXT` | `NOT NULL UNIQUE` | Customer's email address |
| `phone` | `TEXT` | `NULLABLE` | Contact phone number |
| `address` | `TEXT` | `NULLABLE` | Delivery address or city |
| `created_at` | `TEXT` | `DEFAULT CURRENT_TIMESTAMP` | Account creation date |

#### SQL Definition
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

### Table 2: `orders` (Activity Table)

| Column Name | SQLite Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `INTEGER` | `PRIMARY KEY AUTOINCREMENT` | Unique identifier for each order |
| `customer_id` | `INTEGER` | `NOT NULL, REFERENCES customers(id) ON DELETE CASCADE` | Foreign key referencing the customer |
| `book_title` | `TEXT` | `NOT NULL` | Title of the book ordered |
| `author` | `TEXT` | `NOT NULL` | Author of the book |
| `genre` | `TEXT` | `NULLABLE` | Genre / literary category |
| `quantity` | `INTEGER` | `NOT NULL DEFAULT 1 CHECK(quantity > 0)` | Number of book copies ordered |
| `total_price` | `REAL` | `NOT NULL CHECK(total_price >= 0)` | Total cost in currency (e.g., PHP) |
| `status` | `TEXT` | `NOT NULL DEFAULT 'pending'` | Fulfillment status (`pending`, `confirmed`, `completed`, `cancelled`) |
| `order_date` | `TEXT` | `DEFAULT CURRENT_TIMESTAMP` | Timestamp when order was placed |

#### SQL Definition
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

### Entity Relationship
- **Relationship**: `customers (1) <----> (N) orders`
- Each customer can place multiple orders over time.
- Every order belongs to a valid customer referenced by `customer_id`.

---

## 3. Planned API Endpoints (`routes-plan.md`)

| # | Method | Endpoint Path | Function & Purpose |
| :---: | :--- | :--- | :--- |
| **0** | `GET` | `/` | Root health check verifying server is active. |
| **1** | `GET` | `/api/customers` | Returns all registered customer profiles. |
| **2** | `GET` | `/api/customers/:id` | Returns a single customer profile by their ID. |
| **3** | `POST` | `/api/customers` | Registers a new customer into the database. |
| **4** | `PUT` | `/api/customers/:id` | Updates customer contact and profile information. |
| **5** | `DELETE` | `/api/customers/:id` | Deletes a customer profile and associated records. |
| **6** | `GET` | `/api/orders` | Returns all book orders joined with customer details. |
| **7** | `GET` | `/api/orders/:id` | Returns details of a specific book order by its ID. |
| **8** | `GET` | `/api/customers/:id/orders` | Returns all orders belonging to a specific customer. |
| **9** | `POST` | `/api/orders` | Creates a new book order linked to an existing customer ID. |
| **10** | `PUT` | `/api/orders/:id` | Updates an order's status (e.g., `pending` -> `completed`). |
| **11** | `DELETE` | `/api/orders/:id` | Cancels and removes an order by ID. |

---

## 4. Tech Stack & Environment Setup

- **Backend Runtime**: Node.js (Express.js)
- **Database**: SQLite via `better-sqlite3`
- **Security & Middleware**: `cors`, `dotenv`, `express-rate-limit`
- **Version Control**: Git & GitHub

### Verification
- Running `node server.js` or `npm start` spins up the Express server on port `3000`.
- Navigating to `http://localhost:3000/` returns:
  ```json
  {
    "status": "ok",
    "message": "Capstone project server is running"
  }
  ```
