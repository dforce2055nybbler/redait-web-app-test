import * as React from 'react';

import Layout from '../components/ui/layout';
import Seo from '../components/seo';
import Hero from '../components/home/Hero';
import ProfilePage from "../components/profile/ProfilePage";

const Profile = () => (
  <Layout>
    <Seo title="Perfil" />
    <Hero />
    <ProfilePage />
  </Layout>
)

export default Profile;
