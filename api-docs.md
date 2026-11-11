# Faelin Bookshop API Documentation (`api-docs.md`)

This document serves as the formal API contract for the Faelin Bookshop Management System. Any client application (web interface, mobile application, or external service) interacting with the backend must conform to these route specifications.

Total registered routes in `server.js`: **20**  
Total rows documented below: **20**

---

## Complete API Route Contract

| # | Method | URL | Login Required | Request Body / Query Parameters | Success Response | Possible Errors |
|:---:|:------:|-----|:--------------:|---------------------------------|------------------|:---------------:|
| **1** | `GET` | `/health` | No | *None* | `200` `{"status":"ok","message":"..."}` | *None* |
| **2** | `POST` | `/auth/register` | No | `name`, `email`, `password` (min 8 chars) | `201` `{"id":...,"name":"...","email":"..."}` | `400`, `409` |
| **3** | `POST` | `/auth/login` | No | `email`, `password` | `200` `{"token":"...","user":{...}}` | `400`, `401`, `429` |
| **4** | `GET` | `/auth/me` | Yes (`Bearer`) | *None* | `200` `{"id":...,"email":"...","role":"..."}` | `401` |
| **5** | `GET` | `/auth/staff` | Yes (`Admin`) | *None* | `200` Array of staff accounts `[{id, name, email, role}]` | `401`, `403` |
| **6** | `GET` | `/weather` | No | Query: `city` (optional, default: `Lucena`) | `200` `{city, country, tempC, feelsLikeC, humidity, condition, cached}` | `400`, `404`, `429`, `502`, `503`, `504` |
| **7** | `GET` | `/customers` | No | *None* | `200` Array of all registered customers | *None* |
| **8** | `GET` | `/customers/:id` | No | *None* (URL param: `:id`) | `200` Customer object `{id, name, email, phone, ...}` | `404` |
| **9** | `GET` | `/customers/:id/orders` | No | *None* (URL param: `:id`) | `200` Array of orders belonging to customer `:id` | `404` |
| **10** | `POST` | `/customers` | Yes (`Bearer`) | `name`, `phone`, `email` (optional), `address` (optional) | `201` Created customer object | `400`, `401` |
| **11** | `DELETE` | `/customers/:id` | Yes (`Admin`) | *None* (URL param: `:id`) | `200` `{"message":"Customer deleted"}` | `401`, `403`, `404`, `409` |
| **12** | `GET` | `/orders/details` | No | *None* | `200` Array of orders joined with customer names | *None* |
| **13** | `GET` | `/orders` | No | Query: `page`, `limit` (max 50), `sort`, `order`, `status`, `genre` | `200` `{"page":1,"limit":10,"total":...,"totalPages":...,"data":[...]}` | `400` |
| **14** | `GET` | `/orders/:id` | No | *None* (URL param: `:id`) | `200` Book order object `{id, customerId, bookTitle, ...}` | `404` |
| **15** | `POST` | `/orders` | Yes (`Bearer`) | `customerId`, `bookTitle` (required); `author`, `genre`, `quantity` (whole number ≥ 1), `totalPrice` (number ≥ 0), `status` (optional) | `201` Created book order object | `400`, `401` |
| **16** | `PUT` | `/orders/:id` | Yes (`Bearer`) | `status` (`Pending`, `Confirmed`, `Completed`, `Cancelled`) | `200` Updated order object | `400`, `401`, `404` |
| **17** | `DELETE` | `/orders/:id` | Yes (`Admin`) | *None* (URL param: `:id`) | `200` `{"message":"Order deleted"}` | `401`, `403`, `404` |
| **18** | `GET` | `/reports/customer-summary` | No | *None* | `200` Aggregated sales `{id, name, email, totalOrders, totalSpent}` | *None* |
| **19** | `GET` | `/exchange-rates` | No | *None* (Proxies open exchange rates, 1h cache) | `200` `{base:"PHP", rates:{PHP:1, USD, EUR, GBP, JPY}}` | `429` |
| **20** | `GET` | `/store/location` | No | *None* | `200` `{storeName, address, coordinates, hours, amenities, mapEmbedUrl}` | *None* |


---

## Data Persistence Architecture Plan (Where Real Data Lives)
On Render's Free tier, the local SQLite database file (`faelin.db`) is ephemeral and is reset to the initial seed configuration upon redeploy or instance restart. For a production deployment, data durability is achieved via:
1. **Render Persistent Disk**: Attaching an SSD volume mounted at `/var/data` and configuring `DB_FILE=/var/data/faelin.db`.
2. **Managed Cloud Database**: Migrating relational storage to a hosted PostgreSQL instance (e.g., Render Managed Postgres or Supabase) with automated daily backups.
3. **Automated S3 Backups**: Running a cron snapshot worker that streams SQLite backup files to Amazon S3 / Cloudflare R2 every 6 hours.
