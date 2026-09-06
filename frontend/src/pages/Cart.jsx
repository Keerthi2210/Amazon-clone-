import { useContext } from 'react'
import {
  Container,
  Row,
  Col,
  Card
} from 'react-bootstrap'

import CartContext from '../context/CartContext'

function Cart() {
  const { cartItems } = useContext(CartContext)

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

                  <Card.Text>
                    Quantity: {item.quantity}
                  </Card.Text>
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