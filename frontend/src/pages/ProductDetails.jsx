import { useParams } from 'react-router-dom'
import {
  Container,
  Row,
  Col,
  Card,
  Button
} from 'react-bootstrap'

import products from '../data/products'

function ProductDetails() {
  const { id } = useParams()
  const product = products.find((item) => item.id === Number(id))

  if (!product) {
    return (
      <Container className="py-5">
        <h2>Product Not Found</h2>
      </Container>
    )
  }
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