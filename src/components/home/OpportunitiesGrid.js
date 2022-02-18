import { graphql, useStaticQuery } from 'gatsby';
import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Opportunity from './Opportunity';
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



const OpportunitiesGrid = () => {
  const { state } = useContext(SearchContext)
  const limit = 100
  let lastSearch = ''
  let QUERY = OPPORTUNITIES
  let entity = 'opportunities'
  let totalResults = 0

  const handleFilters = (filters) => {
    console.log('Filters => ', filters)
    const { mainFilter, auxFilters } = filters
    console.log('Main Filter => ', mainFilter)
    console.log('Aux Filters => ', auxFilters)
    
    if (mainFilter?.name === 'productsandservices') {
      QUERY = PRODUCTS_SERVICES
      entity = 'products' // TODO: implementar entity para productos y servicios
    }
    
    if (mainFilter?.name === 'talents') {
      QUERY = TALENTS
      entity = 'talents'
    }
    
    if (mainFilter?.name === 'partnerships') {
      QUERY = PARTNERSHIPS
      entity = 'partnerships'
    }
    
    if (mainFilter?.name === 'businessopportunities') {
      QUERY = BUSINESS_OPPORTUNITIES
      entity = 'businessopportunities'
    }
    
    if (mainFilter?.name === 'opportunities') {
      QUERY = OPPORTUNITIES
      entity = 'opportunities'
    }
    
    if (mainFilter?.name === 'events') {
      QUERY = EVENTS
      entity = 'events'
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

  // Ejecuta la query
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      search: lastSearch,
      limit: limit
    }
  })

  handleResults(data)
   // data?.opportunities.length + data?.businessOpportunities.length + data?.events.length

  const data2 = useStaticQuery(graphql`
    query OpportunitiesQuery {
      allStrapiOpportunities {
        edges {
          node {
            title
            description
            strapiId
            company {
              name
              location
            }
            skills {
              name
            }
          }
        }
        totalCount
      }
    }
  `);


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
