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

import {
  Link,
  useNavigate
} from 'react-router-dom'

import CartContext from '../context/CartContext'
import OrderContext from '../context/OrderContext'

function Checkout() {
  const {
    cartItems,
    clearCart
  } = useContext(CartContext)

  const { addOrder } =
    useContext(OrderContext)

  const navigate = useNavigate()

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  )

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  )

  const [fullName, setFullName] =
    useState('')

  const [phone, setPhone] =
    useState('')

  const [address, setAddress] =
    useState('')

  const [city, setCity] =
    useState('')

  const [pinCode, setPinCode] =
    useState('')

  const [
    paymentMethod,
    setPaymentMethod
  ] = useState('Cash on Delivery')

  const [error, setError] =
    useState('')

  const handlePhoneChange = (event) => {
    const value =
      event.target.value.replace(
        /\D/g,
        ''
      )

    setPhone(value.slice(0, 10))
  }

  const handlePinChange = (event) => {
    const value =
      event.target.value.replace(
        /\D/g,
        ''
      )

    setPinCode(value.slice(0, 6))
  }

  const handlePlaceOrder = () => {
    if (
      !fullName.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !pinCode.trim()
    ) {
      setError(
        'Please fill in all delivery details.'
      )
      return
    }

    if (!/^\d{10}$/.test(phone)) {
      setError(
        'Please enter a valid 10-digit phone number.'
      )
      return
    }

    if (!/^\d{6}$/.test(pinCode)) {
      setError(
        'Please enter a valid 6-digit PIN code.'
      )
      return
    }

    if (cartItems.length === 0) {
      setError(
        'Your cart is empty.'
      )
      return
    }

    setError('')

    const newOrder = {
      id: crypto.randomUUID(),

      items: cartItems.map(
        (item) => ({
          ...item
        })
      ),

      total: cartTotal,

      deliveryAddress: {
        fullName,
        phone,
        address,
        city,
        pinCode
      },

      paymentMethod,

      status: 'Order Placed',

      orderDate:
        new Date().toLocaleString()
    }

    addOrder(newOrder)
    clearCart()

    navigate('/order-success')
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <Container className="py-5">
          <div className="checkout-empty-state">
            <div className="checkout-empty-icon">
              🛒
            </div>

            <h2>
              Nothing to checkout
            </h2>

            <p>
              Your cart is currently empty.
              Add some products before
              checking out.
            </p>

            <Button
              variant="warning"
              onClick={() =>
                navigate('/products')
              }
            >
              Browse Products
            </Button>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <section className="checkout-header">
        <Container>
          <Link
            to="/cart"
            className="checkout-back-link"
          >
            ← Back to Cart
          </Link>

          <h1>Checkout</h1>

          <p>
            Complete your delivery and
            payment information.
          </p>
        </Container>
      </section>

      <Container className="py-5">
        <Row className="g-4">
          <Col lg={8}>
            <Card className="checkout-card">
              <Card.Body>
                <div className="checkout-card-heading">
                  <span className="checkout-step">
                    1
                  </span>

                  <div>
                    <h4>
                      Delivery Address
                    </h4>

                    <p>
                      Where should we
                      deliver your order?
                    </p>
                  </div>
                </div>

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      Full Name
                    </Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(event) =>
                        setFullName(
                          event.target.value
                        )
                      }
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Phone Number
                        </Form.Label>

                        <Form.Control
                          type="tel"
                          inputMode="numeric"
                          placeholder="10-digit phone number"
                          value={phone}
                          onChange={
                            handlePhoneChange
                          }
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          PIN Code
                        </Form.Label>

                        <Form.Control
                          type="text"
                          inputMode="numeric"
                          placeholder="6-digit PIN code"
                          value={pinCode}
                          onChange={
                            handlePinChange
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>

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
                        setAddress(
                          event.target.value
                        )
                      }
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>
                      City
                    </Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="Enter city"
                      value={city}
                      onChange={(event) =>
                        setCity(
                          event.target.value
                        )
                      }
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>

            <Card className="checkout-card">
              <Card.Body>
                <div className="checkout-card-heading">
                  <span className="checkout-step">
                    2
                  </span>

                  <div>
                    <h4>
                      Payment Method
                    </h4>

                    <p>
                      Choose how you want
                      to pay.
                    </p>
                  </div>
                </div>

                <div className="payment-options">
                  {[
                    {
                      value:
                        'Cash on Delivery',
                      icon: '💵',
                      description:
                        'Pay when your order arrives'
                    },
                    {
                      value: 'UPI',
                      icon: '📱',
                      description:
                        'Pay using your UPI app'
                    },
                    {
                      value:
                        'Credit / Debit Card',
                      icon: '💳',
                      description:
                        'Pay using your card'
                    }
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`payment-option ${
                        paymentMethod ===
                        method.value
                          ? 'payment-option-selected'
                          : ''
                      }`}
                    >
                      <Form.Check
                        type="radio"
                        name="payment"
                        value={method.value}
                        checked={
                          paymentMethod ===
                          method.value
                        }
                        onChange={(event) =>
                          setPaymentMethod(
                            event.target.value
                          )
                        }
                      />

                      <span className="payment-icon">
                        {method.icon}
                      </span>

                      <span>
                        <strong>
                          {method.value}
                        </strong>

                        <small>
                          {method.description}
                        </small>
                      </span>
                    </label>
                  ))}
                </div>

                <div className="checkout-demo-note">
                  These payment methods are
                  currently frontend UI only.
                  Real payment processing will
                  be connected later.
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="checkout-summary-card">
              <Card.Body>
                <h4>
                  Order Summary
                </h4>

                <div className="checkout-products">
                  {cartItems.map(
                    (item) => (
                      <div
                        key={item.id}
                        className="checkout-product"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                        />

                        <div className="checkout-product-info">
                          <strong>
                            {item.name}
                          </strong>

                          <span>
                            Qty: {item.quantity}
                          </span>
                        </div>

                        <strong>
                          ₹
                          {(
                            item.price *
                            item.quantity
                          ).toLocaleString(
                            'en-IN'
                          )}
                        </strong>
                      </div>
                    )
                  )}
                </div>

                <div className="checkout-summary-divider" />

                <div className="checkout-summary-row">
                  <span>
                    Items ({totalItems})
                  </span>

                  <span>
                    ₹
                    {cartTotal.toLocaleString(
                      'en-IN'
                    )}
                  </span>
                </div>

                <div className="checkout-summary-row">
                  <span>
                    Delivery
                  </span>

                  <span className="checkout-free">
                    FREE
                  </span>
                </div>

                <div className="checkout-summary-divider" />

                <div className="checkout-total">
                  <span>
                    Order Total
                  </span>

                  <strong>
                    ₹
                    {cartTotal.toLocaleString(
                      'en-IN'
                    )}
                  </strong>
                </div>

                {error && (
                  <Alert
                    variant="danger"
                    className="mt-3 mb-0"
                  >
                    {error}
                  </Alert>
                )}

                <Button
                  variant="warning"
                  size="lg"
                  className="w-100 mt-4"
                  onClick={
                    handlePlaceOrder
                  }
                >
                  Place Order
                </Button>

                <p className="checkout-secure-note">
                  This checkout is part of the ShopNest demo experience.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Checkout