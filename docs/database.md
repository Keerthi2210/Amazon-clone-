# Database Design

## Main Entities

1. User
2. Category
3. Product
4. ProductImage
5. Cart
6. CartItem
7. Order
8. OrderItem
9. Address
10. Review

---

## Relationships

- One User can have many Orders.
- One User can have many Addresses.
- One User has one Cart.
- One Cart has many CartItems.
- One Product belongs to one Category.
- One Product has many ProductImages.
- One Product has many Reviews.
- One Order has many OrderItems.

---

## User

| Column      | Type         |
|---------    |------        |
| id          | BIGINT       |
| first_name  | VARCHAR(100) |
| last_name   | VARCHAR(100) |
| email       | VARCHAR(255) |
| password    | VARCHAR(255) |
| phone       | VARCHAR(20)  |
| role        | VARCHAR(20)  |
| created_at  | TIMESTAMP    |

---

## Category

| Column      | Type         |
|---------    |------        |
| id          | BIGINT       |
| name        | VARCHAR(100) |
| description | TEXT         |

---

## Product

| Column         | Type         |
|---------       |------        |
| id             | BIGINT       |
| category_id    | BIGINT       |
| name           | VARCHAR(255) |
| description    | TEXT         |
| brand          | VARCHAR(100) |
| price          | DECIMAL(10,2)|
| stock_quantity | INT          |
| rating         | DECIMAL(2,1) |
| created_at     | TIMESTAMP    |

---

## ProductImage

| Column     | Type         |
|---------   |------        |
| id         | BIGINT       |
| product_id | BIGINT       |
| image_url  | VARCHAR(500) |

---

## Cart

| Column | Type |
|---------|------|
| id | BIGINT |
| user_id | BIGINT |
| created_at | TIMESTAMP |

---

## CartItem

| Column | Type |
|---------|------|
| id | BIGINT |
| cart_id | BIGINT |
| product_id | BIGINT |
| quantity | INT |

---

## Order

| Column | Type |
|---------|------|
| id | BIGINT |
| user_id | BIGINT |
| address_id | BIGINT |
| total_amount | DECIMAL(10,2) |
| order_status | VARCHAR(30) |
| created_at | TIMESTAMP |

---

## OrderItem

| Column | Type |
|---------|------|
| id | BIGINT |
| order_id | BIGINT |
| product_id | BIGINT |
| quantity | INT |
| price | DECIMAL(10,2) |

---

## Address

| Column | Type |
|---------|------|
| id | BIGINT |
| user_id | BIGINT |
| full_name | VARCHAR(100) |
| phone | VARCHAR(20) |
| address_line | TEXT |
| city | VARCHAR(100) |
| state | VARCHAR(100) |
| pincode | VARCHAR(10) |

---

## Review

| Column | Type |
|---------|------|
| id | BIGINT |
| user_id | BIGINT |
| product_id | BIGINT |
| rating | INT |
| comment | TEXT |
| created_at | TIMESTAMP |