import { graphql, useStaticQuery } from 'gatsby';
import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Opportunity from './Opportunity';
import { SearchContext } from '../../contexts/wrappers/SearchContext';

import { useQuery } from '@apollo/client'
import { BUSINESS_OPPORTUNITIES_EVENTS } from '../../apollo/queries'


const OpportunitiesGrid = () => {
  const { state } = useContext(SearchContext)
  let lastSearch = ''
  try {
    lastSearch = state.searches[0]?.text ? state.searches[0].text : ''
    console.log('OpportunitiesGrid Last Search => ', lastSearch.text);
  } catch (error) {
    lastSearch = ''
    console.error(error)
  }
  const { loading, error, data } = useQuery(BUSINESS_OPPORTUNITIES_EVENTS, {
    variables: { search: lastSearch }
  })

  const totalOportunities = data?.opportunities.length + data?.businessOpportunities.length + data?.events.length

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

  // console.log('data', data);
  // console.log('data2', data2);
  // console.log('OpportunitiesGrid Filters => ', state.filters);

  return (
    <Container style={{ marginTop: '3.563rem' }}>
      {/*
      old
      <p>
        Todas las oportunidades{' '}
        <strong>{data2.allStrapiOpportunities.totalCount}</strong> resultados
      </p>
      <Row>
        {data2.allStrapiOpportunities.edges.map(opportunity => (
          <Col key={opportunity.node.strapiId} sm={12} md={6} lg={4} xl={3}>
            <Opportunity opportunity={opportunity.node} />
          </Col>
        ))}
      </Row> */}
      {loading && <p>cargando...</p>}
      {data && 
        <>
          <Row>
            <Col>
              <span>Todas las oportunidades{' '} <strong>{totalOportunities}</strong></span>
            </Col>
            <Col>
              <span>Oportunidades: <strong>{data.opportunities.length}</strong></span>
            </Col>
            <Col>
              <span>Oportunidades de Negocio: <strong>{data.businessOpportunities.length}</strong></span>
            </Col>
            <Col>
              <span>Eventos: <strong>{data.events.length}</strong></span>
            </Col>
          </Row>
          <Row>
            {data.opportunities.map(opportunity => (
              <Col key={opportunity.id} sm={12} md={6} lg={4} xl={3}>
                <Opportunity opportunity={opportunity} />
              </Col>
            ))}
          </Row>
        </>
      }
      {error &&
        <p>ups.. ocurrio un error: {error.message}</p>
      }
    </Container>
  );
};

export default OpportunitiesGrid;
