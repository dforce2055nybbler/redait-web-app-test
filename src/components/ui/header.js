import React from 'react';
import { Link } from 'gatsby';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../../images/redait-logo.svg';

const Header = () => {
  return (
    <>
      <Navbar bg="redait" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img
                src={logo}
                width={150}
                className="m-auto"
                alt="RedAIT Logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Button variant="light">Crear Cuenta</Button>
            <Button variant="light">Iniciar Sesión</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
