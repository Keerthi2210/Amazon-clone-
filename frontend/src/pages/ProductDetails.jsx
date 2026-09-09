import {
  useContext,
  useState
} from 'react'

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge
} from 'react-bootstrap'

import {
  Link,
  useParams
} from 'react-router-dom'

import ProductContext from '../context/ProductContext'
import CartContext from '../context/CartContext'

function ProductDetails() {
  const { id } = useParams()

  const { products } =
    useContext(ProductContext)

  const { addToCart } =
    useContext(CartContext)

  const [added, setAdded] =
    useState(false)

  const product = products.find(
    (item) =>
      item.id === Number(id)
  )

  const handleAddToCart = () => {
    addToCart(product)

    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 1200)
  }

  if (!product) {
    return (
      <Container className="py-5">
        <div className="product-not-found">
          <div className="product-not-found-icon">
            📦
          </div>

          <h2>
            Product Not Found
          </h2>

          <p>
            The product you are looking
            for may no longer be available.
          </p>

          <Button
            as={Link}
            to="/products"
            variant="warning"
          >
            Back to Products
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <div className="product-details-page">
      <Container className="py-5">
        <div className="product-details-breadcrumb">
          <Link to="/">
            Home
          </Link>

          <span>›</span>

          <Link to="/products">
            Products
          </Link>

          <span>›</span>

          <span>
            {product.name}
          </span>
        </div>

        <Row className="g-5 align-items-start">
          <Col lg={6}>
            <Card className="product-details-image-card">
              <div className="product-details-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-details-image"
                />
              </div>
            </Card>
          </Col>

          <Col lg={6}>
            <div className="product-details-content">
              <p className="product-details-category">
                {product.category}
              </p>

              <h1>
                {product.name}
              </h1>

              <div className="product-details-rating">
                <span className="product-details-star">
                  ★
                </span>

                <strong>
                  {product.rating}
                </strong>

                <span>
                  customer rating
                </span>
              </div>

              <div className="product-details-price">
                ₹
                {product.price.toLocaleString(
                  'en-IN'
                )}
              </div>

              <div className="product-details-divider" />

              <div className="product-details-stock">
                {product.inStock ? (
                  <Badge bg="success">
                    In Stock
                  </Badge>
                ) : (
                  <Badge bg="secondary">
                    Currently Unavailable
                  </Badge>
                )}
              </div>

              <p className="product-details-description">
                A quality product from our
                {` ${product.category} `}
                collection. Add it to your
                cart and continue shopping
                through ShopNest.
              </p>

              <div className="product-details-features">
                <div>
                  <span>✓</span>
                  Easy checkout
                </div>

                <div>
                  <span>✓</span>
                  Order tracking
                </div>

                <div>
                  <span>✓</span>
                  Secure shopping
                </div>
              </div>

              <Button
                variant={
                  product.inStock
                    ? added
                      ? 'success'
                      : 'warning'
                    : 'secondary'
                }
                disabled={!product.inStock}
                size="lg"
                className="product-details-cart-button"
                onClick={handleAddToCart}
              >
                {product.inStock
                  ? added
                    ? 'Added to Cart ✓'
                    : 'Add to Cart'
                  : 'Out of Stock'}
              </Button>

              <Button
                as={Link}
                to="/products"
                variant="outline-dark"
                size="lg"
                className="product-details-back-button"
              >
                Continue Shopping
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ProductDetails