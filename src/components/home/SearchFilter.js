import React, { useState } from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  Badge,
  InputGroup,
} from 'react-bootstrap';
import { FaSearch, FaSlidersH } from 'react-icons/fa';

const SearchFilter = () => {
  const [btnFilter, setBtnFilter] = useState(false);
  const [filters, setFilters] = useState({
    services: {
      name: 'services',
      realName: 'Servicios',
      active: false,
    },
    products: {
      name: 'products',
      realName: 'Productos',
      active: false,
    },
    talent: {
      name: 'talent',
      realName: 'Talento',
      active: false,
    },
    partnership: {
      name: 'partnership',
      realName: 'Partnership',
      active: false,
    },
  });

  const filterHandle = filter => {
    setFilters({
      ...filters,
      [filter.name]: {
        ...filter,
        active: !filter.active,
      },
    });
  };

  return (
    <Container style={{ marginTop: '-1.5rem' }}>
      <Form className="d-flex justify-content-center w-50 m-auto">
        <InputGroup style={{ flexWrap: 'nowrap' }}>
          <InputGroup.Text
            style={{ backgroundColor: '#fff', borderRightColor: 'transparent' }}
          >
            <FaSearch />{' '}
          </InputGroup.Text>
          <FormControl
            type="search"
            placeholder="Buscar..."
            className={`me-2 search-redait-home ${
              btnFilter ? `search-border-redait` : ''
            }`}
            aria-label="Buscar"
          />
        </InputGroup>
        {!btnFilter ? (
          <Button
            variant="light"
            className="btn-filter-redait"
            aria-label="Filtros"
            onClick={() => setBtnFilter(true)}
          >
            <FaSlidersH
              style={{ width: '1.313rem', height: '1.313rem', color: '#000' }}
            />
            Filtros
          </Button>
        ) : (
          <div className="list-filter-redait">
            {Object.keys(filters).map(f => (
              <Badge
                key={f}
                pill
                bg={`${filters[f].active ? 'dark' : 'light'}`}
                text={`${filters[f].active ? 'light' : 'dark'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => filterHandle(filters[f])}
              >
                {filters[f].realName}
              </Badge>
            ))}
          </div>
        )}
      </Form>
    </Container>
  );
};

export default SearchFilter;
