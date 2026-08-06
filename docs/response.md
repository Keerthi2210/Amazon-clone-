# Request Response Flow

## Example: User adds a product to the cart

Step 1

User clicks "Add to Cart"

↓

Step 2

JavaScript sends

POST /api/cart

↓

Step 3

Spring Boot Controller receives the request.

↓

Step 4

Service validates:

- User exists
- Product exists
- Stock is available

↓

Step 5

Repository saves CartItem into MySQL.

↓

Step 6

Controller returns

HTTP 200 OK

↓

Step 7

Frontend updates the cart icon.