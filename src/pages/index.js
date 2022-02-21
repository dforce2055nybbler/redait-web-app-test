import * as React from 'react';

import Layout from '../components/ui/layout';
import Seo from '../components/seo';

import Hero from '../components/home/Hero';
import SearchFilter from '../components/home/SearchFilter';
import OpportunitiesGrid from '../components/home/OpportunitiesGrid';

import '../components/styles/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchContextProvider from '../contexts/wrappers/SearchContext';
import { navigate } from 'gatsby';

const IndexPage = () => {
  const params = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : null
  )
  const type = params.get('type')
  const id = params.get('id')

  const cleanParams = () => {
    params.delete('type')
    params.delete('id')
    navigate('/')
  }

  return (
    <Layout>
      <Seo title="Inicio" />
      <Hero
        title="Oportunidades"
        message="Descubre todas las opotunidades de proyectos y perfiles que ofrecen
            las diferentes empresas del sector."
      />
      <SearchContextProvider>
        <SearchFilter mainFilterParameter={type} cleanParams={cleanParams}/>
        <OpportunitiesGrid id={id} />
      </SearchContextProvider>
    </Layout>
  )
}

export default IndexPage
