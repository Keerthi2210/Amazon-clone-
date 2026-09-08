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

import { useNavigate } from 'react-router-dom'
import ProductContext from '../context/ProductContext'

function AddProduct() {
  const { addProduct } = useContext(ProductContext)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [rating, setRating] = useState('')
  const [image, setImage] = useState('')
  const [inStock, setInStock] = useState(true)

  const handleSubmit = (event) => {
    event.preventDefault()

    const newProduct = {
      id: Date.now(),
      name,
      category,
      price: Number(price),
      rating: Number(rating),
      image,
      inStock
    }

    addProduct(newProduct)

    navigate('/admin/products')
  }

  return (
    <Container className="py-5">
      <Card
        className="shadow-sm mx-auto"
        style={{
          maxWidth: '750px'
        }}
      >
        <Card.Body className="p-4">
          <h2 className="mb-4">
            Add Product
          </h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                Product Name
              </Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                required
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Category
                  </Form.Label>

                  <Form.Select
                    value={category}
                    onChange={(event) =>
                      setCategory(event.target.value)
                    }
                    required
                  >
                    <option value="">
                      Select category
                    </option>

                    <option value="Electronics">
                      Electronics
                    </option>

                    <option value="Fashion">
                      Fashion
                    </option>

                    <option value="Home & Kitchen">
                      Home & Kitchen
                    </option>

                    <option value="Books">
                      Books
                    </option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Price
                  </Form.Label>

                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(event) =>
                      setPrice(event.target.value)
                    }
                    min="0"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Rating
                  </Form.Label>

                  <Form.Control
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="Example: 4.5"
                    value={rating}
                    onChange={(event) =>
                      setRating(event.target.value)
                    }
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Stock Status
                  </Form.Label>

                  <Form.Select
                    value={inStock ? 'true' : 'false'}
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

            <Form.Group className="mb-4">
              <Form.Label>
                Product Image URL
              </Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter product image URL"
                value={image}
                onChange={(event) =>
                  setImage(event.target.value)
                }
                required
              />
            </Form.Group>

            <Button
              variant="warning"
              type="submit"
              className="w-100"
            >
              Add Product
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AddProduct