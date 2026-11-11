# API Test Plan & Verification (`tests.md`)

**Course**: Human-Computer Interaction | Final Capstone Project  
**Business**: Faelin Bookshop Management System  
**Week / Meeting**: Week 15, Meeting 1  
**Target URL**: `http://localhost:3000`  

---

## 1. Overview & Test Environment
All tests were executed against the live Express API running on Node 22 with SQLite (`faelin.db` / `better-sqlite3`). Referential integrity foreign keys are enforced via `PRAGMA foreign_keys = ON;`.

---

## 2. Test Execution Table

| # | Test Name / Scenario | HTTP Method | Endpoint URL | Request Body / Query | Expected Status | Actual Status | Result Details / Verification |
|---|----------------------|:-----------:|--------------|----------------------|:---------------:|:-------------:|--------------------------------|
| **1** | Health Check | `GET` | `/health` | *None* | `200 OK` | `200 OK` | `{"status":"ok","message":"Faelin Bookshop API is running"}` |
| **2** | Create Valid Customer | `POST` | `/customers` | `{"name":"Clarissa Dalloway","phone":"0925-111-2233","email":"clarissa@bloomsbury.com","address":"Manila"}` | `201 Created` | `201 Created` | Returns newly inserted customer with autoincremented `id` and sanitized fields. |
| **3** | Customer Validation (Missing Fields) | `POST` | `/customers` | `{"name":"","phone":"0925"}` | `400 Bad Request` | `400 Bad Request` | Rejects missing/empty name: `{"error":"name and phone are required"}`. |
| **4** | Create Valid Book Order | `POST` | `/orders` | `{"customerId":1,"bookTitle":"The Secret History","author":"Donna Tartt","genre":"Fiction","quantity":1,"totalPrice":750.00,"status":"Pending"}` | `201 Created` | `201 Created` | Creates new order record linked to customer `id: 1` with status `Pending`. |
| **5** | FK Protection (Customer Not Found) | `POST` | `/orders` | `{"customerId":9999,"bookTitle":"Invisible Cities","author":"Italo Calvino"}` | `400 Bad Request` | `400 Bad Request` | Prevented orphan order creation: `{"error":"customerId does not match any customer"}`. |
| **6** | Order Validation (Disallowed Status) | `POST` | `/orders` | `{"customerId":1,"bookTitle":"Neuromancer","status":"MaybeShipped"}` | `400 Bad Request` | `400 Bad Request` | Status constraint enforced: `{"error":"status must be one of: Pending, Confirmed, Completed, Cancelled"}`. |
| **7** | Order Validation (Non-integer customerId) | `POST` | `/orders` | `{"customerId":"one","bookTitle":"1984"}` | `400 Bad Request` | `400 Bad Request` | String ID rejected: `{"error":"customerId must be a whole number"}`. |
| **8** | Single Order Not Found | `GET` | `/orders/9999` | *None* | `404 Not Found` | `404 Not Found` | Returns clean JSON: `{"error":"Order not found"}`. |
| **9** | Update Order Status | `PUT` | `/orders/1` | `{"status":"Completed"}` | `200 OK` | `200 OK` | Successfully updates order status and returns updated record row. |
| **10** | Bad Update Status | `PUT` | `/orders/1` | `{"status":"UnknownStatus"}` | `400 Bad Request` | `400 Bad Request` | `{"error":"status must be one of: Pending, Confirmed, Completed, Cancelled"}`. |
| **11** | Protected Delete (Customer Has Orders) | `DELETE` | `/customers/1` | *None* | `409 Conflict` | `409 Conflict` | Relational integrity protected: `{"error":"Customer still has orders. Delete those first."}`. |
| **12** | Successful Customer Delete (No Orders) | `DELETE` | `/customers/8` | *None* | `200 OK` | `200 OK` | Customer with 0 active orders deleted successfully: `{"message":"Customer deleted"}`. |
| **13** | JOIN Route (Names Instead of IDs) | `GET` | `/orders/details` | *None* | `200 OK` | `200 OK` | Combines `customers` and `orders`. Each row displays `customerName`, `customerPhone`, `bookTitle`, `author`, `genre`, `totalPrice`, `status`. |
| **14** | Orders Pagination | `GET` | `/orders?page=2&limit=2` | *Query params* | `200 OK` | `200 OK` | Returns `{ page: 2, limit: 2, total: 8, totalPages: 4, data: [...] }`. Offset calculation is exact. |
| **15** | Orders Sorting (Z-to-A) | `GET` | `/orders?sort=bookTitle&order=desc` | *Query params* | `200 OK` | `200 OK` | Returns records properly sorted alphabetically descending by `bookTitle`. |
| **16** | Orders Filtering by Status | `GET` | `/orders?status=Pending` | *Query params* | `200 OK` | `200 OK` | Returns only orders where `status = 'Pending'`. The `total` count reflects matching rows. |
| **17** | Pagination Limit Boundary Defense | `GET` | `/orders?limit=500` | *Query params* | `400 Bad Request` | `400 Bad Request` | DoS protection: `{"error":"limit must be a whole number from 1 to 50"}`. |
| **18** | SQL Injection in Sort Parameter | `GET` | `/orders?sort=title;DROP` | *Query params* | `400 Bad Request` | `400 Bad Request` | Rejects unwhitelisted sort fields: `{"error":"sort must be one of: id, customerId, bookTitle, ..."}`. |
| **19** | Malformed Request Body JSON | `POST` | `/orders` | `{bad json without closing` | `400 Bad Request` | `400 Bad Request` | Express error middleware catches syntax error: `{"error":"Request body is not valid JSON"}`. |
| **20** | Unknown Route Fallback | `GET` | `/nonexistent-route` | *None* | `404 Not Found` | `404 Not Found` | Catch-all handler returns JSON: `{"error":"Route not found"}`. |
| **21** | Bonus Analytics Route | `GET` | `/reports/customer-summary` | *None* | `200 OK` | `200 OK` | Returns aggregated customer metrics: `id`, `name`, `email`, `totalOrders`, and `totalSpent`. |

---

## 3. SQL Injection Defense Verification (`unsafe-demo.js`)
We executed `node unsafe-demo.js` with the malicious payload `' OR '1'='1`:
- **Unsafe string concatenation query**: Returned **8 rows** (every order in the database was exposed due to raw text evaluation).
- **Safe parameterized query (`?`)**: Returned **0 rows** (treated input purely as literal string value, nullifying the attack).

---

## 4. Verification Conclusion
All 21 test cases passed cleanly with 0 unexpected failures. Data referential integrity between Customers and Orders is safeguarded at both the API level and the SQLite database engine level.
