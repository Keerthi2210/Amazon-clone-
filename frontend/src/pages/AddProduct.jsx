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
  useNavigate
} from 'react-router-dom'

import ProductContext from '../context/ProductContext'
import NotificationContext from '../context/NotificationContext'

function AddProduct() {
  const { addProduct } =
    useContext(ProductContext)

  const { showNotification } =
    useContext(NotificationContext)

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [category, setCategory] =
    useState('Electronics')
  const [price, setPrice] = useState('')
  const [rating, setRating] = useState('')
  const [image, setImage] = useState('')
  const [inStock, setInStock] =
    useState(true)

  const handleSubmit = (event) => {
    event.preventDefault()

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      category,
      price: Number(price),
      rating: Number(rating),
      image:
        image.trim() ||
        'https://placehold.co/300x250?text=ShopNest+Product',
      inStock
    }

    addProduct(newProduct)

    showNotification(
      'Product added successfully'
    )

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

          <h1>Add Product</h1>

          <p>
            Add a new product to the
            ShopNest catalog.
          </p>
        </Container>
      </section>

      <Container className="py-5">
        <Card className="admin-form-card">
          <Card.Body>
            <div className="admin-form-heading">
              <h3>Product Information</h3>

              <p>
                Enter the information that
                customers will see in the store.
              </p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>
                  Product Name
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Example: Wireless Keyboard"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
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
                          event.target.value === 'true'
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
                      placeholder="2499"
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
                      placeholder="4.5"
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
                  placeholder="https://example.com/product.jpg"
                  value={image}
                  onChange={(event) =>
                    setImage(
                      event.target.value
                    )
                  }
                />

                <Form.Text>
                  Leave this blank to use a
                  placeholder product image.
                </Form.Text>
              </Form.Group>

              <div className="admin-form-actions">
                <Button
                  type="submit"
                  variant="warning"
                >
                  Add Product
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

export default AddProduct