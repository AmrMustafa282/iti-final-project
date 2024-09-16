import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, NavLink } from "react-router-dom";

export function MainNavbar() {
 return (
  <>
   <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
     <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
     <Navbar.Toggle aria-controls="basic-navbar-nav" />
     <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
       <NavLink to="/home" className="text-decoration-none text-dark">
        Home
       </NavLink>

       <NavLink to="/products" className="text-decoration-none text-dark">
        Products
       </NavLink>
      </Nav>
     </Navbar.Collapse>
    </Container>
   </Navbar>
  </>
 );
}
