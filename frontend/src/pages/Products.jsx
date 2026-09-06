import {
  Container,
  Row,
  Col
} from 'react-bootstrap'

import products from '../data/products'
import ProductCard from '../components/ProductCard'

function Products() {
  return (
    <Container className="py-5">
      <h1 className="mb-4">
        All Products
      </h1>

      <Row className="g-4">
        {products.map((product) => (
          <Col
            key={product.id}
            sm={6}
            md={4}
            lg={3}
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Products