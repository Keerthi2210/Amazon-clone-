import {
  useContext,
  useState
} from 'react'

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import CartContext from '../context/CartContext'

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext)
  const navigate = useNavigate()

  // Calculate final cart price
  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  // Calculate total number of items
  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  )

  // Checkout form data
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [pinCode, setPinCode] = useState('')

  // Default payment method
  const [paymentMethod, setPaymentMethod] =
    useState('Cash on Delivery')
  const [error, setError] = useState('')
  const handlePlaceOrder = () => {
    if (
      !fullName.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !pinCode.trim()
    ) {
      setError('Please fill in all delivery details.')
      return
    }

    if (phone.length !== 10) {
      setError(
        'Please enter a valid 10-digit phone number.'
      )
      return
    }

    if (pinCode.length !== 6) {
      setError(
        'Please enter a valid 6-digit PIN code.'
      )
      return
    }

    setError('')

    clearCart()

    navigate('/')
  }
  return (
    <Container className="py-5">
      <h1 className="mb-4">
        Checkout
      </h1>

      <Row className="g-4">

        {/* LEFT SIDE */}
        <Col lg={8}>

          {/* DELIVERY ADDRESS */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <h4 className="mb-3">
                Delivery Address
              </h4>

              <Form>
                {/* FULL NAME */}
                <Form.Group className="mb-3">
                  <Form.Label>
                    Full Name
                  </Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(event) =>
                      setFullName(event.target.value)
                    }
                  />
                </Form.Group>

                {/* PHONE NUMBER */}
                <Form.Group className="mb-3">
                  <Form.Label>
                    Phone Number
                  </Form.Label>

                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                  />
                </Form.Group>

                {/* ADDRESS */}
                <Form.Group className="mb-3">
                  <Form.Label>
                    Address
                  </Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="House number, street, area"
                    value={address}
                    onChange={(event) =>
                      setAddress(event.target.value)
                    }
                  />
                </Form.Group>

                <Row>
                  {/* CITY */}
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        City
                      </Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(event) =>
                          setCity(event.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>

                  {/* PIN CODE */}
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        PIN Code
                      </Form.Label>

                      <Form.Control
                        type="text"
                        placeholder="Enter PIN code"
                        value={pinCode}
                        onChange={(event) =>
                          setPinCode(event.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>

          {/* PAYMENT METHOD */}
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h4 className="mb-3">
                Payment Method
              </h4>

              <Form.Check
                type="radio"
                name="payment"
                label="Cash on Delivery"
                value="Cash on Delivery"
                checked={
                  paymentMethod ===
                  'Cash on Delivery'
                }
                onChange={(event) =>
                  setPaymentMethod(
                    event.target.value
                  )
                }
              />

              <Form.Check
                type="radio"
                name="payment"
                label="UPI"
                value="UPI"
                checked={
                  paymentMethod === 'UPI'
                }
                onChange={(event) =>
                  setPaymentMethod(
                    event.target.value
                  )
                }
                className="mt-2"
              />

              <Form.Check
                type="radio"
                name="payment"
                label="Credit / Debit Card"
                value="Credit / Debit Card"
                checked={
                  paymentMethod ===
                  'Credit / Debit Card'
                }
                onChange={(event) =>
                  setPaymentMethod(
                    event.target.value
                  )
                }
                className="mt-2"
              />
            </Card.Body>
          </Card>
        </Col>

        {/* RIGHT SIDE */}
        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h4>
                Order Summary
              </h4>

              <hr />

              {cartItems.length === 0 ? (
                <p className="text-muted">
                  Your cart is empty.
                </p>
              ) : (
                <>
                  {/* PRODUCTS */}
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="
                        d-flex
                        justify-content-between
                        mb-3
                      "
                    >
                      <div>
                        <strong>
                          {item.name}
                        </strong>

                        <div className="text-muted">
                          Qty: {item.quantity}
                        </div>
                      </div>

                      <span>
                        ₹
                        {(
                          item.price *
                          item.quantity
                        ).toLocaleString(
                          'en-IN'
                        )}
                      </span>
                    </div>
                  ))}

                  <hr />

                  {/* TOTAL ITEMS */}
                  <div
                    className="
                      d-flex
                      justify-content-between
                      mb-2
                    "
                  >
                    <span>
                      Items
                    </span>

                    <span>
                      {totalItems}
                    </span>
                  </div>

                  {/* TOTAL PRICE */}
                  <div
                    className="
                      d-flex
                      justify-content-between
                      align-items-center
                    "
                  >
                    <h5>
                      Total
                    </h5>

                    <h4 className="text-danger">
                      ₹
                      {cartTotal.toLocaleString(
                        'en-IN'
                      )}
                    </h4>
                  </div>
                  {error && (
                    <Alert variant="danger">
                      {error}
                    </Alert>
                  )}
                  {/* PLACE ORDER */}
                  <Button
                    variant="warning"
                    className="w-100 mt-3"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Checkout