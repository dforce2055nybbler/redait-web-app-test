import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Hero = ({ title, message }) => {
  const showText = title && message ? true : false
  return (
    <Container fluid>
      <Row
        className="hero-container text-center text-white d-flex flex-column align-items-center justify-content-center">
        <Col lg={9} xs={12} className="header-bg-image">
          {showText &&
            <div className="hero-content">
              <h1>{title}</h1>
              <h3>{message}</h3>
            </div>
          }
        </Col>
      </Row>
    </Container>
  );
};

export default Hero;
