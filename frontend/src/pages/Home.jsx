import ProductCard from '../components/ProductCard'
import products from '../data/products'
import {
  Container,
  Row,
  Col,
  Card,
  Button
} from 'react-bootstrap'

function Home() {
  return (
    <>
      <section className="bg-primary text-white py-5">
            <Container className="text-center">
            <h1 className="display-5 fw-bold">
                Welcome to ShopNest
            </h1>

            <p className="lead mt-3">
                Discover electronics, fashion, home essentials,
                books and more — all in one place.
            </p>

            <Button
                variant="warning"
                size="lg"
                className="mt-3"
            >
                Shop Now
            </Button>
            </Container>
      </section>

      <section className="py-5">
            <Container>
            <h2 className="mb-4">
                Shop by Category
            </h2>

            <Row className="g-4">
                <Col md={3}>
                <Card className="h-100 shadow-sm">
                    <Card.Body>
                    <Card.Title>
                        Electronics
                    </Card.Title>

                    <Card.Text>
                        Phones, laptops, headphones and accessories.
                    </Card.Text>

                    <Button variant="warning">
                        Explore
                    </Button>
                    </Card.Body>
                </Card>
                </Col>

                <Col md={3}>
                <Card className="h-100 shadow-sm">
                    <Card.Body>
                    <Card.Title>
                        Fashion
                    </Card.Title>

                    <Card.Text>
                        Clothing, footwear and accessories.
                    </Card.Text>

                    <Button variant="warning">
                        Explore
                    </Button>
                    </Card.Body>
                </Card>
                </Col>

                <Col md={3}>
                <Card className="h-100 shadow-sm">
                    <Card.Body>
                    <Card.Title>
                        Home & Kitchen
                    </Card.Title>

                    <Card.Text>
                        Appliances, furniture and home essentials.
                    </Card.Text>

                    <Button variant="warning">
                        Explore
                    </Button>
                    </Card.Body>
                </Card>
                </Col>

                <Col md={3}>
                <Card className="h-100 shadow-sm">
                    <Card.Body>
                    <Card.Title>
                        Books
                    </Card.Title>

                    <Card.Text>
                        Fiction, education, self-help and more.
                    </Card.Text>

                    <Button variant="warning">
                        Explore
                    </Button>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            </Container>
      </section>
      <section className="pb-5">
            <Container>
                <h2 className="mb-4">
                Featured Products
                </h2>
                <Row className="g-4">
                {products.map((product) => (
                <Col key={product.id} md={3}>
                    <ProductCard product={product} />
                </Col>
                ))} 
                </Row>
            </Container>
        </section>
        <section className="pb-5">
            <Container>
                <div className="bg-dark text-white rounded p-5 text-center">
                <h2 className="fw-bold">
                    Special Deals Just for You
                </h2>

                <p className="lead mt-3">
                    Save more on selected electronics, fashion,
                    home essentials and more.
                </p>

                <Button
                    variant="warning"
                    size="lg"
                    className="mt-2"
                >
                    View Deals
                </Button>
                </div>
            </Container>
        </section>
    </>
  )
}

export default Home