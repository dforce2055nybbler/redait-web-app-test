import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Container,
  Badge,
  InputGroup,
  Row,
  Col,
  Card
} from 'react-bootstrap';
import { FaSlidersH } from 'react-icons/fa';
import SearchAutocomplete from './SearchAutocomplete'
import Select from 'react-select';
import { formatDataSelect } from '../../helpers/formatDataSelect';
import { graphql, useStaticQuery } from 'gatsby';

import { SearchContext } from '../../contexts/wrappers/SearchContext';

const SearchFilter = ({ mainFilterParameter, cleanParams }) => {
  const { state, actions } = useContext(SearchContext)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [opportunitiesTypes, setOpportunitiesTypes] = useState([]);
  const [opportunityTypeSelect, setOpportunityTypeSelect] = useState('');
  const [btnFilter, setBtnFilter] = useState(false);
  const [auxFilters, setAuxFilters] = useState({});
  const [filters, setFilters] = useState({
    productsandservices: {
      name: 'productsandservices',
      realName: 'Productos/Servicios',
      active: false,
    },
    opportunities: {
      name: 'opportunities',
      realName: 'Oportunidades',
      active: false,
    },
    talents: {
      name: 'talents',
      realName: 'Talento',
      active: false,
    },
    partnerships: {
      name: 'partnerships',
      realName: 'Partnerships',
      active: false,
    },
    events: {
      name: 'events',
      realName: 'Eventos',
      active: false,
    },
  });

  const getFilterByRealName = (name) => {
    if (name) {
      let result = null

      if (name.toLocaleLowerCase().includes('producto') || name.toLocaleLowerCase().includes('servicio'))
        return filters['productsandservices']
      
      if (name.toLocaleLowerCase().includes('talent'))
        return filters['talents']

      if (name.toLocaleLowerCase().includes('partnership'))
        return filters['partnerships']

      for (const filter in filters) {
        if (filters[filter].realName === name)
          result = filters[filter]
      }

      return result
    }
    return null
  }
  const filterHandle = filter => {
    for (const filtro in filters) {
      filters[filtro].active = false
    }
    setFilters({
      ...filters,
      [filter.name]: {
        ...filter,
        active: !filter.active,
      },
    });
    actions.dispatchFilters({
      type: 'SET_MAIN_FILTER',
      filter: filters[filter.name]
    })
    setBtnFilter(true)
  };

  const auxFiltersHandle = (filterSelected, filter) => {
    const newFilter = { [filter.value]: filterSelected }
    setAuxFilters({ ...auxFilters, ...newFilter })

    actions.dispatchFilters({
      type: 'SET_AUX_FILTERS',
      auxFilters: { ...auxFilters, ...newFilter }
    })
  }

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
      allStrapiTypesOpportunites {
        edges {
          node {
            strapiId
            name
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

  const optionsOpportunitiesTypes = formatDataSelect(
    data.allStrapiTypesOpportunites.edges,
    'strapiId',
    'name'
  );

  useEffect(() => {
    if (optionsOpportunitiesTypes && !btnFilter) {
      setOpportunitiesTypes(optionsOpportunitiesTypes)
    }
    if (mainFilterParameter) {
      const filter = getFilterByRealName(mainFilterParameter)
      if (filter) {
        filterHandle(filter)
      }
    }
  }, [data]);
  useEffect(() => {
    if (btnFilter) {
      setOpportunitiesTypes([])
    }
  }, [btnFilter]);
  

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


  const search = (e, paramText) => {
    const text = e.target.value
    
    if (e.key === 'Enter' && text) {
      cleanParams()
      actions.dispatchSearch({
        type: 'ADD_SEARCH',
        text: text
      })
      getResults(text)
      setOpen(false)
    } 
    if (e.type === 'click' && searchText.length >= 3) {
      cleanParams()
      actions.dispatchSearch({
        type: 'ADD_SEARCH',
        text: searchText
      })
      getResults(searchText)
      setOpen(false)
    }
    if (paramText && paramText.length >= 3) {
      console.log('anda a buscar esto => ', paramText)
      cleanParams()
      actions.dispatchSearch({
        type: 'ADD_SEARCH',
        text: paramText
      })
      getResults(paramText)
    }

  }

  const autocompleteHandle = (event, value) => {
    if (!value && !btnFilter)
      setOpportunitiesTypes(optionsOpportunitiesTypes)
    
    const filter = getFilterByRealName(value?.label)
    if (filter) {
      filterHandle(filter)
    }
      
    setOpportunityTypeSelect(value)
  }
  const searchTextHandle = (value) => {
    try {
      const text = value
      setSearchText(text)
      setOpportunityTypeSelect(text)

      if (text.length >= 3) {
        getResults(text)
      }
    } catch (error) {
      console.error(error)
      setError(error)
    }
  }


  const getResults = async (searchText) => {
    try {
      setLoading(true)
      // TODO: implementar llamada a la API
      // const resolve = await fetch(`https://pixabay.com/api/?key=25593974-8a25e418a8d006e97c6a76da2&q=${searchText}&image_type=photo`)
      // const json = await resolve.json();
      // const results = json.hits.map(result => (
      //   { id: result.id, label: result.user, value: result.user }
      // ))

      const searches = state.searches
      const results = searches.map(result => (
        { id: result.id, label: result.text, value: result.text }
        ))
        
      setOpportunitiesTypes([
        ...results
      ])
      setLoading(false)
    } catch (error) {
      console.error(error)
      setError(error)
      setLoading(false)
    }
  }


  return (
    <Container style={{ marginTop: '-1.5rem' }}>
      {/* TODO: Refactor para encapsular Buscador con y sin filtros */}
      {!btnFilter &&
        <InputGroup style={{ flexWrap: 'nowrap' }}>
          <Row className="d-flex justify-content-center w-5 m-auto">
            <Col md="auto">
              <SearchAutocomplete
                options={opportunitiesTypes}
                optionSelected={opportunityTypeSelect}
                search={search}
                autocompleteHandle={autocompleteHandle}
                className="search-autocomplete"
              />
            </Col>
            <Col lg="2">
              <Button
                style={{height: 59 }}
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
            </Col>
          </Row>
        </InputGroup>
      }
      {/* Filter expanded */}
      {btnFilter &&
        <Row className="d-flex justify-content-center m-auto">
          <Col
            xs="12"
            md="3"
            lg="4"
            xl="6"
            className="list-filter-left-col"
          >
            <SearchAutocomplete
              options={opportunitiesTypes}
              optionSelected={opportunityTypeSelect}
              search={search}
              autocompleteHandle={autocompleteHandle}
              className="search-autocomplete colapse"
            />
          </Col>
          <Col
            xs="12"
            md="9"
            lg="8"
            xl="6"
            className="list-filter-right-col"
          >
            <Card className="list-filters-card-containers">
              {Object.keys(filters).map(f => (
                <Badge
                  className={filters[f].active ? 'badge-filter-active' : ''}
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
            </Card>
          </Col>
        </Row>
      }
      {btnFilter && (
        <Row
          className="justify-content-between"
          style={{ marginTop: '5.25rem' }}
        >
          {filtersOptions.map(filter => (
            <Col key={filter.value} sm={12} md={6} lg={2}>
              <Select
                isMulti
                key={filter.value}
                className="basic-single filter-home-redait"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                placeholder={filter.name}
                name={filter.value}
                options={filter.data}
                onChange={e =>
                  auxFiltersHandle(e, filter)
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
