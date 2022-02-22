import React, { useEffect, useState } from 'react';

import Layout from '../components/ui/layout';
import Seo from '../components/seo';
import Hero from '../components/home/Hero';
import ProfilePage from "../components/profile/ProfilePage";
import { navigate } from 'gatsby';

const Profile = () => {
  const [companyDetails, setCompanyDetails] = useState(null)
  const params = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : null
  )
  const name = params.get('name')

  const cleanParams = () => {
    params.delete('name')
    navigate('/')
  }

  const getCompanyDetails = async (name) => {
    try {
      const result = await fetch('http://api.icndb.com/jokes/random')
      const details = await result.json()
      setCompanyDetails(details)
      return true
    } catch (error) {
      console.error(error)
      return null
    }
  }

  useEffect(() => {
    if (!name)
      cleanParams()
    else
      getCompanyDetails(name)

  }, [name])

  return (
    <Layout>
      <Seo title="Perfil" />
      <Hero />
      {companyDetails && <ProfilePage companyDetails={companyDetails} />}
    </Layout>
  )
}

export default Profile;
