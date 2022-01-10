import * as React from 'react';

import Layout from '../components/ui/layout';
import Seo from '../components/seo';

import '../components/styles/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Hero from '../components/home/Hero';
import SearchFilter from '../components/home/SearchFilter';

const IndexPage = () => (
  <Layout>
    <Seo title="Inicio" />
    <Hero />
    <SearchFilter />
    {/* OpportunitiesGrid */}
  </Layout>
);

export default IndexPage;
