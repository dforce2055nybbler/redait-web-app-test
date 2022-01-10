import React from 'react';
import { Button, Container, Form, FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchFilter = () => {
  return (
    <Container>
      <Form className="d-flex justify-content-center position-relative w-50 m-auto">
        <FaSearch className="icon-search-redait" />
        <FormControl
          type="search"
          placeholder="Buscar..."
          className="me-2 form-redait-home"
          aria-label="Buscar"
        />
        <Button variant="outline-success">Filtros</Button>
      </Form>
    </Container>
  );
};

export default SearchFilter;
