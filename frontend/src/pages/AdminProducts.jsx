import { useContext } from 'react'

import {
  Container,
  Card,
  Table,
  Badge,
  Button
} from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'
import ProductContext from '../context/ProductContext'

function AdminProducts() {
  const navigate = useNavigate()

  const {
    products,
    deleteProduct
  } = useContext(ProductContext)

  return (
    <Container className="py-5">
      <div
        className="
          d-flex
          justify-content-between
          align-items-center
          mb-4
        "
      >
        <h1 className="mb-0">
          Manage Products
        </h1>

        <Button
          variant="warning"
          onClick={() =>
            navigate('/admin/products/add')
          }
        >
          + Add Product
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <div className="table-responsive">
            <Table
              hover
              responsive
              className="align-middle mb-0"
            >
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div
                        className="
                          d-flex
                          align-items-center
                          gap-3
                        "
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'contain'
                          }}
                        />

                        <strong>
                          {product.name}
                        </strong>
                      </div>
                    </td>

                    <td>
                      {product.category}
                    </td>

                    <td>
                      ₹
                      {product.price.toLocaleString(
                        'en-IN'
                      )}
                    </td>

                    <td>
                      ⭐ {product.rating}
                    </td>

                    <td>
                      <Badge
                        bg={
                          product.inStock
                            ? 'success'
                            : 'secondary'
                        }
                      >
                        {product.inStock
                          ? 'In Stock'
                          : 'Out of Stock'}
                      </Badge>
                    </td>

                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() =>
                          navigate(
                            `/admin/products/edit/${product.id}`
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AdminProducts