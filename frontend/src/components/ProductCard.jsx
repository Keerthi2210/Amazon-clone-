import {
  useContext,
  useState
} from 'react'

import {
  Card,
  Button,
  Badge
} from 'react-bootstrap'

import { Link } from 'react-router-dom'

import CartContext from '../context/CartContext'

function ProductCard({ product }) {
  const { addToCart } =
    useContext(CartContext)

  const [added, setAdded] =
    useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 1200)
  }

  return (
    <Card className="product-card h-100">
      <Link
        to={`/products/${product.id}`}
        className="product-image-wrapper"
      >
        <Card.Img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        {!product.inStock && (
          <Badge
            bg="secondary"
            className="stock-badge"
          >
            Out of Stock
          </Badge>
        )}
      </Link>

      <Card.Body className="product-card-body">
        <div className="product-category">
          {product.category}
        </div>

        <Link
          to={`/products/${product.id}`}
          className="product-title-link"
        >
          <Card.Title className="product-title">
            {product.name}
          </Card.Title>
        </Link>

        <div className="product-rating-row">
          <span className="product-star">
            ★
          </span>

          <span className="product-rating">
            {product.rating}
          </span>

          <span className="product-rating-label">
            rating
          </span>
        </div>

        <div className="product-price">
          ₹
          {product.price.toLocaleString(
            'en-IN'
          )}
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
          className="product-cart-button"
          onClick={handleAddToCart}
        >
          {product.inStock
            ? added
              ? 'Added to Cart ✓'
              : 'Add to Cart'
            : 'Currently Unavailable'}
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard