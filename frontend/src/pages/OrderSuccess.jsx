import {
  Container,
  Card,
  Button
} from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'

function OrderSuccess() {
  const navigate = useNavigate()

  return (
    <Container className="py-5">
      <Card
        className="shadow-sm mx-auto text-center"
        style={{
          maxWidth: '600px'
        }}
      >
        <Card.Body className="p-5">
          <h1 className="text-success mb-3">
            Order Placed Successfully!
          </h1>

          <p className="text-muted mb-4">
            Thank you for shopping with ShopNest.
            Your order has been placed successfully.
          </p>

          <div className="d-flex justify-content-center gap-3">
            <Button
              variant="warning"
              onClick={() =>
                navigate('/orders')
              }
            >
              View Orders
            </Button>

            <Button
              variant="outline-secondary"
              onClick={() =>
                navigate('/products')
              }
            >
              Continue Shopping
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default OrderSuccess