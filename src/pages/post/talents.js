import * as React from 'react';
import Layout from '../../components/ui/layout';
import Seo from '../../components/seo';
import TalentsStepper from '../../components/forms/TalentsStepper'
import Hero from '../../components/home/Hero';
import useBreakpoint from '../../hooks/useBreakpoint'
import { Row, Col, Container } from 'react-bootstrap'

const Talents = () => {
  const size = useBreakpoint()
  console.log(size)
  return (
    <Layout>
      <Container fluid style={{ backgroundColor: '#F9F9F9' }} className="h-100">
        <Seo title="talents" />
        <Hero />
        <Row
          className="justify-content-md-center mt-4 pt-4 h-100"
          style={{ paddingTop: '3rem' }}
        >
          <Col
            xl={6} lg={8} md={12} xs={12}
            className="h-100"
            style={{ height: '100vh' }}
          >
            <TalentsStepper className="overflow-auto" />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Talents

