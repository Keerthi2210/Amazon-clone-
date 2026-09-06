import {
  useContext,
  useState
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Container,
  Card,
  Form,
  Button
} from 'react-bootstrap'

import AuthContext from '../context/AuthContext'

function Login() {
  const { setUser } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const loggedInUser = {
      name: email.split('@')[0],
      email: email
    }

    setUser(loggedInUser)

    navigate('/')
  }

  return (
    <Container className="d-flex justify-content-center py-5">
      <Card
        className="shadow-sm"
        style={{
          width: '100%',
          maxWidth: '450px'
        }}
      >
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">
            Sign In
          </h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
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
            Don't have an account?{' '}
            <Link to="/signup">
              Sign up
            </Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Login