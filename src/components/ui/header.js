import React from 'react';
import { Link } from 'gatsby';
import { Button, Container, Navbar } from 'react-bootstrap';
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
            <Link to="/login">
              <Button className="btn-light-redait" aria-label="Crear Cuenta">
                Crear Cuenta
              </Button>
            </Link>
            <Link to="/login">
              <Button className="btn-light-redait" aria-label="Iniciar Sesión">
                Iniciar Sesión
              </Button>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
