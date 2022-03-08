import React, { useEffect } from 'react';
import packageJson from '../../package.json';
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

  useEffect(() => {
    console.log('App name: ', packageJson.name)
    console.log('App version: ', packageJson.version)
  }, [])

  return (
    <Layout>
      <Seo title="Inicio" />
      <Hero
        title="Publicaciones"
        message="Descubre todas las oportunidades comerciales, proyectos, partnerships, eventos y toda la oferta de la red."
      />
      <SearchContextProvider>
        <SearchFilter mainFilterParameter={type} cleanParams={cleanParams}/>
        <OpportunitiesGrid id={id} />
      </SearchContextProvider>
    </Layout>
  )
}

export default IndexPage
