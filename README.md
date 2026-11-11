# Faelin Bookshop

A modern web management system for an independent boutique bookstore and reader community. Customers and visitors can browse books and reservation orders. Logged-in staff can create, update, and manage orders, while administrators have full deletion authority.

**Live Demo**: [https://faelin-bookshop.onrender.com](https://faelin-bookshop.onrender.com)  
*(Note: The initial load may require ~50 seconds if the free Render instance is waking from an idle state.)*

---

## Features
- **User Authentication**: Secure staff registration, login, and token-based session management (`bcryptjs` password hashing + JWT).
- **Relational Orders & Inventory**: Customers are linked to book orders with database-level foreign key enforcement and cascade protection.
- **Staff Order Operations**: Logged-in staff can record new book purchases and change fulfillment status (`Pending`, `Confirmed`, `Completed`, `Cancelled`).
- **Administrative Privileges & Staff Roster**: Only authorized admin accounts can delete records or inspect the full staff roster on the page.
- **Multi-Currency Pricing**: Live exchange rate conversion via `/exchange-rates` supporting PHP (₱), USD ($), EUR (€), GBP (£), and JPY (¥).
- **Reading Sanctuary & Store Locator**: OpenStreetMap interactive coordinates, opening hours, and amenities for the physical bookstore nook in Baguio City (`/store/location`).
- **Continuous Integration**: GitHub Actions CI workflow (`.github/workflows/test.yml`) running all 27 integration tests on every push.
- **Real-Time Client Filtering**: Live search by book title, author, or customer name, alongside status dropdown filtering.
- **Dynamic Weather Integration**: Fetches real-time weather from WeatherAPI.com with custom bookshop reading recommendations.
- **HCI & Accessibility First**: Fully navigable with keyboard (`Tab`, `Shift+Tab`, `Enter`), `:focus-visible` outlines, screen-reader status announcements (`aria-live="polite"`), and responsive layout with zero sideways scrolling on mobile devices (375px+).

---

## Built With
- **Backend**: Node.js, Express.js
- **Database**: SQLite with `better-sqlite3` (foreign keys enabled)
- **Security & Middleware**: `bcryptjs`, `jsonwebtoken`, `cors`, `dotenv`, `express-rate-limit`
- **Frontend**: Semantic HTML5, Vanilla CSS, Vanilla JavaScript (Static client served by Express)
- **External Integration**: WeatherAPI.com (proxied securely through server cache)
- **Testing**: Built-in Node.js Test Runner (`node:test`, `node:assert`)

---

## Run It On Your Computer

1. Ensure **Node.js 18+** (recommended Node.js 22) is installed.
2. Clone or extract the repository, and open a terminal in the project directory:
   ```bash
   cd BookShopFaelin
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file by copying the template:
   ```bash
   cp .env.example .env
   ```
   Fill in your desired values:
   ```env
   PORT=3000
   JWT_SECRET=your_32_byte_secret_hex
   WEATHER_KEY=your_weatherapi_key
   DEMO_EMAIL=your_demo_admin_email
   DEMO_PASSWORD=choose_a_password_of_8_or_more_characters
   ```
5. Start the server:
   ```bash
   npm start
   ```
6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Environment Variables (Names Only)
- `PORT`: Port on which the Express server listens (default: `3000`).
- `JWT_SECRET`: Secret cryptographic key used to sign and verify JSON Web Tokens.
- `WEATHER_KEY`: API access key for WeatherAPI.com.
- `DEMO_EMAIL`: Email address for the pre-seeded demo administrator account.
- `DEMO_PASSWORD`: Password for the pre-seeded demo administrator account.
- `DB_FILE`: *(Optional)* Filepath for the SQLite database (defaults to `./faelin.db`, or `:memory:` during testing).

---

## Automated Tests
Run the comprehensive automated test suite (27 integration tests):
```bash
npm test
```
All test suites run in-memory and execute in under 1 second with 0 external dependencies.

---

## API Specification
See [api-docs.md](api-docs.md) for every route, request schema, and response contract.

---

## Known Limits & Data Persistence Plan
On the free Render deployment tier, local disk storage is ephemeral: the SQLite database file (`faelin.db`) resets on each redeploy or container restart, restoring only the initial sample dataset and the seeded demo administrator account.

In a commercial production environment, persistent data durability would be achieved by:
1. Attaching a persistent SSD block volume (Render Persistent Disk).
2. Connecting to a hosted managed relational database (e.g. PostgreSQL).
3. Automating periodic cloud object storage backups (SQLite snapshots to Amazon S3 / Cloudflare R2).

---

## Author
**Student Developer**, BS Computer Science  
Human-Computer Interaction Capstone Project  
Sacred Heart College of Lucena City
