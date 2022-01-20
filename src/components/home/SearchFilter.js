import React, { useState } from 'react';
import {
  Button,
  Container,
  Form,
  FormControl,
  Badge,
  InputGroup,
  Row,
  Col,
} from 'react-bootstrap';
import Select from 'react-select';
import { FaSearch, FaSlidersH } from 'react-icons/fa';
import { formatDataSelect } from '../../helpers/formatDataSelect';
import { graphql, useStaticQuery } from 'gatsby';

const SearchFilter = () => {
  const [btnFilter, setBtnFilter] = useState(false);
  const [selectFilter, setSelectFilter] = useState({});
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

  const data = useStaticQuery(graphql`
    query FiltersQuery {
      allStrapiMarkets {
        edges {
          node {
            name
            strapiId
          }
        }
      }
      allStrapiTechnologies {
        edges {
          node {
            name
            strapiId
          }
        }
      }
      allStrapiCompanies {
        edges {
          node {
            name
            strapiId
          }
        }
      }
      allStrapiVerticals {
        edges {
          node {
            name
            strapiId
          }
        }
      }
      allStrapiProgrammingLangs {
        edges {
          node {
            name
            strapiId
          }
        }
      }
    }
  `);

  const optionsMarkets = formatDataSelect(
    data.allStrapiMarkets.edges,
    'strapiId',
    'name'
  );

  const optionsTechnologies = formatDataSelect(
    data.allStrapiTechnologies.edges,
    'strapiId',
    'name'
  );

  const optionsCompanies = formatDataSelect(
    data.allStrapiCompanies.edges,
    'strapiId',
    'name'
  );

  const optionsVerticals = formatDataSelect(
    data.allStrapiVerticals.edges,
    'strapiId',
    'name'
  );

  const optionsProgrammingLangs = formatDataSelect(
    data.allStrapiProgrammingLangs.edges,
    'strapiId',
    'name'
  );

  const filtersOptions = [
    {
      data: optionsMarkets,
      name: 'Mercados',
      value: 'markets',
    },
    {
      data: optionsTechnologies,
      name: 'Tecnologías',
      value: 'technologies',
    },
    {
      data: optionsCompanies,
      name: 'Empresas',
      value: 'companies',
    },
    {
      data: optionsVerticals,
      name: 'Verticales de la industria',
      value: 'verticals',
    },
    {
      data: optionsProgrammingLangs,
      name: 'Lenguajes de programación',
      value: 'programming-langs',
    },
  ];

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
      {btnFilter && (
        <Row
          className="justify-content-between"
          style={{ marginTop: '2.25rem' }}
        >
          {filtersOptions.map(filter => (
            <Col key={filter.value} sm={12} md={6} lg={2}>
              <Select
                key={filter.value}
                className="basic-single filter-home-redait"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                placeholder={filter.name}
                name={filter.value}
                options={filter.data}
                onChange={e =>
                  setSelectFilter({
                    ...selectFilter,
                    [filter.value]: (e && e.value) || '',
                  })
                }
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SearchFilter;
