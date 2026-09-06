import { useContext } from 'react'
import {
  Container,
  Card,
  Button
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import AuthContext from '../context/AuthContext'

function Profile() {
  const { user, setUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  if (!user) {
    return (
      <Container className="py-5">
        <Card className="shadow-sm">
          <Card.Body className="text-center py-5">
            <h4>You are not signed in</h4>

            <Button
              variant="warning"
              className="mt-3"
              onClick={() => navigate('/login')}
            >
              Go to Login
            </Button>
          </Card.Body>
        </Card>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <Card
        className="shadow-sm mx-auto"
        style={{
          maxWidth: '600px'
        }}
      >
        <Card.Body className="p-4">
          <h2 className="mb-4">
            My Profile
          </h2>

          <p>
            <strong>Name:</strong>{' '}
            {user.name}
          </p>

          <p>
            <strong>Email:</strong>{' '}
            {user.email}
          </p>

          <Button
            variant="danger"
            className="mt-3"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default Profile