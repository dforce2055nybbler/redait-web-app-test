import React, { useContext } from 'react';
import { Link, navigate } from 'gatsby';
import { Button, Container, Navbar } from 'react-bootstrap';
import logo from '../../images/logo-redait-color.png';
import { UserContext } from '../../contexts';
import { FaBell, FaCommentDots } from 'react-icons/fa';
import { setUser } from '../../contexts/actions/user-actions';
import UserMenu from '../menus/UserMenu';
import PostMenu from '../menus/PostMenu';
import NotificationMenu from '../menus/NotificationMenu';

const Header = () => {
  const { user, dispatchUser, defaultUser } = useContext(UserContext);

  const logoutHandler = () => {
    dispatchUser(setUser(defaultUser));
    navigate('/');
  };

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
                <PostMenu />
                <NotificationMenu />
                <FaCommentDots color="#657C97" size={29} />
                <UserMenu logoutHandler={logoutHandler} user={user} />
              </>
            ) : (
              <>
                <Link to="/register?user=member">
                  <Button
                    className="btn-light-redait"
                    aria-label="Crear Cuenta"
                  >
                    Crear cuenta
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    className="btn-light-main-redait"
                    aria-label="Iniciar Sesión"
                  >
                    Ingresar
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
