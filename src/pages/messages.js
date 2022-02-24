import React from 'react';

import Layout from '../components/ui/layout';
import Seo from '../components/seo';
import MessagePage from "../components/messages/MessagePage";

const Messages = () => {
  
  return (
    <Layout>
      <Seo title="Mensajes" />
      <MessagePage />
    </Layout>
  )
}

export default Messages;
