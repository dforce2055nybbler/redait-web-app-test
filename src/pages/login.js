import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Seo from '../components/seo';

import logoLogin from '../images/redait-login.svg';

const Login = () => {
  return (
    <Container fluid>
      <Seo title="Login" />
      <Row className="d-lg-flex vh-100">
        <Col
          xs={6}
          className="d-flex flex-column justify-content-around align-items-center"
        >
          <h1>¡Bienvenido!</h1>
          <div className="d-grid gap-4 w-25">
            <Button variant="outline-primary">Crear Cuenta</Button>
            <Button variant="outline-primary">Ingresar</Button>
          </div>
          <div className="text-center">
            <h6>¿Tu empresa no está registrada?</h6>
            <h6 style={{ color: '#FF5C40' }}>Ingresá como invitado</h6>
          </div>
        </Col>
        <Col xs={6} className="d-none d-md-flex p-3">
          <div className="login-redait vw-100 d-flex align-items-center justify-content-center">
            <img src={logoLogin} alt="RedAIT Logo" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
