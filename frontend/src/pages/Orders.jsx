import { useContext } from 'react'
import {
  Container,
  Card,
  Row,
  Col,
  Badge
} from 'react-bootstrap'

import OrderContext from '../context/OrderContext'

function Orders() {
  const { orders } = useContext(OrderContext)

  return (
    <Container className="py-5">
      <h1 className="mb-4">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <Card className="shadow-sm">
          <Card.Body className="text-center py-5">
            <h4>No orders yet</h4>

            <p className="text-muted mb-0">
              Your placed orders will appear here.
            </p>
          </Card.Body>
        </Card>
      ) : (
        orders.map((order) => (
          <Card
            key={order.id}
            className="shadow-sm mb-4"
          >
            <Card.Header>
              <Row>
                <Col md={4}>
                  <small className="text-muted">
                    ORDER PLACED
                  </small>

                  <div>
                    {order.orderDate}
                  </div>
                </Col>

                <Col md={4}>
                  <small className="text-muted">
                    TOTAL
                  </small>

                  <div>
                    ₹
                    {order.total.toLocaleString(
                      'en-IN'
                    )}
                  </div>
                </Col>

                <Col md={4} className="text-md-end">
                  <small className="text-muted">
                    ORDER ID
                  </small>

                  <div>
                    #{order.id}
                  </div>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body>
              <div className="mb-3">
                <Badge bg="success">
                  {order.status}
                </Badge>
              </div>

              {order.items.map((item) => (
                <Row
                  key={item.id}
                  className="
                    align-items-center
                    border-bottom
                    py-3
                  "
                >
                  <Col md={2}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid"
                      style={{
                        maxHeight: '90px',
                        objectFit: 'contain'
                      }}
                    />
                  </Col>

                  <Col md={6}>
                    <h5>
                      {item.name}
                    </h5>

                    <p className="text-muted mb-0">
                      Quantity: {item.quantity}
                    </p>
                  </Col>

                  <Col
                    md={4}
                    className="text-md-end"
                  >
                    <strong>
                      ₹
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString(
                        'en-IN'
                      )}
                    </strong>
                  </Col>
                </Row>
              ))}

              <div className="mt-4">
                <h6>
                  Delivery Address
                </h6>

                <p className="text-muted mb-0">
                  {order.deliveryAddress.fullName}
                  <br />

                  {order.deliveryAddress.address}
                  <br />

                  {order.deliveryAddress.city}
                  {' - '}
                  {order.deliveryAddress.pinCode}
                  <br />

                  Phone: {order.deliveryAddress.phone}
                </p>
              </div>

              <div className="mt-3">
                <strong>
                  Payment:
                </strong>{' '}
                {order.paymentMethod}
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  )
}

export default Orders