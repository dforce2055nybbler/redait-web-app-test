import * as React from 'react';
import { Helmet } from 'react-helmet';

import Layout from '../components/ui/layout';
import Seo from '../components/seo';

import '../components/styles/styles.scss';

const IndexPage = () => (
  <Layout>
    <Seo title="Inicio" />
  </Layout>
);

export default IndexPage;
