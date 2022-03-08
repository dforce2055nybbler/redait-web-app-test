import React, { useContext, useEffect } from 'react'
import Layout from '../../components/ui/layout'
import Seo from '../../components/seo'
import TalentStepper from '../../components/forms/TalentStepper'
import Hero from '../../components/home/Hero'
import useBreakpoint from '../../hooks/useBreakpoint'
import { Row, Col } from 'react-bootstrap'
import { UserContext } from '../../contexts'
// import { navigate } from "@reach/router"


const Talent = () => {
  const size = useBreakpoint()
  const { user } = useContext(UserContext)
  
  useEffect(() => () => {
    if (!user || user?.username === 'Guest') {
      console.log('no hay usuario go to Login!')
      // navigate('/login/');
      if (typeof window !== 'undefined') {
        window.location = '/';
      }
    }
  }, )

  return (
    <Layout>
      {user?.username !== 'Guest' &&
        <>
          <Seo title="Talento" />
          <Hero
            title="Talento"
            message="Tengo perfiles disponibles para proyectos"
          />
          <Row
            className="justify-content-md-center mt-4 pt-4 h-100"
            style={{ paddingTop: '3rem' }}
          >
            <Col
              xl={6} lg={8} md={12} xs={12}
              className="h-100"
              style={{ height: '100vh' }}
            >
              <TalentStepper className="overflow-auto" />
            </Col>
          </Row>
        </>
      }
    </Layout>
  )
}

export default Talent

