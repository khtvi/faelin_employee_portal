# Fix List & Pre-Flight Resolution (`fix-list.md`)

Prioritized audit log of issues identified during pre-rehearsal system checks, corrective actions taken, and verification status.

---

## Pre-Flight Check Audit

1. **Check 8 - Mobile Table Viewport Overflow**:
   - **Problem**: On small screens (375px), table columns caused horizontal viewport distortion for the entire page body.
   - **Correction**: Encapsulated `<table>` in a `.table-wrap` container with `overflow-x: auto;` and enforced responsive media queries.
   - **Status**: **FIXED**

2. **Check 20 - Route Documentation Discrepancy**:
   - **Problem**: Route count in `server.js` originally contained duplicate `/api/*` alias blocks, risking mismatch with `api-docs.md`.
   - **Correction**: Standardized routes into 20 canonical endpoints in `server.js` and verified a 1:1 match across all 20 rows in `api-docs.md`.
   - **Status**: **FIXED**

3. **Check 16 - Sensitive Files Git Cleanliness**:
   - **Problem**: Need to guarantee that `.env` and `*.db` SQLite files are permanently omitted from git tracking.
   - **Correction**: Updated `.gitignore` to explicitly ignore `node_modules/`, `.env`, and `*.db`. Verified `.env.example` provides non-sensitive template keys.
   - **Status**: **FIXED**

4. **Check 4 - Auto-Focus Workflow After Adding Book Orders**:
   - **Problem**: Adding consecutive orders required multiple mouse clicks back into the book title field.
   - **Correction**: Added `$('bookTitle').focus()` inside `runForm` completion callback in `public/app.js`.
   - **Status**: **FIXED**

5. **Check 18 - Automated Test Suite Isolation**:
   - **Problem**: Tests could accidentally mutate local development database `faelin.db`.
   - **Correction**: Configured `process.env.DB_FILE = ':memory:'` in `tests/api.test.js` to ensure the entire test suite executes in isolated memory.
   - **Status**: **FIXED**

6. **Check 1 - `npm test` also ran `test-fk.js`**:
   - **Problem**: `node --test` runs every file named `test-*.js`, so the Week 14 script `test-fk.js` was run as a test against the real `faelin.db`.
   - **Correction**: `package.json` now uses `node --test tests/`, so only the `tests` folder runs (as the Week 17 handout says).
   - **Status**: **FIXED**

7. **Check 10 - Built-in admin/staff passwords in the code**:
   - **Problem**: `db.js` always created `admin@faelinbooks.com` / `staff@faelinbooks.com` with passwords written in the code and in the README.
   - **Correction**: The demo admin now comes only from `DEMO_EMAIL` and `DEMO_PASSWORD`. Tests set their own accounts.
   - **Status**: **FIXED**

8. **Check 12 - Weather returned invented data when the key started with `demo`**:
   - **Problem**: `/weather` skipped WeatherAPI and returned fake numbers.
   - **Correction**: Removed the fake mode. `/weather` always calls WeatherAPI (or answers 503 if there is no key).
   - **Status**: **FIXED**

9. **Check 14 - Order input checks and a crash**:
   - **Problem**: `POST /orders` with a non-text `bookTitle` crashed into a 500, and bad `quantity` / `totalPrice` were silently replaced. The server also allowed a status (`Done`) that the page could not show.
   - **Correction**: Added clear 400 checks, removed the old `service` alias and the `Done` status, and added tests 24 to 27.
   - **Status**: **FIXED**

10. **Check 4 - Page showed `undefined (admin)` after refresh**:
    - **Problem**: `/auth/me` returns id, email and role, but the page printed `user.name`.
    - **Correction**: The page now shows `Logged in as <email> (<role>)`.
    - **Status**: **FIXED**

11. **Check 9 - Rate limits on Render**:
    - **Problem**: Behind Render's proxy all visitors looked like one IP, so the login limit (10 per 15 minutes) was shared by everyone.
    - **Correction**: Added `app.set('trust proxy', 1)`.
    - **Status**: **FIXED**

12. **Check 20 - Documentation mismatches**:
    - **Problem**: README linked to a Windows path (`file:///c:/Users/Student/...`) and showed the admin password; test counts (22), route counts (18), the weather default city and category counts on the page (Literary Fiction 6, Science Fiction 6) were wrong.
    - **Correction**: Corrected to match the code (27 tests, 20 routes, Lucena, 5 and 7).
    - **Status**: **FIXED**

13. **Check 2 - Standalone `db.js` Configuration**:
    - **Problem**: When `db.js` or standalone utility scripts (`node test-fk.js`, `node unsafe-demo.js`) were executed outside of `server.js`, `process.env` was unpopulated, causing the demo admin account seeding to be skipped.
    - **Correction**: Added `require('dotenv').config()` directly at the top of `db.js`.
    - **Status**: **FIXED**

14. **Week 17 Stretch Features Implementation**:
    - **Added**:
      1. Administrative Staff Roster panel on the web page, revealed exclusively when an authenticated admin signs in (`GET /auth/staff`).
      2. Dynamic currency conversion in the navbar dropdown powered by `GET /exchange-rates` (PHP, USD, EUR, GBP, JPY).
      3. GitHub Actions Continuous Integration pipeline (`.github/workflows/test.yml`) running all 27 integration tests automatically on push.
      4. Standardized `npm test` script to `node --test tests/api.test.js` for cross-version Node compatibility.
    - **Status**: **COMPLETED & VERIFIED**
