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

function Signup() {
  const { setUser } =
    useContext(AuthContext)

  const [name, setName] =
    useState('')

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [
    confirmPassword,
    setConfirmPassword
  ] = useState('')

  const [error, setError] =
    useState('')

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (
      password !== confirmPassword
    ) {
      setError(
        'Passwords do not match'
      )
      return
    }

    setError('')

    const newUser = {
      name,
      email
    }

    setUser(newUser)

    navigate('/')
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
                    Create account
                  </h2>

                  <p>
                    Join ShopNest and start
                    shopping in a few seconds.
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
                      Full Name
                    </Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(event) =>
                        setName(
                          event.target.value
                        )
                      }
                      required
                    />
                  </Form.Group>

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

                  <Form.Group className="mb-3">
                    <Form.Label>
                      Password
                    </Form.Label>

                    <Form.Control
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(event) =>
                        setPassword(
                          event.target.value
                        )
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>
                      Confirm Password
                    </Form.Label>

                    <Form.Control
                      type="password"
                      placeholder="Confirm your password"
                      value={
                        confirmPassword
                      }
                      onChange={(event) =>
                        setConfirmPassword(
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
                  >
                    Create Account
                  </Button>
                </Form>

                <div className="auth-demo-note">
                  Account creation is currently
                  frontend-only for this project.
                </div>

                <p className="auth-switch-text">
                  Already have an account?{' '}
                  <Link to="/login">
                    Sign in
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

export default Signup