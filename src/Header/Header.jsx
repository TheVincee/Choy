import { Navbar, Nav, Container, Button } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="dark" expand="lg" className="border-bottom border-light shadow-lg">
      <Container>
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <span className="text-2xl font-bold text-gradient bg-gradient-to-r from-light to-gray-500 text-shadow-sm">
            Anton-POS
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="text-light hover-simple-dynamic-color">Inventory</Nav.Link>
            <Nav.Link href="/Dashboard" className="text-light hover-simple-dynamic-color">Dashboard</Nav.Link>
            <Nav.Link href="/History" className="text-light hover-simple-dynamic-color">History</Nav.Link>
          </Nav>
          <Nav className="d-flex align-items-center">
            <Button
              variant="outline-light"
              className="me-3 btn-glow-simple"
              href="#"
            >
              Log in
            </Button>
            <Button variant="light" className="btn-glow-simple" href="#">
              Get started
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
