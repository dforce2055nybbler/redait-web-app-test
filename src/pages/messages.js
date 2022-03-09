import React, { useEffect, useContext } from 'react'

import Layout from '../components/ui/layout'
import Seo from '../components/seo'
import MessagePage from "../components/messages/MessagePage"
import { UserContext } from '../contexts'
import { navigate } from 'gatsby'

const Messages = () => {
  const { user } = useContext(UserContext)
  console.log('user', user)
  
  useEffect(() => {
    if (!user || user.username === 'Guest') {
      navigate('/login')
    }
  }, [user])

  return (
    <>
      {user.username !== 'Guest' &&
        <Layout>
          <Seo title="Mensajes" />
          <MessagePage />
        </Layout>
      }
    </>
  )
}

export default Messages;
