import { useContext } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Button
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import ProductCard from '../components/ProductCard'
import ProductContext from '../context/ProductContext'

function Home() {
  const navigate = useNavigate()
  const { products } = useContext(ProductContext)

  const featuredProducts = products.slice(0, 4)

  const categories = [
    {
      name: 'Electronics',
      icon: '🎧',
      description:
        'Headphones, watches, gadgets and accessories.'
    },
    {
      name: 'Fashion',
      icon: '👟',
      description:
        'Clothing, footwear and everyday style essentials.'
    },
    {
      name: 'Home & Kitchen',
      icon: '🏠',
      description:
        'Appliances, kitchen tools and home essentials.'
    },
    {
      name: 'Books',
      icon: '📚',
      description:
        'Fiction, education, self-help and much more.'
    }
  ]

  return (
    <>
      <section className="shopnest-hero">
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={7}>
              <div className="hero-badge">
                Everything you need, in one place
              </div>

              <h1 className="hero-title">
                Shop smarter with
                <span> ShopNest.</span>
              </h1>

              <p className="hero-description">
                Discover electronics, fashion,
                home essentials, books and more
                with a simple shopping experience.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <Button
                  variant="warning"
                  size="lg"
                  className="hero-primary-button"
                  onClick={() =>
                    navigate('/products')
                  }
                >
                  Shop Now
                </Button>

                <Button
                  variant="outline-light"
                  size="lg"
                  onClick={() =>
                    navigate('/products')
                  }
                >
                  Browse Products
                </Button>
              </div>

              <div className="hero-benefits">
                <span>✓ Easy checkout</span>
                <span>✓ Secure shopping</span>
                <span>✓ Simple order tracking</span>
              </div>
            </Col>

            <Col lg={5}>
              <div className="hero-showcase">
                <div className="hero-showcase-icon">
                  🛍️
                </div>

                <h3>
                  Your everyday marketplace
                </h3>

                <p>
                  Browse products, add them to
                  your cart and manage your
                  orders easily.
                </p>

                <div className="hero-showcase-stats">
                  <div>
                    <strong>
                      {products.length}+
                    </strong>
                    <span>
                      Products
                    </span>
                  </div>

                  <div>
                    <strong>
                      4
                    </strong>
                    <span>
                      Categories
                    </span>
                  </div>

                  <div>
                    <strong>
                      24/7
                    </strong>
                    <span>
                      Shopping
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="home-section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">
                Explore
              </p>

              <h2>
                Shop by Category
              </h2>
            </div>

            <Button
              variant="link"
              className="section-link"
              onClick={() =>
                navigate('/products')
              }
            >
              View all products →
            </Button>
          </div>

          <Row className="g-4">
            {categories.map((category) => (
              <Col
                key={category.name}
                sm={6}
                lg={3}
              >
                <Card
                  className="category-card h-100"
                  onClick={() =>
                    navigate('/products')
                  }
                >
                  <Card.Body>
                    <div className="category-icon">
                      {category.icon}
                    </div>

                    <Card.Title>
                      {category.name}
                    </Card.Title>

                    <Card.Text>
                      {category.description}
                    </Card.Text>

                    <span className="category-explore">
                      Explore category →
                    </span>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="home-section featured-section">
        <Container>
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">
                Popular picks
              </p>

              <h2>
                Featured Products
              </h2>
            </div>

            <Button
              variant="link"
              className="section-link"
              onClick={() =>
                navigate('/products')
              }
            >
              See everything →
            </Button>
          </div>

          <Row className="g-4">
            {featuredProducts.map(
              (product) => (
                <Col
                  key={product.id}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <ProductCard
                    product={product}
                  />
                </Col>
              )
            )}
          </Row>
        </Container>
      </section>

      <section className="home-section">
        <Container>
          <div className="deal-banner">
            <Row className="align-items-center g-4">
              <Col lg={8}>
                <p className="deal-label">
                  SHOPNEST DEALS
                </p>

                <h2>
                  Discover great products
                  for every part of your day.
                </h2>

                <p>
                  Explore electronics, fashion,
                  home essentials and more from
                  one convenient catalog.
                </p>
              </Col>

              <Col
                lg={4}
                className="text-lg-end"
              >
                <Button
                  variant="warning"
                  size="lg"
                  onClick={() =>
                    navigate('/products')
                  }
                >
                  View Products
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      <section className="home-section pt-0">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <div className="trust-card">
                <span>
                  🔒
                </span>

                <div>
                  <h5>
                    Secure Experience
                  </h5>

                  <p>
                    A simple and reliable
                    checkout flow.
                  </p>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="trust-card">
                <span>
                  📦
                </span>

                <div>
                  <h5>
                    Easy Order Tracking
                  </h5>

                  <p>
                    View your orders from
                    one convenient place.
                  </p>
                </div>
              </div>
            </Col>

            <Col md={4}>
              <div className="trust-card">
                <span>
                  🛒
                </span>

                <div>
                  <h5>
                    Simple Shopping
                  </h5>

                  <p>
                    Browse, add to cart
                    and checkout quickly.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Home