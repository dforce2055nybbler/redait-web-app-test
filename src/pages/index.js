import * as React from 'react';

import Layout from '../components/ui/layout';
import Seo from '../components/seo';

import Hero from '../components/home/Hero';
import SearchFilter from '../components/home/SearchFilter';
import OpportunitiesGrid from '../components/home/OpportunitiesGrid';

import '../components/styles/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchContextProvider from '../contexts/wrappers/SearchContext';

const IndexPage = () => (
  <Layout>
    <Seo title="Inicio" />
    <Hero />
    <SearchContextProvider>
      <SearchFilter />
      <OpportunitiesGrid />
    </SearchContextProvider>
  </Layout>
);

export default IndexPage;
