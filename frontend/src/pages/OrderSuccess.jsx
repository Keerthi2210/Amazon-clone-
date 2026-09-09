import {
  Container,
  Card,
  Button
} from 'react-bootstrap'

import {
  useNavigate
} from 'react-router-dom'

function OrderSuccess() {
  const navigate = useNavigate()

  return (
    <div className="order-success-page">
      <Container className="py-5">
        <Card className="order-success-card">
          <Card.Body>
            <div className="order-success-icon">
              ✓
            </div>

            <p className="order-success-label">
              ORDER CONFIRMED
            </p>

            <h1>
              Order Placed Successfully!
            </h1>

            <p className="order-success-message">
              Thank you for shopping with
              ShopNest. Your order has been
              placed successfully and is now
              available in your order history.
            </p>

            <div className="order-success-details">
              <div>
                <span>
                  📦
                </span>

                <div>
                  <strong>
                    Order confirmed
                  </strong>

                  <p>
                    Your order has been
                    recorded successfully.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  🧾
                </span>

                <div>
                  <strong>
                    View order details
                  </strong>

                  <p>
                    Check your products,
                    payment and delivery
                    information anytime.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-success-actions">
              <Button
                variant="warning"
                size="lg"
                onClick={() =>
                  navigate('/orders')
                }
              >
                View My Orders
              </Button>

              <Button
                variant="outline-dark"
                size="lg"
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
    </div>
  )
}

export default OrderSuccess