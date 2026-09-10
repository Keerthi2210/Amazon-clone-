import {
  useContext,
  useState
} from 'react'

import {
  Container,
  Form,
  Nav,
  Navbar as BootstrapNavbar
} from 'react-bootstrap'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import CartContext from '../context/CartContext'
import AuthContext from '../context/AuthContext'

function Navbar() {
  const { cartItems } = useContext(CartContext)
  const { user } = useContext(AuthContext)

  const [searchTerm, setSearchTerm] =
    useState('')

  const navigate = useNavigate()

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  )

  const handleSearch = (event) => {
    event.preventDefault()

    const trimmedSearch =
      searchTerm.trim()

    if (!trimmedSearch) {
      navigate('/products')
      return
    }

    navigate(
      `/products?search=${encodeURIComponent(
        trimmedSearch
      )}`
    )
  }

  return (
    <header>
      <BootstrapNavbar
        expand="lg"
        className="shopnest-navbar"
      >
        <Container>
          <BootstrapNavbar.Brand
            as={Link}
            to="/"
            className="shopnest-brand"
          >
            Shop<span>Nest</span>
          </BootstrapNavbar.Brand>

          <BootstrapNavbar.Toggle
            aria-controls="shopnest-navbar"
          />

          <BootstrapNavbar.Collapse
            id="shopnest-navbar"
          >
            <div className="delivery-location">
              <span className="delivery-label">
                Deliver to
              </span>

              <strong>
                📍 Hyderabad
              </strong>
            </div>

            <Form
              className="shopnest-search"
              onSubmit={handleSearch}
            >
              <Form.Control
                type="search"
                placeholder="Search for products..."
                aria-label="Search products"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
              />

              <button
                type="submit"
                className="search-button"
                aria-label="Search"
              >
                🔍
              </button>
            </Form>

            <Nav className="ms-auto shopnest-nav-links">
              <Nav.Link
                as={Link}
                to={
                  user
                    ? '/profile'
                    : '/login'
                }
                className="shopnest-nav-item"
              >
                <small>
                  {user
                    ? `Hello, ${user.name}`
                    : 'Hello, sign in'}
                </small>

                <strong>
                  Account
                </strong>
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/orders"
                className="shopnest-nav-item"
              >
                <small>
                  Returns
                </small>

                <strong>
                  & Orders
                </strong>
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/admin"
                className="shopnest-nav-item"
              >
                <small>
                  ShopNest
                </small>

                <strong>
                  Admin
                </strong>
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/cart"
                className="shopnest-cart-link"
              >
                <span className="cart-icon">
                  🛒
                </span>

                <span>
                  Cart
                </span>

                {cartCount > 0 && (
                  <span className="cart-count">
                    {cartCount}
                  </span>
                )}
              </Nav.Link>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>

      <nav className="category-navbar">
        <Container className="category-nav-content">
          <Link
            to="/products"
            className="category-link category-link-main"
          >
            ☰ All Products
          </Link>

          <Link
            to="/products?category=Electronics"
            className="category-link"
          >
            Electronics
          </Link>

          <Link
            to="/products?category=Fashion"
            className="category-link"
          >
            Fashion
          </Link>

          <Link
            to="/products?category=Home%20%26%20Kitchen"
            className="category-link"
          >
            Home & Kitchen
          </Link>

          <Link
            to="/products?category=Books"
            className="category-link"
          >
            Books
          </Link>
        </Container>
      </nav>
    </header>
  )
}

export default Navbar