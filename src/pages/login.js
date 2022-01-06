import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Seo from '../components/seo';

import logoLogin from '../images/redait-login.svg';

const Login = () => {
  return (
    <Container fluid>
      <Seo title="Login" />
      <Row className="d-lg-flex vh-100">
        <Col xs={6}>login</Col>
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
