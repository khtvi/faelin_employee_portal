# Final Capstone Demo Script (`demo-script.md`)

**Course**: Human-Computer Interaction | Final Capstone Project  
**Business**: Faelin Bookshop Management System  
**Target Duration**: 8 minutes max (1 minute per section)  

---

## 1. Intro (1 minute)
**What I say**:  
> "Good morning, Professor. My name is Student Developer, and my capstone project is the Faelin Bookshop Management System. Independent bookstores frequently struggle to balance walk-in customer reservations with organized order tracking. Faelin provides a focused, accessible platform where staff can record book orders, update fulfillment statuses in real time, and protect customer data with role-based security."

**What I click**:  
- Stand at podium, display the home terminal and browser ready on screen.

---

## 2. Live Page (1 minute)
**What I say**:  
> "Here is our live deployed application running on Render at `https://faelin-bookshop.onrender.com`. As a guest visitor, I can view our book catalog and customer order queue. The interface is clean, high-contrast, and keyboard accessible. Down here, we see the live weather forecast for Baguio City alongside a customized bookstore recommendation: recommending indoor reading and online delivery on rainy days."

**What I click**:  
- Open browser tab showing live Render site.
- Scroll down smoothly to show the Book Orders table and the Weather forecast box.

---

## 3. Use It (1 minute)
**What I say**:  
> "Now let's use the system as authenticated staff. I'll log in using our seeded demo admin account. Notice how the top navigation updates to show my email and administrator role, and the 'Record a new book order' panel appears. Let's record a customer order for 'The Shadow of the Wind' by Carlos Ruiz Zafón. I submit the form, and the new book order immediately appears in the queue. I can change its status to 'Confirmed' with a single dropdown click."

**What I click**:  
- Type `admin@faelinbooks.com` and password into the login form and press Enter.
- Select customer "Elena Rostova", type book title, author, price, and click "Add book order".
- Change the status dropdown of the newly added row to "Confirmed".

---

## 4. A Problem (1 minute)
**What I say**:  
> "A core HCI principle is graceful error recovery. If an unauthorized user attempts to log in with an incorrect password, watch what happens. The system displays a clear banner stating: 'Problem: Wrong email or password'. It uses plain language, avoids leaking whether the email exists, and features distinctive high-contrast borders so it remains readable even in grayscale."

**What I click**:  
- Click "Log out".
- Enter `admin@faelinbooks.com` with incorrect password `wrongpassword` and click "Log in".
- Point to the red notification banner at the top of the interface.

---

## 5. The API (1 minute)
**What I say**:  
> "Behind the user interface is our REST API. In Thunder Client, sending a public GET request to `/orders/details` returns our relational JOIN query with customer names. If an attacker attempts to POST a new order without an authorization token, the server immediately rejects the request with HTTP 401: 'Please log in first'. Once we attach our valid Bearer token, the request succeeds with HTTP 201 Created."

**What I click**:  
- Open Thunder Client.
- Send GET `http://localhost:3000/orders/details`.
- Send POST `http://localhost:3000/orders` without headers (shows 401).
- Send POST with `Authorization: Bearer <token>` (shows 201).

---

## 6. The Code (1 minute)
**What I say**:  
> "Let's inspect the `/orders` POST route in `server.js`. First, our `requireAuth` middleware validates the JWT token. Next, we enforce strict validation: `customerId` must be an integer, `bookTitle` cannot be empty, and `status` must match our allowed enum list. Crucially, before running any SQL, we query the `customers` table to verify the foreign key exists, protecting referential integrity with clear feedback before SQLite ever has to reject it."

**What I click**:  
- Switch to VS Code, opening lines 200–230 of `server.js`.
- Highlight the input validation checks and the parameterized SQL insert statement.

---

## 7. Tests (1 minute)
**What I say**:  
> "Reliability is verified through automated testing. In the terminal, I run `npm test`. Node's native test runner executes all 27 integration tests in an isolated in-memory SQLite database. We test health checks, authentication, bad inputs, foreign key constraints, pagination limits, and admin permissions. All 27 tests pass in under one second with zero failures."

**What I click**:  
- Open terminal and type `npm test`.
- Highlight the green output showing: `tests 27, pass 27, fail 0`.

---

## 8. Limits and Next Steps (1 minute)
**What I say**:  
> "On Render's free tier, the SQLite file is ephemeral and resets on redeployment. We prepared for this by having our server auto-seed the demo administrator and sample inventory upon startup. For a commercial rollout, I would attach a Render Persistent SSD Disk or migrate to hosted PostgreSQL, and add automated customer email receipts upon order confirmation. Thank you, and I look forward to your questions."

**What I click**:  
- Return to the browser showing the live system, smile, and open the floor for instructor evaluation questions.
