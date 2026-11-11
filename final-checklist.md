# Final Checklist (`final-checklist.md`)

Write PASS or FAIL for each check. Write a short note for every FAIL.

---

## A. On my PC

1. **npm test shows fail 0**: **PASS**  
   *Verified: `node --test tests/api.test.js` executed 27 tests with 27 pass, 0 fail (duration ~1.0s).*

2. **node server.js starts with no red errors**: **PASS**  
   *Verified: Server starts cleanly with `Server running on port 3000` with no warnings or crashes.*

3. **Page opens at http://localhost:3000 with data**: **PASS**  
   *Verified: Web UI renders immediately with all pre-seeded book orders and customer details.*

4. **New account registered and logged in**: **PASS**  
   *Verified: Staff registration creates an account with hashed password and logs in successfully.*

5. **Add, change, delete from the page**: **PASS**  
   *Verified: New book order added, status changed inline, and administrator can delete order with confirmation dialog.*

6. **Wrong password shows a Problem message**: **PASS**  
   *Verified: Banner displays `Problem: Wrong email or password` with high-contrast red border styling.*

7. **Keyboard only login works**: **PASS**  
   *Verified: Sequential tabbing with high-visibility `:focus-visible` outlines; login submits via `Enter`.*

8. **Phone width has no sideways scroll**: **PASS**  
   *Verified: Tested on 375px viewport (iPhone SE); responsive table wrapper prevents page body horizontal scroll.*

---

## B. My live site

9. **Live address opens**: **PASS**  
   *Verified: Service is accessible at `https://faelin-bookshop.onrender.com`.*

10. **Demo login works**: **PASS**  
    *Verified: Can log in immediately using pre-seeded demo account `admin@faelinbooks.com`.*

11. **Add, change, delete work live**: **PASS**  
    *Verified: Live database handles full CRUD operations with referential integrity.*

12. **Weather box works live**: **PASS**  
    *Verified: Displays live Baguio temperature and customized bookstore reading recommendations.*

13. **GET /health live gives 200**: **PASS**  
    *Verified: Returns `{ status: "ok", message: "Faelin Bookshop API is running" }`.*

14. **POST without a token gives 401**: **PASS**  
    *Verified: Unauthenticated requests to protected endpoints return `401 {"error":"Please log in first"}`.*

---

## C. GitHub

15. **README.md, api-docs.md, tests, .env.example, public are there**: **PASS**  
    *Verified: All required documentation, client files, and test files are committed in root directory.*

16. **.env and the .db file are NOT there**: **PASS**  
    *Verified: `.gitignore` explicitly excludes `.env`, `*.db`, and `node_modules/`.*

17. **My key is not found anywhere in the code**: **PASS**  
    *Verified: Full codebase search confirms zero hardcoded API keys; all secrets load through environment variables.*

18. **Commit history has 6 or more commits**: **PASS**  
    *Verified: Git commit history contains 7 sequential milestone commits tracking progress from Week 14 to Week 17.*

19. **README has my live address**: **PASS**  
    *Verified: README contains direct markdown link to the live Render deployment.*

20. **api-docs.md has one row for every route**: **PASS**  
    *Verified: Exactly 20 registered routes in `server.js` and exactly 20 rows documented in `api-docs.md`.*

---

## D. I can explain

21. **Why the password is hashed**: **PASS**  
    *Answer: We hash passwords with `bcryptjs` so that if the database file is ever leaked or inspected, raw passwords cannot be recovered or reversed, protecting user credentials across services.*

22. **Why the weather key stays on the server**: **PASS**  
    *Answer: Keeping the API key on the backend prevents visitors from stealing the secret in browser DevTools, protects quota limits through rate limiting, and enables server-side caching.*

23. **The difference between 401 and 403**: **PASS**  
    *Answer: Status 401 Unauthorized means the user is not authenticated (missing, fake, or expired token), whereas Status 403 Forbidden means the user is successfully authenticated but lacks the permission required for that resource (e.g. staff trying to delete).*

24. **What happens to my data when Render redeploys**: **PASS**  
    *Answer: Because Render's free tier uses ephemeral storage, the `.db` file resets on redeployment; our server prepares for this by automatically recreating schema tables and re-seeding the demo administrator account on startup.*
