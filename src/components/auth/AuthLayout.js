import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import useBreakpoint from '../../hooks/useBreakpoint';

import logoLogin from '../../images/redait-login.png';

const AuthLayout = ({ children }) => {
  const size = useBreakpoint();

  return (
    <Container fluid>
      <Row className="d-lg-flex vh-100">
        <Col
          xs={size === 'sm' || size === 'xs' ? 12 : 6}
          className="d-flex flex-column justify-content-around align-items-center"
        >
          {children}
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

export default AuthLayout;
