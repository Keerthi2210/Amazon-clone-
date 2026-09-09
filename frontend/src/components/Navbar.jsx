import {
  useContext
} from 'react'

import {
  Container,
  Form,
  Nav,
  Navbar as BootstrapNavbar
} from 'react-bootstrap'

import { Link } from 'react-router-dom'

import CartContext from '../context/CartContext'
import AuthContext from '../context/AuthContext'

function Navbar() {
  const { cartItems } = useContext(CartContext)
  const { user } = useContext(AuthContext)

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  )

  return (
    <>
      <BootstrapNavbar
        bg="dark"
        variant="dark"
        expand="lg"
        className="py-2"
      >
        <Container fluid>
          <BootstrapNavbar.Brand
            as={Link}
            to="/"
            className="fw-bold fs-3"
          >
            ShopNest
          </BootstrapNavbar.Brand>

          <div className="text-light me-3">
            <small className="d-block">
              Deliver to
            </small>

            <strong>
              📍 Hyderabad
            </strong>
          </div>

          <Form
            className="d-flex flex-grow-1 mx-3"
          >
            <Form.Control
              type="search"
              placeholder="Search ShopNest"
            />
          </Form>

          <Nav className="align-items-lg-center">
            <Nav.Link
              as={Link}
              to={
                user
                  ? '/profile'
                  : '/login'
              }
            >
              <small className="d-block">
                {user
                  ? `Hello, ${user.name}`
                  : 'Hello, Sign in'}
              </small>

              <strong>
                Account
              </strong>
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/orders"
            >
              <small className="d-block">
                Returns
              </small>

              <strong>
                & Orders
              </strong>
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/admin"
            >
              <small className="d-block">
                ShopNest
              </small>

              <strong>
                Admin
              </strong>
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/cart"
            >
              <strong>
                🛒 Cart ({cartCount})
              </strong>
            </Nav.Link>
          </Nav>
        </Container>
      </BootstrapNavbar>

      <Nav
        className="
          bg-secondary
          px-3
          py-2
          gap-3
        "
      >
        <Nav.Link
          as={Link}
          to="/products"
          className="text-white"
        >
          All Products
        </Nav.Link>

        <Nav.Link
          href="#"
          className="text-white"
        >
          Electronics
        </Nav.Link>

        <Nav.Link
          href="#"
          className="text-white"
        >
          Fashion
        </Nav.Link>

        <Nav.Link
          href="#"
          className="text-white"
        >
          Home & Kitchen
        </Nav.Link>

        <Nav.Link
          href="#"
          className="text-white"
        >
          Books
        </Nav.Link>
      </Nav>
    </>
  )
}

export default Navbar