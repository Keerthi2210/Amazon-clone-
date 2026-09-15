import {
  useEffect,
  useState
} from 'react'

import {
  Container,
  Card,
  Table,
  Badge,
  Button,
  Alert,
  Spinner
} from 'react-bootstrap'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import API_BASE_URL from '../config/api'

function AdminOrders() {
  const [orders, setOrders] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [error, setError] =
    useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setLoading(true)
        setError('')

        const token =
          localStorage.getItem(
            'shopnest-token'
          )

        const response = await fetch(
          `${API_BASE_URL}/api/orders`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        )

        if (!response.ok) {
          throw new Error(
            'Failed to load customer orders'
          )
        }

        const data =
          await response.json()

        setOrders(data)
      } catch (error) {
        setError(
          error.message ||
            'Failed to load customer orders'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchAllOrders()
  }, [])

  const getTotalItems = (items = []) => {
    return items.reduce(
      (total, item) =>
        total + item.quantity,
      0
    )
  }

  if (loading) {
    return (
      <div className="admin-page">
        <Container className="py-5 text-center">
          <Spinner animation="border" />

          <p className="mt-3">
            Loading customer orders...
          </p>
        </Container>
      </div>
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
        {error && (
          <Alert variant="danger">
            {error}
          </Alert>
        )}

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
                      <th>User</th>
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
                              #{order.id}
                            </strong>
                          </td>

                          <td>
                            <div className="admin-customer-cell">
                              <strong>
                                User #{order.userId}
                              </strong>

                              <small>
                                {order.shippingAddress}
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
                              {Number(
                                order.totalAmount
                              ).toLocaleString(
                                'en-IN'
                              )}
                            </strong>
                          </td>

                          <td>
                            <span className="admin-payment-method">
                              {order.paymentMethod}
                            </span>
                          </td>

                          <td>
                            <Badge bg="success">
                              {order.status}
                            </Badge>
                          </td>

                          <td>
                            <span className="admin-order-date">
                              {order.orderDate ||
                                '—'}
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
      </Container>
    </div>
  )
}

export default AdminOrders