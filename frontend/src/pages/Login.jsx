import {
  Container,
  Card,
  Form,
  Button
} from 'react-bootstrap'

function Login() {
  return (
    <Container
      className="d-flex justify-content-center py-5"
    >
      <Card
        className="shadow-sm"
        style={{ width: '100%', maxWidth: '450px' }}
      >
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">
            Sign In
          </h2>

          <Form>
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
                placeholder="Enter your password"
              />
            </Form.Group>

            <Button
              type="submit"
              variant="warning"
              className="w-100"
            >
              Sign In
            </Button>
          </Form>

          <p className="text-center text-muted mt-3 mb-0">
            Don't have an account? Sign up
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login