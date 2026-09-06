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
  const [sortOption, setSortOption] = useState('default')
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
  const sortedProducts = [...filteredProducts]
    if (sortOption === 'price-low-high') {
      sortedProducts.sort((a, b) => a.price - b.price)
    } else if (sortOption === 'price-high-low') {
      sortedProducts.sort((a, b) => b.price - a.price)
    } else if (sortOption === 'rating-high-low') {
      sortedProducts.sort((a, b) => b.rating - a.rating)
    }
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
        <Form.Select
          value={sortOption}
          onChange={(event) => setSortOption(event.target.value)}
          className="mb-4"
        >
          <option value="default">
            Sort by
          </option>

          <option value="price-low-high">
            Price: Low to High
          </option>

          <option value="price-high-low">
            Price: High to Low
          </option>

          <option value="rating-high-low">
            Rating: High to Low
          </option>
        </Form.Select>
      </div>
      <Row className="g-4">
        {sortedProducts.map((product) => (
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