import { Link } from 'react-router-dom'
import {
  Container,
  Card,
  Form,
  Button
} from 'react-bootstrap'

function Signup() {
  return (
    <Container className="d-flex justify-content-center py-5">
      <Card
        className="shadow-sm"
        style={{ width: '100%', maxWidth: '450px' }}
      >
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">
            Create Account
          </h2>

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter your full name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Create a password"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Confirm your password"
              />
            </Form.Group>

            <Button
              type="submit"
              variant="warning"
              className="w-100"
            >
              Create Account
            </Button>
          </Form>

          <p className="text-center text-muted mt-3 mb-0">
                Already have an account?{' '}
                <Link to="/login">
                    Sign in
                </Link>
            </p>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Signup