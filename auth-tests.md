# Authentication & Authorization Test Plan (`auth-tests.md`)

**Course**: Human-Computer Interaction | Final Capstone Project  
**Business**: Faelin Bookshop Management System  
**Week / Meeting**: Week 15, Meeting 2  
**Target URL**: `http://localhost:3000`  

---

## 1. Authentication Architecture
- **Password Protection**: Passwords are never stored in plaintext. They are scrambled using `bcryptjs` with salt work factor 10 (`bcrypt.hashSync(password, 10)`).
- **Session Tokens**: Signed JSON Web Tokens (`jsonwebtoken`) with 1-hour expiration (`expiresIn: '1h'`) holding user claims: `id`, `email`, and `role`.
- **Role-Based Access Control**:
  - `Public`: All `GET` routes (`/customers`, `/orders`, `/orders/details`, `/health`, `/weather`).
  - `Staff` (`requireAuth`): Authenticated users can create (`POST`) and update (`PUT`) customers and orders.
  - `Admin` (`requireAuth, requireAdmin`): Only users with `role: 'admin'` are authorized to perform `DELETE` operations on orders and customers, or view administrative staff registries (`GET /auth/staff`).
- **Brute Force Defense**: `express-rate-limit` throttles login attempts to 10 tries per 15-minute window (`loginLimiter`).

---

## 2. Test Execution Table

| # | Test Name / Scenario | HTTP Method | Endpoint URL | Authorization Header / Body | Expected Status | Actual Status | Result Details / Verification |
|---|----------------------|:-----------:|--------------|-----------------------------|:---------------:|:-------------:|--------------------------------|
| **1** | Register New User | `POST` | `/auth/register` | `{"name":"Julian Huxley","email":"julian@faelinbooks.com","password":"securePassword123"}` | `201 Created` | `201 Created` | User created. Response returns `{ id: 3, name: "Julian Huxley", email: "julian@faelinbooks.com" }`. `passwordHash` is never exposed. |
| **2** | Duplicate Email Conflict | `POST` | `/auth/register` | Same body as Test 1 | `409 Conflict` | `409 Conflict` | Rejects duplicate email: `{"error":"That email is already registered"}`. |
| **3** | Password Length Validation | `POST` | `/auth/register` | `{"name":"Short","email":"short@test.com","password":"123"}` | `400 Bad Request` | `400 Bad Request` | Enforces policy: `{"error":"password must be at least 8 characters"}`. |
| **4** | Email Format Validation | `POST` | `/auth/register` | `{"name":"Bad","email":"notanemail","password":"securePassword123"}` | `400 Bad Request` | `400 Bad Request` | Enforces email pattern: `{"error":"a valid email is required"}`. |
| **5** | Successful Staff Login | `POST` | `/auth/login` | `{"email":"julian@faelinbooks.com","password":"securePassword123"}` | `200 OK` | `200 OK` | Issues signed JWT token. Returns user payload with `role: "staff"`. |
| **6** | Login with Wrong Password | `POST` | `/auth/login` | `{"email":"julian@faelinbooks.com","password":"wrongPassword"}` | `401 Unauthorized` | `401 Unauthorized` | Generic security message prevents email enumeration: `{"error":"Wrong email or password"}`. |
| **7** | Access Protected Route Without Token | `POST` | `/customers` | No `Authorization` header | `401 Unauthorized` | `401 Unauthorized` | Blocked by `requireAuth`: `{"error":"Please log in first"}`. |
| **8** | Access Protected Route With Malformed/Fake Token | `POST` | `/customers` | `Authorization: Bearer fake.token.here` | `401 Unauthorized` | `401 Unauthorized` | Token signature failure: `{"error":"Your login is invalid or expired"}`. |
| **9** | Current User Profile (`/auth/me`) | `GET` | `/auth/me` | Valid Bearer token | `200 OK` | `200 OK` | Returns decoded user identity: `{ id: 3, email: "julian@faelinbooks.com", role: "staff" }`. |
| **10** | Staff Authorized Order Creation | `POST` | `/orders` | Staff Bearer token + valid order JSON | `201 Created` | `201 Created` | Staff user creates book order successfully. |
| **11** | Staff Delete Attempt (Forbidden) | `DELETE` | `/orders/1` | Staff Bearer token | `403 Forbidden` | `403 Forbidden` | Blocked by `requireAdmin`: `{"error":"Admins only"}`. |
| **12** | Admin Login | `POST` | `/auth/login` | `{"email":"admin@faelinbooks.com","password":"AdminPassword123!"}` | `200 OK` | `200 OK` | Issues signed JWT with `role: "admin"`. |
| **13** | Admin Delete Order (Authorized) | `DELETE` | `/orders/8` | Admin Bearer token | `200 OK` | `200 OK` | Admin successfully deletes order: `{"message":"Order deleted"}`. |
| **14** | Admin View Staff Roster (Bonus) | `GET` | `/auth/staff` | Admin Bearer token | `200 OK` | `200 OK` | Returns full list of staff accounts with their assigned roles. |
| **15** | Staff View Staff Roster (Forbidden) | `GET` | `/auth/staff` | Staff Bearer token | `403 Forbidden` | `403 Forbidden` | Blocked with `{"error":"Admins only"}`. |

---

## 3. Token Expiry Experiment
1. In `server.js`, we temporarily adjusted `expiresIn: '20s'`.
2. Logged in and received a token.
3. Waited 30 seconds for the token expiration threshold to elapse.
4. Sent a `POST /orders` request with the expired token.
5. Result: The request was rejected with **Status 401 Unauthorized**:
   ```json
   { "error": "Your login is invalid or expired" }
   ```
6. The token setting was safely restored to `'1h'` for normal production usage.

---

## 4. Token Inspection Verification (`decode.js`)
Running `node decode.js <token>` decoded the middle base64url payload segment without needing the secret key:
```json
{
  "id": 1,
  "email": "admin@faelinbooks.com",
  "role": "admin",
  "iat": 1793080000,
  "exp": 1793083600
}
```
This demonstrates why confidential data (such as passwords or credit cards) must **never** be stored inside JWT claims; the token contents are readable by anyone who inspects the network traffic, while the secret signature guarantees integrity and authenticity.

---

## 5. Client Logout Mechanism
**Question**: How does a user log out when a stateless JWT token cannot be cancelled directly by the server?  
**Answer**: Because JWTs are stateless and the server does not track individual active sessions in the database, logout is accomplished on the client side by removing the token from browser storage (`localStorage.removeItem('faelinToken')`). Once deleted from the client, subsequent requests no longer attach the `Authorization: Bearer <token>` header, immediately revoking access to all protected endpoints.
