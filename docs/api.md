# REST API Design

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login user |
| POST | /api/auth/logout | Logout user |

---

## Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/{id} | Get product by ID |
| GET | /api/products/category/{id} | Get products by category |
| GET | /api/products/search | Search products |

---

## Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/categories | Get all categories |

---

## Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/cart | View cart |
| POST | /api/cart | Add item to cart |
| PUT | /api/cart/{id} | Update quantity |
| DELETE | /api/cart/{id} | Remove item |

---

## Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/orders | Place order |
| GET | /api/orders | Get all user orders |
| GET | /api/orders/{id} | Get order details |

---

## Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/reviews | Add review |
| GET | /api/reviews/product/{id} | Get product reviews |

---

## Admin

### Products

| Method | Endpoint |
|--------|----------|
| POST | /api/admin/products |
| PUT | /api/admin/products/{id} |
| DELETE | /api/admin/products/{id} |

### Categories

| Method | Endpoint |
|--------|----------|
| POST | /api/admin/categories |
| PUT | /api/admin/categories/{id} |
| DELETE | /api/admin/categories/{id} |