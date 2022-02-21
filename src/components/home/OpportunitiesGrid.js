import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Opportunity from './Opportunity';
import Talent from './Talent';
import LinearProgress from '@mui/material/LinearProgress';
import { SearchContext } from '../../contexts/wrappers/SearchContext';
import { useQuery } from '@apollo/client'
import {
  BUSINESS_OPPORTUNITIES_EVENTS,
  PRODUCTS_SERVICES,
  TALENTS,
  PARTNERSHIPS,
  OPPORTUNITIES,
  BUSINESS_OPPORTUNITIES,
  EVENTS
} from '../../apollo/queries'



const OpportunitiesGrid = ({ id }) => {
  const { state } = useContext(SearchContext)
  const limit = 100
  let lastSearch = ''
  let QUERY = OPPORTUNITIES
  let totalResults = 0

  const handleFilters = (filters) => {
    console.log('Filters => ', filters)
    const { mainFilter, auxFilters } = filters
    console.log('Main Filter => ', mainFilter)
    console.log('Aux Filters => ', auxFilters)
    
    if (mainFilter?.name === 'productsandservices') {
      QUERY = PRODUCTS_SERVICES
    }
    
    if (mainFilter?.name === 'talents') {
      QUERY = TALENTS
    }
    
    if (mainFilter?.name === 'partnerships') {
      QUERY = PARTNERSHIPS
    }
    
    if (mainFilter?.name === 'businessopportunities') {
      QUERY = BUSINESS_OPPORTUNITIES
    }
    
    if (mainFilter?.name === 'opportunities') {
      QUERY = OPPORTUNITIES
    }
    
    if (mainFilter?.name === 'events') {
      QUERY = EVENTS
    }
  }

  const handleResults = (results) => {
    console.log('Resultados => ', results)

    try {
      totalResults = 0
      for (let key in results) {
        const valor = results[key].length
        if (Number.isInteger(valor))
          totalResults += results[key].length
      }
  
    } catch (error) {
      console.error(error)
      totalResults = 0
    }
  }


  try {
    lastSearch = state.searches[0]?.text ? state.searches[0].text : ''
    console.log('OpportunitiesGrid Last Search => ', lastSearch.text);
    const filters = state.filters
    if (filters)
      handleFilters(filters)

  } catch (error) {
    lastSearch = ''
    console.error(error)
  }

  const variables = {
    search: lastSearch,
    limit: limit 
  }
  if (id) {
    variables.id = Number(id)
    variables.search = ""
  }

  // Ejecuta la query
  const { loading, error, data } = useQuery(QUERY, {
    variables: variables
  })

  handleResults(data)
   // data?.opportunities.length + data?.businessOpportunities.length + data?.events.length


  return (
    <Container style={{ marginTop: '3.563rem' }}>
      {loading && <><p>cargando...</p> <LinearProgress /></>}
      {data && 
        <>
          <Row>
            <Col>
            <span>Todas las oportunidades{' '} <strong>{totalResults}</strong> resultado{totalResults > 1 ? 's': '' }</span>
            </Col>
            {/* <Col>
              <span>Oportunidades: <strong>{data.opportunities.length}</strong></span>
            </Col>
            <Col>
              <span>Oportunidades de Negocio: <strong>{data.businessOpportunities.length}</strong></span>
            </Col>
            <Col>
              <span>Eventos: <strong>{data.events.length}</strong></span>
            </Col> */}
          </Row>
          {data.opportunities &&
            <Row>
              {data.opportunities.map(opportunity => (
                <Col key={opportunity.id} sm={12} md={6} lg={4} xl={3}>
                  <Opportunity opportunity={opportunity} />
                </Col>
              ))}
            </Row>
          }
          {data.talents &&
            <Row>
              {data.talents.map(talent => (
                <Col key={talent.id} sm={12} md={6} lg={4} xl={3}>
                  <Talent talent={talent} />
                </Col>
              ))}
            </Row>
          }
        </>
      }
      {!data && <p>Procesando resultado...</p>}
      {error &&
        <p>ups.. ocurrio un error: {error.message}</p>
      }
    </Container>
  );
};

export default OpportunitiesGrid;
