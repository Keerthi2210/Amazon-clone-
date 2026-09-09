import { useContext } from 'react'

import {
  Container,
  Row,
  Col,
  Card,
  Button
} from 'react-bootstrap'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import CartContext from '../context/CartContext'

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useContext(CartContext)

  const navigate = useNavigate()

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  )

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Container className="py-5">
          <div className="cart-empty-state">
            <div className="cart-empty-icon">
              🛒
            </div>

            <h2>Your cart is empty</h2>

            <p>
              Looks like you haven't added
              anything to your cart yet.
            </p>

            <Button
              variant="warning"
              size="lg"
              onClick={() =>
                navigate('/products')
              }
            >
              Start Shopping
            </Button>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <section className="cart-page-header">
        <Container>
          <p className="section-eyebrow mb-2">
            Your Basket
          </p>

          <h1>Shopping Cart</h1>

          <p>
            Review your items before
            proceeding to checkout.
          </p>
        </Container>
      </section>

      <Container className="py-5">
        <Row className="g-4">
          <Col lg={8}>
            <div className="cart-section-heading">
              <h4>
                Cart Items
              </h4>

              <span>
                {totalItems}{' '}
                {totalItems === 1
                  ? 'item'
                  : 'items'}
              </span>
            </div>

            {cartItems.map((item) => {
              const itemTotal =
                item.price * item.quantity

              return (
                <Card
                  key={item.id}
                  className="cart-item-card"
                >
                  <Card.Body>
                    <Row className="align-items-center g-4">
                      <Col
                        xs={12}
                        sm={4}
                        md={3}
                      >
                        <Link
                          to={`/products/${item.id}`}
                          className="cart-item-image-wrapper"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="cart-item-image"
                          />
                        </Link>
                      </Col>

                      <Col
                        xs={12}
                        sm={8}
                        md={5}
                      >
                        <p className="cart-item-category">
                          {item.category}
                        </p>

                        <Link
                          to={`/products/${item.id}`}
                          className="cart-item-title"
                        >
                          {item.name}
                        </Link>

                        <div className="cart-item-unit-price">
                          ₹
                          {item.price.toLocaleString(
                            'en-IN'
                          )}{' '}
                          each
                        </div>

                        <span className="cart-stock-status">
                          ✓ In Stock
                        </span>

                        <Button
                          variant="link"
                          className="cart-remove-button"
                          onClick={() =>
                            removeFromCart(
                              item.id
                            )
                          }
                        >
                          Remove
                        </Button>
                      </Col>

                      <Col
                        xs={12}
                        md={4}
                        className="text-md-end"
                      >
                        <div className="cart-quantity-label">
                          Quantity
                        </div>

                        <div className="cart-quantity-control">
                          <Button
                            variant="outline-secondary"
                            onClick={() =>
                              decreaseQuantity(
                                item.id
                              )
                            }
                            disabled={
                              item.quantity === 1
                            }
                          >
                            −
                          </Button>

                          <span>
                            {item.quantity}
                          </span>

                          <Button
                            variant="outline-secondary"
                            onClick={() =>
                              increaseQuantity(
                                item.id
                              )
                            }
                          >
                            +
                          </Button>
                        </div>

                        <div className="cart-item-total-label">
                          Item total
                        </div>

                        <div className="cart-item-total">
                          ₹
                          {itemTotal.toLocaleString(
                            'en-IN'
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              )
            })}

            <Button
              variant="link"
              className="continue-shopping-link"
              onClick={() =>
                navigate('/products')
              }
            >
              ← Continue Shopping
            </Button>
          </Col>

          <Col lg={4}>
            <Card className="cart-summary-card">
              <Card.Body>
                <h4>
                  Order Summary
                </h4>

                <div className="cart-summary-row">
                  <span>
                    Items ({totalItems})
                  </span>

                  <span>
                    ₹
                    {cartTotal.toLocaleString(
                      'en-IN'
                    )}
                  </span>
                </div>

                <div className="cart-summary-row">
                  <span>
                    Delivery
                  </span>

                  <span className="cart-free-delivery">
                    FREE
                  </span>
                </div>

                <div className="cart-summary-divider" />

                <div className="cart-summary-total">
                  <span>
                    Order Total
                  </span>

                  <strong>
                    ₹
                    {cartTotal.toLocaleString(
                      'en-IN'
                    )}
                  </strong>
                </div>

                <Button
                  variant="warning"
                  size="lg"
                  className="w-100 mt-4"
                  onClick={() =>
                    navigate('/checkout')
                  }
                >
                  Proceed to Checkout
                </Button>

                <p className="cart-secure-note">
                  🔒 Secure checkout
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Cart