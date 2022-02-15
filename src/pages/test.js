import React, { useContext, useEffect } from 'react'
import { UserContext } from '../contexts'
import Seo from '../components/seo'
import { useQuery } from '@apollo/client'
import { COMPANIES_DETAILED } from '../apollo/queries'
import { graphql, useStaticQuery } from 'gatsby'
// import { navigate } from "@reach/router"


const TestPage = () => {
  const { loading, error, data } = useQuery(COMPANIES_DETAILED, {
    variables: { search: 'java' }
  })
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

  console.log('data', data)

  const data2 = useStaticQuery(graphql`
    query allStrapiCompaniesDetailed {
      allStrapiCompanies {
        edges {
          node {
            strapiId
            name
            description
            location
            domain
            active
            
          }
        }
      }
      
    }
  `);

  console.log('data2', data2)


  return (
    <>
      <Seo title="TEST PAGE" />
      <h1>Test page</h1>
    </>
    )
  }
;

export default TestPage;
