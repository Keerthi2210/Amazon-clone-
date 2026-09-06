import { Link } from 'react-router-dom'
import {
  Card,
  Button
} from 'react-bootstrap'

function ProductCard({ product }) {
  return (
    <Card className="h-100 shadow-sm">
      <Link to={`/products/${product.id}`}>
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.name}
        />
      </Link>

      <Card.Body className="d-flex flex-column">
        <Link
          to={`/products/${product.id}`}
          className="text-dark text-decoration-none">
          <Card.Title>
            {product.name}
          </Card.Title>
        </Link>

        <Card.Text className="text-muted">
          {product.category}
        </Card.Text>

        <Card.Text>
          ⭐ {product.rating}
        </Card.Text>

        <h5 className="text-danger">
          ₹{product.price.toLocaleString('en-IN')}
        </h5>

        <Button
          variant={
            product.inStock
              ? 'warning'
              : 'secondary'
          }
          disabled={!product.inStock}
          className="mt-auto"
        >
          {product.inStock
            ? 'Add to Cart'
            : 'Out of Stock'}
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductCard