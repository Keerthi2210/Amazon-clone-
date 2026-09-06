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
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } = useContext(CartContext)
  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )
  return (
    <Container className="py-5">
      <h1 className="mb-4">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Row className="g-4">
          {cartItems.map((item, index) => (
            <Col
              key={`${item.id}-${index}`}
              md={6}
            >
              <Card>
                <Card.Body>
                  <Card.Title>
                    {item.name}
                  </Card.Title>

                  <Card.Text>
                    ₹{item.price.toLocaleString('en-IN')}
                  </Card.Text>
                  <div className="d-flex align-items-center gap-2">
                    <Button
                      variant="outline-dark"
                      size="sm"
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity === 1}
                    >
                      −
                    </Button>

                    <span>{item.quantity}</span>

                    <Button
                      variant="outline-dark"
                      size="sm"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="mt-3"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                    <div className="mt-4 text-end">
                      <h4>
                        Total: ₹{cartTotal.toLocaleString('en-IN')}
                      </h4>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default Cart