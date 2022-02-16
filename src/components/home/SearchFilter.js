import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Container,
  Badge,
  InputGroup,
  Row,
  Col,
} from 'react-bootstrap';
import { FaSlidersH } from 'react-icons/fa';

import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Select from 'react-select';
import { formatDataSelect } from '../../helpers/formatDataSelect';
import { graphql, useStaticQuery } from 'gatsby';

import { SearchContext } from '../../contexts/wrappers/SearchContext';

const SearchFilter = () => {
  const { state, actions } = useContext(SearchContext)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [opportunitiesTypes, setOpportunitiesTypes] = useState([]);
  const [opportunityTypeSelect, setOpportunityTypeSelect] = useState('');
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
    eventos: {
      name: 'eventos',
      realName: 'Eventos',
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
  

  console.log(data)

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
    if (optionsOpportunitiesTypes) {
      setOpportunitiesTypes(optionsOpportunitiesTypes)
    }
  }, [data]);
  

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

  const onSubmit = (event) => {
    event.preventDefault();
    console.log("submission prevented");
  };

  const search = (e) => {
    const text = e.target.value
    
    if (e.key === 'Enter' && text) {
      actions.dispatchSearch({
        type: 'ADD_SEARCH',
        text: text
      })
      getResults(text)
      setOpen(false)
    } 
    if (e.type === 'click' && searchText.length >= 3) {
      actions.dispatchSearch({
        type: 'ADD_SEARCH',
        text: searchText
      })
      getResults(searchText)
      setOpen(false)
    }

  }

  const autocompleteHandle = (event, value) => {
    if (!value)
      setOpportunitiesTypes(optionsOpportunitiesTypes)

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

  const getKey = (value) => {
    try {
      const result = opportunitiesTypes.filter(item => item.value === value)
      return result.id
    } catch (error) {
      return Math.floor(Math.random() * (9999 - 1)) + 1
    }
  }

  const handleClickAway = () => {
    setOpen(false)
  }

  return (
    <Container style={{ marginTop: '-1.5rem' }}>
      {/* TODO: Refactor para encapsular Buscador con y sin filtros */}
      {!btnFilter &&
        <InputGroup style={{ flexWrap: 'nowrap' }}>
          <Row className="d-flex justify-content-center w-5 m-auto">
            <Col md="auto">
              <Paper
                elevation={1}
                onSubmit={(e) => setSearchText(e.preventDefault())}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 630, height: 59, backgroundColor: '#fff', borderRightColor: 'transparent'}}
              >
                <IconButton
                  onClick={(e) => search(e)}
                  type="submit"
                  sx={{ p: '10px', height: 50 }}
                  aria-label="search"
                >
                  <SearchIcon sx={{ color: '#212529' }}/>
                </IconButton>
                <ClickAwayListener onClickAway={handleClickAway}>
                  <Autocomplete
                    id="combo-box-demo"
                    sx={{ width: 600 }}
                    open={open}
                    loading={loading}
                    loadingText="Cargando..."
                    value={opportunityTypeSelect}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(e, value) => autocompleteHandle(e, value)}
                    filterOptions={(x) => x}
                    options={opportunitiesTypes}
                    renderInput={(params, option) => {
                      const { InputLabelProps, InputProps, ...rest } = params;
                      return (
                        <InputBase
                          key={getKey(rest.inputProps.value)}
                          onChange={(e) => searchTextHandle(e.target.value)}
                          onKeyPress={(e) => search(e)}
                          onClick={() => setOpen(true)}
                          value={searchText} {...params.InputProps} {...rest} 
                        />
                      )
                    }}
                  />
                </ClickAwayListener>
              </Paper>
            </Col>
            <Col xs lg="2">
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
        <InputGroup>
          <Row className="d-flex justify-content-center m-auto">
            <Col
              lg="6"
              className="list-filter-left-col"
            >
              <Paper
                elevation={1}
                onSubmit={(e) => setSearchText(e.preventDefault())}
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 540,
                  height: 59,
                  backgroundColor: '#fff',
                  borderRight: '2px solid #ccc',
                  borderTopRightRadius: '0px',
                  borderBottomRightRadius: '0px',
                  paddingRight: '15px',
                  marginRight: '10px'
                }}
              >
                <IconButton
                  onClick={() => getResults(opportunityTypeSelect)}
                  type="submit"
                  sx={{ p: '10px' }}
                  aria-label="search"
                >
                  <SearchIcon sx={{ color: '#212529' }} />
                </IconButton>
                <ClickAwayListener onClickAway={handleClickAway}>
                  <Autocomplete
                    id="combo-box-demo"
                    sx={{ width: 540 }}
                    open={open}
                    loading={loading}
                    loadingText="Cargando..."
                    value={opportunityTypeSelect}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    onChange={(e, value) => autocompleteHandle(e, value)}
                    filterOptions={(x) => x}
                    options={opportunitiesTypes}
                    renderInput={(params, option) => {
                      const { InputLabelProps, InputProps, ...rest } = params;
                      return (
                        <InputBase
                          key={getKey(rest.inputProps.value)}
                          onChange={(e) => searchTextHandle(e.target.value)}
                          onKeyPress={(e) => search(e)}
                          onClick={() => setOpen(true)}
                          value={searchText} {...params.InputProps} {...rest} 
                        />
                      )
                    }}
                  />
                </ClickAwayListener>
              </Paper>
            </Col>
            <Col
              xs lg="6"
              className="list-filter-right-col"
            >
              <Paper
                elevation={1}
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 528,
                  height: 59,
                  backgroundColor: '#fff',
                  borderColor: 'transparent',
                  borderLeftColor: 'transparent',
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  gap: '1rem',
                  paddingInline: '1rem'
                }}
              >
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
              </Paper>
              
            </Col>
          </Row>
        </InputGroup>
      }
      {btnFilter && (
        <Row
          className="justify-content-between"
          style={{ marginTop: '5.25rem' }}
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
