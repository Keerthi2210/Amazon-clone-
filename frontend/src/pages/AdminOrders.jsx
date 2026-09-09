import { useContext } from 'react'

import {
  Container,
  Card,
  Table,
  Badge
} from 'react-bootstrap'

import OrderContext from '../context/OrderContext'

function AdminOrders() {
  const { orders } = useContext(OrderContext)

  return (
    <Container className="py-5">
      <h1 className="mb-4">
        Manage Orders
      </h1>

      {orders.length === 0 ? (
        <Card className="shadow-sm">
          <Card.Body className="text-center p-5">
            <h4>No orders yet</h4>

            <p className="text-muted mb-0">
              Customer orders will appear here.
            </p>
          </Card.Body>
        </Card>
      ) : (
        <Card className="shadow-sm">
          <Card.Body>
            <div className="table-responsive">
              <Table
                hover
                responsive
                className="align-middle mb-0"
              >
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        #{order.id}
                      </td>

                      <td>
                        <strong>
                          {
                            order.deliveryAddress
                              .fullName
                          }
                        </strong>

                        <small className="d-block text-muted">
                          {
                            order.deliveryAddress
                              .phone
                          }
                        </small>
                      </td>

                      <td>
                        {order.items.reduce(
                          (total, item) =>
                            total + item.quantity,
                          0
                        )}
                      </td>

                      <td>
                        ₹
                        {order.total.toLocaleString(
                          'en-IN'
                        )}
                      </td>

                      <td>
                        {order.paymentMethod}
                      </td>

                      <td>
                        <Badge bg="success">
                          {order.status}
                        </Badge>
                      </td>

                      <td>
                        {order.orderDate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  )
}

export default AdminOrders