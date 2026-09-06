import { useContext } from 'react'
import CartContext from '../context/CartContext'
import { Link } from 'react-router-dom'
import {
  Container,
  Form,
  Nav,
  Navbar as BootstrapNavbar
} from 'react-bootstrap'

function Navbar() {
  const { cartItems } = useContext(CartContext)
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )
  return (
    <>
      <BootstrapNavbar
        bg="dark"
        data-bs-theme="dark"
        expand="lg"
      >
        <Container fluid>
          <BootstrapNavbar.Brand href="#">
            ShopNest
          </BootstrapNavbar.Brand>

          <div className="text-white me-3">
            <small className="d-block text-secondary">
              Deliver to
            </small>
            <strong>Hyderabad</strong>
          </div>

          <Form
            className="d-flex flex-grow-1 me-3"
            onSubmit={(event) => event.preventDefault()}
          >
            <Form.Select
              style={{ maxWidth: '120px' }}
            >
              <option>All</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Books</option>
              <option>Home</option>
            </Form.Select>

            <Form.Control
              type="search"
              placeholder="Search products"
            />

            <button
              type="submit"
              className="btn btn-warning"
            >
              Search
            </button>
          </Form>

          <BootstrapNavbar.Toggle />

          <BootstrapNavbar.Collapse>
            <Nav className="ms-auto align-items-lg-center">
              <Nav.Link
              as={Link}
              to="/cart">
              <strong>🛒 Cart (0)</strong>
            </Nav.Link>

              <Nav.Link
                as={Link}
                to="/login"
              >
                <small className="d-block">
                  Hello, Sign in
                </small>
                <strong>Account</strong>
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/cart"
              >
                <strong>🛒 Cart ({cartCount})</strong>
              </Nav.Link>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>

      <Nav
        className="px-3 py-2"
        style={{ backgroundColor: '#232f3e' }}
      >
        <Nav.Link className="text-white" href="#">
          ☰ All
        </Nav.Link>

        <Nav.Link className="text-white" href="#">
          Today's Deals
        </Nav.Link>

        <Nav.Link className="text-white" href="#">
          Electronics
        </Nav.Link>

        <Nav.Link className="text-white" href="#">
          Fashion
        </Nav.Link>

        <Nav.Link className="text-white" href="#">
          Home & Kitchen
        </Nav.Link>

        <Nav.Link className="text-white" href="#">
          Books
        </Nav.Link>
      </Nav>
    </>
  )
}

export default Navbar