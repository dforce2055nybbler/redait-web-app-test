import React from 'react';
import { Container, Row } from 'react-bootstrap';

const Hero = ({ title, message }) => {
  return (
    <Container fluid>
      <Row className="text-center text-white d-flex flex-column align-items-center justify-content-center hero-redait">
        <h1>{ title }</h1>
        <h3>{ message }</h3>
      </Row>
    </Container>
  );
};

export default Hero;
