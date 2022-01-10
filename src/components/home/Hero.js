import React from 'react';
import { Container, Row } from 'react-bootstrap';

const Hero = () => {
  return (
    <Container fluid>
      <Row className="text-center text-white d-flex flex-column align-items-center justify-content-center hero-redait">
        <h1>Oportunidades</h1>
        <h3>
          Descubre todas las opotunidades de proyectos y perfiles que ofrecen
          las diferentes empresas del sector.
        </h3>
      </Row>
    </Container>
  );
};

export default Hero;
