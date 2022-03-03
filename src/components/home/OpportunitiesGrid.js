import React, { useContext } from 'react';
import { Col, Container, Row, ProgressBar } from 'react-bootstrap';
import Opportunity from './Opportunity';
import Talent from './Talent';
import Product from './Product';
import Partnership from './Partnership';
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
    // console.log('Filters => ', filters)
    const { mainFilter, auxFilters } = filters
    // console.log('Main Filter => ', mainFilter)
    // console.log('Aux Filters => ', auxFilters)
    
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
    // console.log('Resultados => ', results)

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
    // console.log('OpportunitiesGrid Last Search => ', lastSearch.text);
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
      {loading && <><p>cargando...</p> <ProgressBar animated now={100} /></>}
      {data && 
        <>
          <Row>
            <Col>
            <span>Todas las oportunidades{' '} <strong>{totalResults}</strong> resultado{totalResults > 1 ? 's': '' }</span>
            </Col>
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
          {data.products &&
            <Row>
              {data.products.map(product => (
                <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                  <Product opportunity={product} />
                </Col>
              ))}
            </Row>
          }
          {data.services &&
            <Row>
              {data.services.map(service => (
                <Col key={service.id} sm={12} md={6} lg={4} xl={3}>
                  <Product opportunity={service} />
                </Col>
              ))}
            </Row>
          }
          {data.partnerships &&
            <Row>
              {data.partnerships.map(partnership => (
                <Col key={partnership.id} sm={12} md={6} lg={4} xl={3}>
                  <Partnership opportunity={partnership} />
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
