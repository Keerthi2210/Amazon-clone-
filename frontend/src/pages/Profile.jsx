import { useContext } from 'react'

import {
  Container,
  Card,
  Button
} from 'react-bootstrap'

import {
  useNavigate
} from 'react-router-dom'

import AuthContext from '../context/AuthContext'

function Profile() {
  const {
    user,
    setUser
  } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    navigate('/')
  }

  if (!user) {
    return (
      <div className="profile-page">
        <Container className="py-5">
          <div className="profile-empty-state">
            <div className="profile-empty-icon">
              👤
            </div>

            <h2>
              You are not signed in
            </h2>

            <p>
              Sign in to view your profile
              and account details.
            </p>

            <Button
              variant="warning"
              onClick={() =>
                navigate('/login')
              }
            >
              Go to Login
            </Button>
          </div>
        </Container>
      </div>
    )
  }

  const avatarLetter =
    user.name
      ? user.name.charAt(0).toUpperCase()
      : 'U'

  return (
    <div className="profile-page">
      <section className="profile-header">
        <Container>
          <p className="section-eyebrow mb-2">
            Your Account
          </p>

          <h1>
            My Profile
          </h1>

          <p>
            Manage your ShopNest account
            information.
          </p>
        </Container>
      </section>

      <Container className="py-5">
        <Card className="profile-card">
          <Card.Body>
            <div className="profile-top">
              <div className="profile-avatar">
                {avatarLetter}
              </div>

              <div>
                <h2>
                  {user.name}
                </h2>

                <p>
                  ShopNest Customer
                </p>
              </div>
            </div>

            <div className="profile-divider" />

            <div className="profile-details">
              <div>
                <span>
                  Full Name
                </span>

                <strong>
                  {user.name}
                </strong>
              </div>

              <div>
                <span>
                  Email Address
                </span>

                <strong>
                  {user.email}
                </strong>
              </div>

              <div>
                <span>
                  Account Type
                </span>

                <strong>
                  Customer
                </strong>
              </div>
            </div>

            <div className="profile-actions">
              <Button
                variant="warning"
                onClick={() =>
                  navigate('/orders')
                }
              >
                View My Orders
              </Button>

              <Button
                variant="outline-danger"
                onClick={
                  handleLogout
                }
              >
                Logout
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default Profile