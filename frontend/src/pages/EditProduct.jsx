import {
  useContext,
  useState
} from 'react'

import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col
} from 'react-bootstrap'

import {
  Link,
  useNavigate,
  useParams
} from 'react-router-dom'

import ProductContext from '../context/ProductContext'

function EditProduct() {
  const { id } = useParams()

  const {
    products,
    updateProduct
  } = useContext(ProductContext)

  const navigate = useNavigate()

  const product = products.find(
    (item) =>
      item.id === Number(id)
  )

  const [name, setName] =
    useState(product?.name || '')

  const [category, setCategory] =
    useState(
      product?.category ||
        'Electronics'
    )

  const [price, setPrice] =
    useState(product?.price || '')

  const [rating, setRating] =
    useState(product?.rating || '')

  const [image, setImage] =
    useState(product?.image || '')

  const [inStock, setInStock] =
    useState(
      product?.inStock ?? true
    )

  if (!product) {
    return (
      <div className="admin-page">
        <Container className="py-5">
          <div className="admin-empty-state">
            <div>📦</div>

            <h3>
              Product not found
            </h3>

            <p>
              This product may have been
              removed from the catalog.
            </p>

            <Button
              variant="warning"
              onClick={() =>
                navigate(
                  '/admin/products'
                )
              }
            >
              Back to Products
            </Button>
          </div>
        </Container>
      </div>
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const updatedProduct = {
      ...product,
      name: name.trim(),
      category,
      price: Number(price),
      rating: Number(rating),
      image:
        image.trim() ||
        'https://placehold.co/300x250?text=ShopNest+Product',
      inStock
    }

    updateProduct(updatedProduct)

    navigate('/admin/products')
  }

  return (
    <div className="admin-page">
      <section className="admin-header">
        <Container>
          <Link
            to="/admin/products"
            className="admin-back-link"
          >
            ← Manage Products
          </Link>

          <h1>Edit Product</h1>

          <p>
            Update product information
            displayed in the ShopNest store.
          </p>
        </Container>
      </section>

      <Container className="py-5">
        <Card className="admin-form-card">
          <Card.Body>
            <div className="admin-form-heading">
              <h3>
                Edit Product Information
              </h3>

              <p>
                Updating this form will
                update the product throughout
                the current frontend store.
              </p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>
                  Product Name
                </Form.Label>

                <Form.Control
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                  required
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>
                      Category
                    </Form.Label>

                    <Form.Select
                      value={category}
                      onChange={(event) =>
                        setCategory(
                          event.target.value
                        )
                      }
                    >
                      <option>
                        Electronics
                      </option>

                      <option>
                        Fashion
                      </option>

                      <option>
                        Home & Kitchen
                      </option>

                      <option>
                        Books
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>
                      Stock Status
                    </Form.Label>

                    <Form.Select
                      value={
                        inStock
                          ? 'true'
                          : 'false'
                      }
                      onChange={(event) =>
                        setInStock(
                          event.target.value ===
                            'true'
                        )
                      }
                    >
                      <option value="true">
                        In Stock
                      </option>

                      <option value="false">
                        Out of Stock
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>
                      Price (₹)
                    </Form.Label>

                    <Form.Control
                      type="number"
                      min="1"
                      value={price}
                      onChange={(event) =>
                        setPrice(
                          event.target.value
                        )
                      }
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>
                      Rating
                    </Form.Label>

                    <Form.Control
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={rating}
                      onChange={(event) =>
                        setRating(
                          event.target.value
                        )
                      }
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label>
                  Product Image URL
                </Form.Label>

                <Form.Control
                  type="url"
                  value={image}
                  onChange={(event) =>
                    setImage(
                      event.target.value
                    )
                  }
                />
              </Form.Group>

              <div className="admin-form-actions">
                <Button
                  type="submit"
                  variant="warning"
                >
                  Save Changes
                </Button>

                <Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() =>
                    navigate(
                      '/admin/products'
                    )
                  }
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default EditProduct