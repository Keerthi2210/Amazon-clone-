import API_BASE_URL from '../config/api'
import {
  useContext,
  useState
} from 'react'

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert
} from 'react-bootstrap'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import AuthContext from '../context/AuthContext'

function Login() {
  const { setUser } =
    useContext(AuthContext)

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [error, setError] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      )

      if (!response.ok) {
        throw new Error(
          'Invalid email or password'
        )
      }

      const data =
        await response.json()

      const loggedInUser = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role
      }

      localStorage.setItem(
        'shopnest-token',
        data.token
      )

      setUser(loggedInUser)

      navigate('/')
    } catch (error) {
      setError(
        error.message ||
          'Login failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center">
          <Col
            md={8}
            lg={5}
            xl={4}
          >
            <Card className="auth-card">
              <Card.Body>
                <div className="auth-brand">
                  Shop<span>Nest</span>
                </div>

                <div className="auth-heading">
                  <h2>
                    Welcome back
                  </h2>

                  <p>
                    Sign in to continue shopping
                    and manage your orders.
                  </p>
                </div>

                {error && (
                  <Alert variant="danger">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Email Address
                    </Form.Label>

                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(event) =>
                        setEmail(
                          event.target.value
                        )
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>
                      Password
                    </Form.Label>

                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) =>
                        setPassword(
                          event.target.value
                        )
                      }
                      required
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="warning"
                    size="lg"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading
                      ? 'Signing In...'
                      : 'Sign In'}
                  </Button>
                </Form>

                <p className="auth-switch-text">
                  Don't have an account?{' '}
                  <Link to="/signup">
                    Create account
                  </Link>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login