import { useState } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Form
} from 'react-bootstrap'

import products from '../data/products'
import ProductCard from '../components/ProductCard'

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      product.category === selectedCategory

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

    return matchesCategory && matchesSearch
  })
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
              onClick={() => setSelectedCategory(category)}>
              {category}
            </Button>
          )
        )}
        <Form.Control
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="mb-4"
        />
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