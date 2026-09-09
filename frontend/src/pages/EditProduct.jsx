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
  useNavigate,
  useParams
} from 'react-router-dom'

import ProductContext from '../context/ProductContext'

function EditProduct() {
  const {
    products,
    updateProduct
  } = useContext(ProductContext)

  const navigate = useNavigate()
  const { id } = useParams()

  const product = products.find(
    (item) => item.id === Number(id)
  )

  const [name, setName] =
    useState(product?.name || '')

  const [category, setCategory] =
    useState(product?.category || '')

  const [price, setPrice] =
    useState(product?.price || '')

  const [rating, setRating] =
    useState(product?.rating || '')

  const [image, setImage] =
    useState(product?.image || '')

  const [inStock, setInStock] =
    useState(product?.inStock ?? true)

  if (!product) {
    return (
      <Container className="py-5">
        <Card className="shadow-sm">
          <Card.Body>
            <h3>Product not found</h3>
          </Card.Body>
        </Card>
      </Container>
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const updatedProduct = {
      id: product.id,
      name,
      category,
      price: Number(price),
      rating: Number(rating),
      image,
      inStock
    }

    updateProduct(updatedProduct)

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
            Edit Product
          </h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>
                Product Name
              </Form.Label>

              <Form.Control
                type="text"
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
                    value={price}
                    min="0"
                    onChange={(event) =>
                      setPrice(event.target.value)
                    }
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
                    value={
                      inStock ? 'true' : 'false'
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

            <Form.Group className="mb-4">
              <Form.Label>
                Product Image URL
              </Form.Label>

              <Form.Control
                type="text"
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
              Save Changes
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default EditProduct