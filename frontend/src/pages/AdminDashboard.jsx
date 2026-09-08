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
    <Container className="py-5">
      <h1 className="mb-4">
        Admin Dashboard
      </h1>

      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body className="p-4">
              <h4>
                Manage Products
              </h4>

              <p className="text-muted">
                View, add, edit, and remove products
                from the ShopNest catalog.
              </p>

              <Button
                variant="warning"
                onClick={() =>
                  navigate('/admin/products')
                }
              >
                Manage Products
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Body className="p-4">
              <h4>
                View Orders
              </h4>

              <p className="text-muted">
                Review orders placed by customers.
              </p>

              <Button
                variant="outline-dark"
                onClick={() =>
                  navigate('/admin/orders')
                }
              >
                View Orders
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminDashboard