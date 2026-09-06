import {
  useContext,
  useState
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Container,
  Card,
  Form,
  Button,
  Alert
} from 'react-bootstrap'

import AuthContext from '../context/AuthContext'

function Signup() {
  const { setUser } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const newUser = {
      name,
      email
    }

    setUser(newUser)

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
            Create Account
          </h2>

          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                required
              />
            </Form.Group>

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
                placeholder="Create a password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Confirm Password
              </Form.Label>

              <Form.Control
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                required
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