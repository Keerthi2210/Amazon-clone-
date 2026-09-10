import { useContext } from 'react'

import {
  Container,
  Card,
  Table,
  Button,
  Badge
} from 'react-bootstrap'

import {
  Link,
  useNavigate
} from 'react-router-dom'

import ProductContext from '../context/ProductContext'
import NotificationContext from '../context/NotificationContext'

function AdminProducts() {
  const {
    products,
    deleteProduct
  } = useContext(ProductContext)

  const { showNotification } =
    useContext(NotificationContext)

  const navigate = useNavigate()

  const handleDelete = (product) => {
    const shouldDelete =
      window.confirm(
        `Delete "${product.name}" from ShopNest?`
      )

    if (shouldDelete) {
      deleteProduct(product.id)

      showNotification(
        'Product deleted successfully'
      )
    }
  }

  return (
    <div className="admin-page">
      <section className="admin-header">
        <Container>
          <Link
            to="/admin"
            className="admin-back-link"
          >
            ← Admin Dashboard
          </Link>

          <h1>Manage Products</h1>

          <p>
            Add, edit and manage products
            available in your ShopNest catalog.
          </p>
        </Container>
      </section>

      <Container className="py-5">
        <div className="admin-products-toolbar">
          <div>
            <h3>Product Catalog</h3>

            <p>
              {products.length}{' '}
              {products.length === 1
                ? 'product'
                : 'products'}{' '}
              currently available.
            </p>
          </div>

          <Button
            variant="warning"
            onClick={() =>
              navigate(
                '/admin/products/add'
              )
            }
          >
            + Add Product
          </Button>
        </div>

        {products.length === 0 ? (
          <div className="admin-empty-state">
            <div>📦</div>

            <h3>No products yet</h3>

            <p>
              Add your first product to
              the ShopNest catalog.
            </p>

            <Button
              variant="warning"
              onClick={() =>
                navigate(
                  '/admin/products/add'
                )
              }
            >
              Add Product
            </Button>
          </div>
        ) : (
          <Card className="admin-table-card">
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table
                  hover
                  className="admin-products-table mb-0"
                >
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Rating</th>
                      <th>Status</th>
                      <th className="text-end">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {products.map(
                      (product) => (
                        <tr key={product.id}>
                          <td>
                            <div className="admin-product-cell">
                              <div className="admin-product-image">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                />
                              </div>

                              <div>
                                <strong>
                                  {product.name}
                                </strong>

                                <small>
                                  ID: {product.id}
                                </small>
                              </div>
                            </div>
                          </td>

                          <td>
                            {product.category}
                          </td>

                          <td>
                            <strong>
                              ₹
                              {Number(
                                product.price
                              ).toLocaleString(
                                'en-IN'
                              )}
                            </strong>
                          </td>

                          <td>
                            <span className="admin-rating">
                              ★ {product.rating}
                            </span>
                          </td>

                          <td>
                            {product.inStock ? (
                              <Badge bg="success">
                                In Stock
                              </Badge>
                            ) : (
                              <Badge bg="secondary">
                                Out of Stock
                              </Badge>
                            )}
                          </td>

                          <td>
                            <div className="admin-table-actions">
                              <Button
                                variant="outline-dark"
                                size="sm"
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
                                  handleDelete(
                                    product
                                  )
                                }
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  )
}

export default AdminProducts