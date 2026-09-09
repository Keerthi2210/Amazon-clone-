import { useContext } from 'react'

import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button
} from 'react-bootstrap'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import OrderContext from '../context/OrderContext'

function Orders() {
  const { orders } =
    useContext(OrderContext)

  const navigate = useNavigate()

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <section className="orders-header">
          <Container>
            <p className="section-eyebrow mb-2">
              Your Purchases
            </p>

            <h1>
              My Orders
            </h1>

            <p>
              View and track all your
              ShopNest orders.
            </p>
          </Container>
        </section>

        <Container className="py-5">
          <div className="orders-empty-state">
            <div className="orders-empty-icon">
              📦
            </div>

            <h2>
              No orders yet
            </h2>

            <p>
              Once you place an order,
              it will appear here.
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
    <div className="orders-page">
      <section className="orders-header">
        <Container>
          <p className="section-eyebrow mb-2">
            Your Purchases
          </p>

          <h1>
            My Orders
          </h1>

          <p>
            Review your previous ShopNest
            purchases and order details.
          </p>
        </Container>
      </section>

      <Container className="py-5">
        <div className="orders-top-row">
          <div>
            <h4>
              Order History
            </h4>

            <p>
              {orders.length}{' '}
              {orders.length === 1
                ? 'order'
                : 'orders'}{' '}
              placed
            </p>
          </div>

          <Button
            variant="outline-dark"
            onClick={() =>
              navigate('/products')
            }
          >
            Continue Shopping
          </Button>
        </div>

        {orders.map((order) => {
          const totalItems =
            order.items.reduce(
              (total, item) =>
                total + item.quantity,
              0
            )

          return (
            <Card
              key={order.id}
              className="order-card"
            >
              <div className="order-card-header">
                <div>
                  <span>
                    Order Placed
                  </span>

                  <strong>
                    {order.orderDate}
                  </strong>
                </div>

                <div>
                  <span>
                    Total
                  </span>

                  <strong>
                    ₹
                    {order.total.toLocaleString(
                      'en-IN'
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Items
                  </span>

                  <strong>
                    {totalItems}
                  </strong>
                </div>

                <div className="order-id-section">
                  <span>
                    Order ID
                  </span>

                  <strong>
                    #{order.id}
                  </strong>
                </div>
              </div>

              <Card.Body>
                <div className="order-status-row">
                  <div>
                    <h5>
                      Order Status
                    </h5>

                    <p>
                      Your order has been
                      successfully placed.
                    </p>
                  </div>

                  <Badge
                    bg="success"
                    className="order-status-badge"
                  >
                    {order.status}
                  </Badge>
                </div>

                <div className="order-divider" />

                <Row className="g-4">
                  <Col lg={8}>
                    <div className="order-products">
                      {order.items.map(
                        (item) => (
                          <div
                            key={item.id}
                            className="order-product-item"
                          >
                            <Link
                              to={`/products/${item.id}`}
                              className="order-product-image-wrapper"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                              />
                            </Link>

                            <div className="order-product-info">
                              <Link
                                to={`/products/${item.id}`}
                              >
                                {item.name}
                              </Link>

                              <span>
                                {item.category}
                              </span>

                              <small>
                                Quantity:{' '}
                                {item.quantity}
                              </small>
                            </div>

                            <div className="order-product-price">
                              ₹
                              {(
                                item.price *
                                item.quantity
                              ).toLocaleString(
                                'en-IN'
                              )}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </Col>

                  <Col lg={4}>
                    <div className="order-info-panel">
                      <h6>
                        Delivery Address
                      </h6>

                      <strong>
                        {
                          order
                            .deliveryAddress
                            .fullName
                        }
                      </strong>

                      <p>
                        {
                          order
                            .deliveryAddress
                            .address
                        }
                        <br />

                        {
                          order
                            .deliveryAddress
                            .city
                        }{' '}
                        -{' '}
                        {
                          order
                            .deliveryAddress
                            .pinCode
                        }
                        <br />

                        {
                          order
                            .deliveryAddress
                            .phone
                        }
                      </p>

                      <div className="order-info-divider" />

                      <h6>
                        Payment Method
                      </h6>

                      <p className="mb-0">
                        {order.paymentMethod}
                      </p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )
        })}
      </Container>
    </div>
  )
}

export default Orders