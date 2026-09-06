import { useContext } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Button
} from 'react-bootstrap'

import CartContext from '../context/CartContext'

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useContext(CartContext)

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  return (
    <Container className="py-5">

      <h1 className="mb-4">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <Card className="shadow-sm">
          <Card.Body className="text-center py-5">
            <h4>Your cart is empty</h4>

            <p className="text-muted mb-0">
              Add some products to continue shopping.
            </p>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Row className="g-4">

            <Col lg={8}>

              {cartItems.map((item) => {

                const itemTotal =
                  item.price * item.quantity

                return (
                  <Card
                    key={item.id}
                    className="mb-3 shadow-sm"
                  >
                    <Card.Body>

                      <Row className="align-items-center">

                        {/* Product Image */}
                        <Col
                          md={3}
                          className="text-center"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid"
                            style={{
                              maxHeight: '140px',
                              objectFit: 'contain'
                            }}
                          />
                        </Col>

                        {/* Product Information */}
                        <Col md={5}>

                          <h5>
                            {item.name}
                          </h5>

                          <p className="text-muted mb-2">
                            {item.category}
                          </p>

                          <p className="mb-2">
                            Price: ₹
                            {item.price.toLocaleString(
                              'en-IN'
                            )}
                          </p>

                          {item.inStock && (
                            <small className="text-success">
                              In Stock
                            </small>
                          )}

                        </Col>

                        {/* Quantity + Item Total */}
                        <Col
                          md={4}
                          className="text-md-end mt-3 mt-md-0"
                        >

                          <div
                            className="
                              d-flex
                              justify-content-md-end
                              justify-content-start
                              align-items-center
                              gap-2
                              mb-3
                            "
                          >

                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() =>
                                decreaseQuantity(item.id)
                              }
                              disabled={
                                item.quantity === 1
                              }
                            >
                              −
                            </Button>

                            <span
                              className="fw-bold px-2"
                            >
                              {item.quantity}
                            </span>

                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() =>
                                increaseQuantity(item.id)
                              }
                            >
                              +
                            </Button>

                          </div>

                          <p className="mb-2">
                            Item Total
                          </p>

                          <h5 className="text-danger">
                            ₹
                            {itemTotal.toLocaleString(
                              'en-IN'
                            )}
                          </h5>

                          <Button
                            variant="link"
                            className="
                              text-danger
                              p-0
                              text-decoration-none
                            "
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                          >
                            Remove
                          </Button>

                        </Col>

                      </Row>

                    </Card.Body>
                  </Card>
                )
              })}

            </Col>

            {/* Order Summary */}
            <Col lg={4}>

              <Card
                className="shadow-sm"
                style={{
                  position: 'sticky',
                  top: '20px'
                }}
              >
                <Card.Body>

                  <h4 className="mb-4">
                    Order Summary
                  </h4>

                  <div
                    className="
                      d-flex
                      justify-content-between
                      mb-3
                    "
                  >
                    <span>
                      Items
                    </span>

                    <span>
                      {cartItems.reduce(
                        (total, item) =>
                          total + item.quantity,
                        0
                      )}
                    </span>
                  </div>

                  <hr />

                  <div
                    className="
                      d-flex
                      justify-content-between
                      align-items-center
                    "
                  >
                    <h5>
                      Total
                    </h5>

                    <h4 className="text-danger">
                      ₹
                      {cartTotal.toLocaleString(
                        'en-IN'
                      )}
                    </h4>
                  </div>

                  <Button
                    variant="warning"
                    className="w-100 mt-3"
                  >
                    Proceed to Checkout
                  </Button>

                </Card.Body>
              </Card>

            </Col>

          </Row>
        </>
      )}

    </Container>
  )
}

export default Cart