import {
  useContext,
  useState
} from 'react'

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card
} from 'react-bootstrap'

import ProductContext from '../context/ProductContext'
import ProductCard from '../components/ProductCard'

function Products() {
  const { products } =
    useContext(ProductContext)

  const [selectedCategory, setSelectedCategory] =
    useState('All')

  const [searchTerm, setSearchTerm] =
    useState('')

  const [sortOption, setSortOption] =
    useState('default')

  const [priceFilter, setPriceFilter] =
    useState('all')

  const categories = [
    'All',
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Books'
  ]

  const filteredProducts =
    products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        product.category ===
          selectedCategory

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )

      let matchesPrice = true

      if (
        priceFilter === 'under-2500'
      ) {
        matchesPrice =
          product.price < 2500
      } else if (
        priceFilter === '2500-3000'
      ) {
        matchesPrice =
          product.price >= 2500 &&
          product.price <= 3000
      } else if (
        priceFilter === 'above-3000'
      ) {
        matchesPrice =
          product.price > 3000
      }

      return (
        matchesCategory &&
        matchesSearch &&
        matchesPrice
      )
    })

  const sortedProducts = [
    ...filteredProducts
  ]

  if (
    sortOption ===
    'price-low-high'
  ) {
    sortedProducts.sort(
      (a, b) =>
        a.price - b.price
    )
  } else if (
    sortOption ===
    'price-high-low'
  ) {
    sortedProducts.sort(
      (a, b) =>
        b.price - a.price
    )
  } else if (
    sortOption ===
    'rating-high-low'
  ) {
    sortedProducts.sort(
      (a, b) =>
        b.rating - a.rating
    )
  }

  const resetFilters = () => {
    setSelectedCategory('All')
    setSearchTerm('')
    setSortOption('default')
    setPriceFilter('all')
  }

  return (
    <div className="products-page">
      <section className="products-header">
        <Container>
          <p className="section-eyebrow mb-2">
            ShopNest Catalog
          </p>

          <h1>
            Explore Products
          </h1>

          <p>
            Browse products by category,
            price, rating and more.
          </p>
        </Container>
      </section>

      <Container className="py-5">
        <Card className="product-filter-card">
          <Card.Body>
            <div className="product-filter-top">
              <div>
                <h5>
                  Find what you need
                </h5>

                <p>
                  Search or filter the
                  catalog below.
                </p>
              </div>

              <span className="product-result-count">
                {
                  sortedProducts.length
                }{' '}
                product
                {sortedProducts.length !==
                1
                  ? 's'
                  : ''}
              </span>
            </div>

            <Form.Control
              type="search"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value
                )
              }
              className="product-search-input"
            />

            <div className="product-category-buttons">
              {categories.map(
                (category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory ===
                      category
                        ? 'dark'
                        : 'outline-dark'
                    }
                    onClick={() =>
                      setSelectedCategory(
                        category
                      )
                    }
                  >
                    {category}
                  </Button>
                )
              )}
            </div>

            <Row className="g-3 mt-1">
              <Col lg={5}>
                <Form.Select
                  value={sortOption}
                  onChange={(event) =>
                    setSortOption(
                      event.target.value
                    )
                  }
                >
                  <option value="default">
                    Sort products
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
              </Col>

              <Col lg={5}>
                <Form.Select
                  value={priceFilter}
                  onChange={(event) =>
                    setPriceFilter(
                      event.target.value
                    )
                  }
                >
                  <option value="all">
                    All price ranges
                  </option>

                  <option value="under-2500">
                    Under ₹2,500
                  </option>

                  <option value="2500-3000">
                    ₹2,500 - ₹3,000
                  </option>

                  <option value="above-3000">
                    Above ₹3,000
                  </option>
                </Form.Select>
              </Col>

              <Col lg={2}>
                <Button
                  variant="outline-secondary"
                  className="w-100"
                  onClick={
                    resetFilters
                  }
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {sortedProducts.length ===
        0 ? (
          <div className="product-empty-state">
            <div className="product-empty-icon">
              🔎
            </div>

            <h3>
              No products found
            </h3>

            <p>
              Try another search term
              or change your filters.
            </p>

            <Button
              variant="warning"
              onClick={
                resetFilters
              }
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <Row className="g-4 mt-1">
            {sortedProducts.map(
              (product) => (
                <Col
                  key={product.id}
                  sm={6}
                  md={4}
                  lg={3}
                >
                  <ProductCard
                    product={product}
                  />
                </Col>
              )
            )}
          </Row>
        )}
      </Container>
    </div>
  )
}

export default Products