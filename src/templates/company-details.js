import React, { useEffect } from 'react'
import Layout from '../components/ui/layout'
import Seo from '../components/seo'
import Hero from '../components/home/Hero'
import ProfilePage from "../components/profile/ProfilePage"
import { navigate, graphql } from 'gatsby';

export default function CompanyDetails({ pageContext, data }) {
  const { id, slug, name, description, subtitle } = pageContext
  const { companyDetails } = data

  const goHome = () => {
    navigate('/')
  }

  useEffect(() => {
    if (!companyDetails)
      goHome()

  }, [companyDetails])

  return (
    <Layout>
      <Seo title={name} />
      <Hero />
      {companyDetails && <ProfilePage companyDetails={companyDetails} />}
    </Layout>
  )
}

export const query = graphql`
  query CompanyDetails($slug: String) {
    companyDetails: strapiCompanies(slug: {eq: $slug}, active: {eq: true}) {
      strapiId
      name
      subtitle
      email
      phone
      domain
      description
      employees
      languages {
        id
        name
      }
      facebook_url
      instagram_url
      twitter_url
      linkedin_url
      services {
        id
        name
        title
      }
      posts {
        id
        title
        description
        location
        status
        type
      }
      team {
        id
        name
        job
      }
      software {
        id
        name
        url
      }
      slug
      location
      markets {
        id
        name
      }
      partnerships {
        id
        name
        title
      }
    }
  }
`