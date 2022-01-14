import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { Button, Container, Navbar } from 'react-bootstrap';
import logo from '../../images/redait-logo.svg';
import { UserContext } from '../../contexts';
import { FaBell, FaCommentDots, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const { user } = useContext(UserContext);

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
            {user.jwt && user.onboarding ? (
              <>
                <Link to="/publish">
                  <Button
                    className="btn-light-main-redait"
                    aria-label="Publicar"
                    style={{ paddingInline: '2rem' }}
                  >
                    Publicar
                  </Button>
                </Link>
                <FaBell color="#fff" size={29} />
                <FaCommentDots color="#fff" size={29} />
                <FaUserCircle color="#fff" size={29} />
              </>
            ) : (
              <>
                <Link to="/register?user=member">
                  <Button
                    className="btn-light-redait"
                    aria-label="Crear Cuenta"
                  >
                    Crear Cuenta
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    className="btn-light-main-redait"
                    aria-label="Iniciar Sesión"
                  >
                    Iniciar Sesión
                  </Button>
                </Link>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
