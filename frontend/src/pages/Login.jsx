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
  Button
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

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()

    const loggedInUser = {
      name: email.split('@')[0],
      email
    }

    setUser(loggedInUser)

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
                    Welcome back
                  </h2>

                  <p>
                    Sign in to continue shopping
                    and manage your orders.
                  </p>
                </div>

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
                  >
                    Sign In
                  </Button>
                </Form>

                <div className="auth-demo-note">
                  Demo authentication is currently
                  handled only in the frontend.
                </div>

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