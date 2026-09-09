import { useContext } from 'react'

import {
  Container,
  Card,
  Table,
  Badge,
  Button
} from 'react-bootstrap'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import OrderContext from '../context/OrderContext'

function AdminOrders() {
  const { orders } =
    useContext(OrderContext)

  const navigate = useNavigate()

  const getTotalItems = (items) => {
    return items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    )
  }

  return (
    <div className="admin-page">
      <section className="admin-header">
        <Container>
          <Link
            to="/admin"
            className="admin-back-link"
          >
            ← Admin Dashboard
          </Link>

          <h1>Customer Orders</h1>

          <p>
            Review orders placed through
            the ShopNest store.
          </p>
        </Container>
      </section>

      <Container className="py-5">
        <div className="admin-orders-toolbar">
          <div>
            <h3>Order Management</h3>

            <p>
              {orders.length}{' '}
              {orders.length === 1
                ? 'order'
                : 'orders'}{' '}
              received.
            </p>
          </div>

          <Button
            variant="outline-dark"
            onClick={() =>
              navigate('/admin')
            }
          >
            Dashboard
          </Button>
        </div>

        {orders.length === 0 ? (
          <div className="admin-empty-state">
            <div>🧾</div>

            <h3>No orders yet</h3>

            <p>
              Customer orders will appear
              here after checkout.
            </p>

            <Button
              variant="warning"
              onClick={() =>
                navigate('/products')
              }
            >
              View Store
            </Button>
          </div>
        ) : (
          <Card className="admin-table-card">
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table
                  hover
                  className="admin-orders-table mb-0"
                >
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map(
                      (order) => (
                        <tr key={order.id}>
                          <td>
                            <strong className="admin-order-id">
                              #
                              {order.id}
                            </strong>
                          </td>

                          <td>
                            <div className="admin-customer-cell">
                              <strong>
                                {
                                  order
                                    .deliveryAddress
                                    .fullName
                                }
                              </strong>

                              <small>
                                {
                                  order
                                    .deliveryAddress
                                    .phone
                                }
                              </small>
                            </div>
                          </td>

                          <td>
                            <span className="admin-order-items">
                              {getTotalItems(
                                order.items
                              )}{' '}
                              {getTotalItems(
                                order.items
                              ) === 1
                                ? 'item'
                                : 'items'}
                            </span>
                          </td>

                          <td>
                            <strong>
                              ₹
                              {order.total.toLocaleString(
                                'en-IN'
                              )}
                            </strong>
                          </td>

                          <td>
                            <span className="admin-payment-method">
                              {
                                order.paymentMethod
                              }
                            </span>
                          </td>

                          <td>
                            <Badge bg="success">
                              {order.status}
                            </Badge>
                          </td>

                          <td>
                            <span className="admin-order-date">
                              {
                                order.orderDate
                              }
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        )}

        {orders.length > 0 && (
          <div className="admin-orders-note">
            <span>ℹ️</span>

            <p>
              Order status management will
              be connected to the backend
              later. The current frontend
              displays orders saved by the
              ShopNest checkout flow.
            </p>
          </div>
        )}
      </Container>
    </div>
  )
}

export default AdminOrders