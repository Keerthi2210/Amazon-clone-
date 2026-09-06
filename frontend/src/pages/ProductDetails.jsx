import {
  Container,
  Row,
  Col,
  Card,
  Button
} from 'react-bootstrap'

import products from '../data/products'

function ProductDetails() {
  const product = products[0]

  return (
    <Container className="py-5">
      <Row className="g-5">
        <Col md={6}>
          <Card>
            <Card.Img
              src={product.image}
              alt={product.name}
            />
          </Card>
        </Col>

        <Col md={6}>
          <h2>{product.name}</h2>

          <p className="text-muted">
            {product.category}
          </p>

          <p>⭐ {product.rating}</p>

          <h3 className="text-danger">
            ₹{product.price.toLocaleString('en-IN')}
          </h3>

          <p className="mt-3">
            {product.inStock
              ? 'In Stock'
              : 'Currently unavailable'}
          </p>

          <Button
            variant={
              product.inStock
                ? 'warning'
                : 'secondary'
            }
            disabled={!product.inStock}
          >
            {product.inStock
              ? 'Add to Cart'
              : 'Out of Stock'}
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetails