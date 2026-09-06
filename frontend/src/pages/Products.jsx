import { useState } from 'react'
import {
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap'

import products from '../data/products'
import ProductCard from '../components/ProductCard'

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const filteredProducts =
  selectedCategory === 'All'
    ? products
    : products.filter(
        (product) => product.category === selectedCategory
      )
  return (
    <Container className="py-5">
      <h1 className="mb-4">
        All Products
      </h1>
      <div className="d-flex flex-wrap gap-2 mb-4">
        {['All', 'Electronics', 'Fashion', 'Home & Kitchen'].map(
          (category) => (
            <Button
              key={category}
              variant={
                selectedCategory === category
                  ? 'dark'
                  : 'outline-dark'
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          )
        )}
      </div>
      <Row className="g-4">
        {filteredProducts.map((product) => (
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