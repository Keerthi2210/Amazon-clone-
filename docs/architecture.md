# Amazon Clone Architecture

## System Architecture

```
Browser
    │
    ▼
HTML + CSS + JavaScript
    │
    ▼
HTTP Request
    │
    ▼
Spring Boot Controller
    │
    ▼
Service Layer
    │
    ▼
Repository Layer (JPA)
    │
    ▼
MySQL Database
```

---

## Layers

### 1. Frontend

Responsible for:

- Displaying pages
- Sending HTTP requests
- Displaying responses

Technologies:

- HTML
- CSS
- JavaScript

---

### 2. Controller

Receives HTTP requests from the frontend.

Example:

GET /api/products

POST /api/cart

---

### 3. Service

Contains business logic.

Example:

- Check stock before adding to cart.
- Calculate total order amount.
- Validate user permissions.

---

### 4. Repository

Communicates with the database using Spring Data JPA.

Example:

- Save Product
- Find User
- Delete Order

---

### 5. Database

Stores all application data.

Tables:

- User
- Product
- Category
- Cart
- CartItem
- Order
- OrderItem
- Review
- Address