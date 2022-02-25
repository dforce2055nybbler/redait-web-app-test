import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap'
import { FaRegEdit } from 'react-icons/fa'
import Search from './Search';
import IconButton from '@mui/material/IconButton';
import ContactList from './ContactList';
import Badge from '@mui/material/Badge';
import logoIcon from '../../images/logo-infosis-light.png'
import logoInfosis from '../../images/logo-infosis-light.png'
import logoBlimop from '../../images/logo-blimop.png'
import logoCloudSpace from '../../images/logo-grupo-cloudspace.png'
import logoGLGroup from '../../images/logo-gl-group.png'
import logoGlobant from '../../images/logo-globant.png'
import logoClarika from '../../images/logo-clarika.png'
import MessageList from './MessageList'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import NewMessage from './NewMessage'

const MessagePage = () => {
  const [conversations, setConversations] = useState([
    {
      contact: {
        id: 1,
        company: 'Infosis',
        name: 'Natalia Manzo',
        src: logoInfosis,
        bgcolor: 'dark-background',
        to: '/messages',
      },
      lastUpdate: '15 de Diciembre de 2021',
      status: {
        unread: true,
        unreadMessages: 3
      },
      messages: [
        {
          id: 1,
          from: 1,
          value: 'Hola Marcelo, cómo estás? Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar.',
          read: true,
          delivered: {
            date: '15 de Diciembre de 2021',
            time: '8.30 am'
          } 
        },
        {
          id: 2,
          from: 2055,
          value: 'Hola Marcelo, cómo estás? Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar.',
          read: true,
          delivered: {
            date: '15 de Diciembre de 2021',
            time: '8.30 am'
          } 
        },
        {
          id: 3,
          from: 1,
          value: 'Hola Marcelo, cómo estás? Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar.',
          read: true,
          delivered: {
            date: '15 de Diciembre de 2021',
            time: '8.30 am'
          } 
        },
        {
          id: 4,
          from: 2055,
          value: 'Hola Marcelo, cómo estás? Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar.',
          read: false,
          delivered: {
            date: '15 de Diciembre de 2021',
            time: '8.30 am'
          } 
        },
      ]
    },
    {
      contact: {
        id: 2,
        company: 'Blimop',
        name: 'Alejandro Jose Cuevas',
        src: logoBlimop,
        bgcolor: 'none',
        to: '/messages',
      },
      lastUpdate: '15 de Diciembre de 2021',
      status: {
        unread: true,
        unreadMessages: 9
      },
      messages: [
        {
          id: 1,
          from: 1,
          value: 'Buscamos Desarrollador Java full time. Home Office para importante empresa multinacional. Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar.',
          read: false,
          delivered: {
            date: '15 de Diciembre de 2021',
            time: '8.30 am'
          } 
        },
      ]
    },
    {
      contact: {
        id: 3,
        company: 'Grupo Cloudspace',
        name: 'Antoni Palau',
        src: logoCloudSpace,
        bgcolor: '',
        to: '/messages',
      },
      lastUpdate: '15 de Diciembre de 2021',
      status: {
        unread: false,
        unreadMessages: null
      },
      messages: [
        {
          id: 1,
          from: 1,
          value: '¿Estas por ahí? Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar.',
          read: false,
          delivered: {
            date: '15 de Diciembre de 2021',
            time: '8.30 am'
          } 
        },
      ]
    },
    {
      contact: {
        id: 4,
        company: 'G&L Group',
        name: 'Yasmin Piñero',
        src: logoGLGroup,
        bgcolor: 'blue-gl-background',
        to: '/messages',
      },
      lastUpdate: '15 de Diciembre de 2021',
      status: {
        unread: false,
        unreadMessages: null
      },
      messages: [
        {
          id: 1,
          from: 1,
          value: 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar.',
          read: false,
          delivered: {
            date: '15 de Diciembre de 2021',
            time: '8.30 am'
          } 
        },
      ]
    },
    {
      contact: {
        id: 5,
        company: 'Globant',
        name: 'Gladys Alcantara',
        src: logoGlobant,
        bgcolor: '',
        to: '/messages',
      },
      lastUpdate: '15 de Diciembre de 2021',
      status: {
        unread: false,
        unreadMessages: null
      },
      messages: [
        {
          id: 1,
          from: 1,
          value: 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar.',
          read: false,
          delivered: {
            date: '15 de Diciembre de 2021',
            time: '8.30 am'
          } 
        },
      ]
    },
    {
      contact: {
        id: 6,
        company: 'Etixen',
        name: 'Mireia Diego',
        src: '',
        bgcolor: 'blue-redit1-background',
        to: '/messages',
      },
      lastUpdate: '15 de Diciembre de 2021',
      status: {
        unread: false,
        unreadMessages: null
      },
      messages: [
        {
          id: 1,
          from: 1,
          value: 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar.',
          read: false,
          delivered: {
            date: '15 de Diciembre de 2021',
            time: '8.30 am'
          } 
        },
      ]
    },
    {
      contact: {
        id: 7,
        company: 'Clarika',
        name: 'Amaya Bolaños',
        src: logoClarika,
        bgcolor: '',
        to: '/messages',
      },
      lastUpdate: '15 de Diciembre de 2021',
      status: {
        unread: false,
        unreadMessages: null
      },
      messages: [
        {
          id: 1,
          from: 1,
          value: 'Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar.',
          read: false,
          delivered: {
            date: '15 de Diciembre de 2021',
            time: '8.30 am'
          } 
        },
      ]
    },
  ])
  const [conversationsFiltered, setConversationsFiltered] = useState(conversations)
  const [conversationActive, setConversationActive] = useState(null)
  const [contacts, setContacts] = useState(null)
  const [messageFilter, setMessageFilter] = useState(null)
  const [inputMessage, setInputMessage] = useState('')
  const [sendNewMessage, setSendNewMessage] = useState(false)
  const [title, setTitle] = useState('Seleccione una conversación para empezar')

  
  
  const setFilter = message => {
    try {
      if(message.id)
        setMessageFilter(message)
      else
        setConversationsFiltered(conversations)
    } catch (error) {
      setConversationsFiltered(conversations)
      console.error(error)
    }
  }

  const handleConversationActive = contactId => {
    const active = conversations.find(conversation => conversation.contact.id === contactId)
    setConversationActive(active)
    setTitle('Seleccione una conversación para empezar')
    setSendNewMessage(false)
  }

  const writeMessage = () => {
    console.log("Writing new message...")
    setSendNewMessage(true)
    setConversationActive(null)
    setTitle('Nuevo mensaje')
  }
  const cancelMessage = () => {
    setSendNewMessage(false)
    setTitle('Seleccione una conversación para empezar')
  }

  const sendMessage = () => {
    console.log("Sending new message...", inputMessage)
    setInputMessage('')
  }

  useEffect(() => {
    if (conversations) {
      const contacts = conversations.map(conversation => conversation.contact)
      setContacts(contacts)
    }
  }, [conversations])
  

  useEffect(() => {
    if (messageFilter && conversations) {
      const conversationsFiltered = conversations.filter(conversation => conversation.contact.id === messageFilter.id)
      setConversationsFiltered(conversationsFiltered)
    }
  }, [messageFilter] )

  return (
    <>
      <Container style={{ marginTop: '-1.5rem' }} className="message-page">
        <Row className="justify-content-md-center mt-n4 pr-3 pl-3 g-0">
          <Col lg={12}>
            <h1 className="title">Mensajes</h1>
          </Col>
        </Row>
        <Row className="top-row justify-content-md-center mt-n4 pr-3 pl-3 g-0 mr-3 ml-3">
          <Col lg={3} className="left-col">
            <Row className="pt-2">
              <Col xs={10} className="pt-1 pl-4 search">
                <Search
                  contacts={contacts}
                  setFilter={setFilter}
                />
              </Col>
              <Col xs="auto" className="edit">
                <IconButton aria-label="delete" size="large" onClick={writeMessage}>
                  <FaRegEdit size={29} fontSize="inherit" />
                </IconButton>
              </Col>
            </Row>
          </Col>
          <Col lg={9} className="right-col">
            <Row className="pt-2">
              <Col xs={10} className="pl-4">
                {conversationActive ?
                  <h3 className="title">Conversación con {conversationActive?.contact?.name}</h3>
                  :
                  <h3 className="title">{title}</h3>
                }
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="content-row justify-content-md-center pr-3 pl-3 mb-4 g-0 mr-3 ml-3">
          <Col lg={3} className="left-col">
            <ContactList
              handleConversationActive={handleConversationActive}
              conversations={conversationsFiltered} 
            />
          </Col>
          <Col lg={9} className="right-col">
            {sendNewMessage ?
              <NewMessage
                contacts={contacts}
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                sendMessage={sendMessage}
                cancelMessage={cancelMessage}
              />
              : 
              <>
                <Row className="messages-container">
                  <Col>
                    {conversationActive && <MessageList conversationActive={conversationActive} />}
                  </Col>
                </Row>
                
                <Row className="input-message-container">
                  <Col xs={10} className="pt-3 pb-1 mr-1">
                    <TextareaAutosize
                      maxRows={4}
                      aria-label="Escribe un mensaje"
                      placeholder="Escribe un mensaje"
                      className="input-message"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                    />
                  </Col>
                  <Col xs={2} className="pt-3 pb-1 text-center">
                    <Button
                      className="btn-send active"
                      variant="contained"
                      endIcon={<SendIcon />}
                      onClick={sendMessage}
                    >
                      Enviar
                    </Button>
                  </Col>
                </Row>
              </>
            }
            
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default MessagePage