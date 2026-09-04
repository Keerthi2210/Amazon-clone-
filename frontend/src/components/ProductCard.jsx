import {
  Card,
  Button
} from 'react-bootstrap'

function ProductCard({ product }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>
          {product.name}
        </Card.Title>

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