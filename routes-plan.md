# API Routes Plan - Faelin Bookshop

This document outlines all planned RESTful API endpoints for the Faelin Bookshop system. It serves as our build checklist for Week 15 and beyond.

---

## Base URL
All API endpoints will be prefixed with `/api` (with the root health route at `/`).

---

## Route Checklist Summary (10 Core Endpoints)

| # | HTTP Method | Endpoint Path | Brief Description |
| :--- | :--- | :--- | :--- |
| **0** | `GET` | `/` | Confirms the API server is online and operational. |
| **1** | `GET` | `/api/customers` | Returns all registered customers from the database. |
| **2** | `GET` | `/api/customers/:id` | Returns details for a single customer by their ID. |
| **3** | `POST` | `/api/customers` | Creates and registers a new customer profile. |
| **4** | `PUT` | `/api/customers/:id` | Updates a customer's contact and profile details. |
| **5** | `DELETE` | `/api/customers/:id` | Removes a customer profile and associated records. |
| **6** | `GET` | `/api/orders` | Returns all book orders placed across all customers. |
| **7** | `GET` | `/api/orders/:id` | Returns a single book order by its ID with customer details. |
| **8** | `GET` | `/api/customers/:id/orders` | Returns all book orders placed by a specific customer. |
| **9** | `POST` | `/api/orders` | Creates a new book order linked to a customer. |
| **10** | `PUT` | `/api/orders/:id` | Updates an order's status (e.g., pending, completed, cancelled). |
| **11** | `DELETE` | `/api/orders/:id` | Cancels and deletes an order by its ID. |

---

## Detailed Route Specifications

### System / Health Check
- **`GET /`**
  - **Description**: Returns the server status and health check message.
  - **Success Response (200)**: `{ "status": "ok", "message": "Capstone project server is running" }`

---

### Entity 1: Customers (`/api/customers`)

#### 1. `GET /api/customers`
- **Description**: Retrieves a list of all customer records.
- **Success Response (200)**: Array of customer objects.

#### 2. `GET /api/customers/:id`
- **Description**: Retrieves a single customer record matching the provided ID.
- **URL Parameter**: `id` (INTEGER)
- **Error Response (404)**: `{ "error": "Customer not found" }`

#### 3. `POST /api/customers`
- **Description**: Creates a new customer record.
- **Request Body (JSON)**:
  ```json
  {
    "name": "Elena Rostova",
    "email": "elena@faelinbooks.com",
    "phone": "0917-123-4567",
    "address": "Baguio City"
  }
  ```
- **Success Response (201)**: Newly created customer object with generated `id`.

#### 4. `PUT /api/customers/:id`
- **Description**: Updates contact information for an existing customer.
- **Request Body (JSON)**: Fields to update (`name`, `phone`, `address`).
- **Success Response (200)**: Updated customer object.

#### 5. `DELETE /api/customers/:id`
- **Description**: Deletes a customer profile from the system.
- **Success Response (200)**: `{ "message": "Customer deleted successfully" }`

---

### Entity 2: Orders (`/api/orders`)

#### 6. `GET /api/orders`
- **Description**: Retrieves all book orders, joined with customer name and email.
- **Success Response (200)**: Array of order records with customer details.

#### 7. `GET /api/orders/:id`
- **Description**: Retrieves full details of a specific book order by its ID.
- **URL Parameter**: `id` (INTEGER)
- **Error Response (404)**: `{ "error": "Order not found" }`

#### 8. `GET /api/customers/:id/orders`
- **Description**: Retrieves order history belonging to a specific customer.
- **URL Parameter**: `id` (INTEGER)
- **Success Response (200)**: Array of orders placed by customer `:id`.

#### 9. `POST /api/orders`
- **Description**: Creates a new book order associated with an existing customer.
- **Request Body (JSON)**:
  ```json
  {
    "customer_id": 1,
    "book_title": "The Name of the Wind",
    "author": "Patrick Rothfuss",
    "genre": "Fantasy",
    "quantity": 1,
    "total_price": 650.00
  }
  ```
- **Success Response (201)**: Created order object with `status: "pending"` and generated `id`.

#### 10. `PUT /api/orders/:id`
- **Description**: Updates the fulfillment status or quantity of an existing order.
- **Request Body (JSON)**:
  ```json
  {
    "status": "completed"
  }
  ```
- **Success Response (200)**: Updated order record.

#### 11. `DELETE /api/orders/:id`
- **Description**: Cancels and removes a book order from the database.
- **Success Response (200)**: `{ "message": "Order removed successfully" }`
