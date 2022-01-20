import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Opportunity from './Opportunity';

const OpportunitiesGrid = () => {
  const data = useStaticQuery(graphql`
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

  console.log(data);

  return (
    <Container style={{ marginTop: '3.563rem' }}>
      <p>
        Todas las oportunidades{' '}
        <strong>{data.allStrapiOpportunities.totalCount}</strong> resultados
      </p>
      <Row>
        {data.allStrapiOpportunities.edges.map(opportunity => (
          <Col key={opportunity.node.strapiId} sm={12} md={6} lg={4} xl={3}>
            <Opportunity opportunity={opportunity.node} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default OpportunitiesGrid;
