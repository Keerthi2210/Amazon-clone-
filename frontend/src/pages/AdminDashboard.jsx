import {
  Container,
  Row,
  Col,
  Card,
  Button
} from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const navigate = useNavigate()

  return (
    <div className="admin-page">
      <section className="admin-header">
        <Container>
          <p className="section-eyebrow mb-2">
            ShopNest Management
          </p>

          <h1>Admin Dashboard</h1>

          <p>
            Manage your product catalog and
            review customer orders.
          </p>
        </Container>
      </section>

      <Container className="py-5">
        <div className="admin-section-heading">
          <div>
            <h3>Store Management</h3>

            <p>
              Choose an area to manage.
            </p>
          </div>
        </div>

        <Row className="g-4">
          <Col md={6}>
            <Card className="admin-dashboard-card h-100">
              <Card.Body>
                <div className="admin-dashboard-icon">
                  📦
                </div>

                <h4>Manage Products</h4>

                <p>
                  View your complete product
                  catalog, add new products,
                  update existing products and
                  remove products from ShopNest.
                </p>

                <Button
                  variant="warning"
                  onClick={() =>
                    navigate(
                      '/admin/products'
                    )
                  }
                >
                  Manage Products →
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="admin-dashboard-card h-100">
              <Card.Body>
                <div className="admin-dashboard-icon">
                  🧾
                </div>

                <h4>Customer Orders</h4>

                <p>
                  Review orders placed by
                  customers, including order
                  totals, payment methods and
                  current order status.
                </p>

                <Button
                  variant="outline-dark"
                  onClick={() =>
                    navigate(
                      '/admin/orders'
                    )
                  }
                >
                  View Orders →
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="admin-info-banner">
          <div className="admin-info-icon">
            ⚙️
          </div>

          <div>
            <h5>
              ShopNest Administration
            </h5>

            <p>
              Product changes made through
              the admin panel are stored
              locally for the current
              frontend version. Backend
              database integration will be
              added later.
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default AdminDashboard