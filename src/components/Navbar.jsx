import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


import '../App.css'
import logo from '../img/logo.png'

function Header() {
  return (
    <Navbar expand="lg" variant='dark' fixed='top' className="header fixed">
      <Container className=''>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Shortify logo"
          />
        </Navbar.Brand>
        <Navbar.Brand href="/">Shortify</Navbar.Brand>
        <Navbar.Toggle aria-controls="" />
        <Navbar.Collapse id="">
          <Nav className="">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/links">Links</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;