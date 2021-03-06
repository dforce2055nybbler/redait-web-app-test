
import React from 'react';
import { Button, Row, Col, Image } from 'react-bootstrap';

const ContactList = ({ conversations, handleConversationActive }) => {
  const maxTitle = 30
  const maxMessage = 26

  return (
    <div className="contact-list">
      <div className="d-grid gap-0 items">
        {conversations.map(conversation => (
          <React.Fragment key={conversation.contact.id}>
            <Button
              className="item"
              size="lg"
              style={{ minWidth: '387px', borderBottom: '1px solid #E5E5E5' }}
              onClick={() => handleConversationActive(conversation.contact.id)}
            >
              <Row className="justify-content-md-end">
                <Col xs={6} className="d-flex flex-column justify-content-end ">
                    <span className="date">{conversation.contact.lastUpdate}</span>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs="auto" style={{ verticalAlign: 'middle' }}>
                  {conversation.status.unread &&
                    <span className="dot">&nbsp;</span>
                  }
                </Col>
                <Col xs="auto" style={{ paddingLeft: '0', paddingRight: '0' }}>
                  <div className="avatar-container">
                    {conversation.contact.src ? 
                      <Image
                        thumbnail
                        alt={conversation.contact.company}
                        className={ 'item-left-icon ' + conversation.contact.bgcolor }
                        src={ conversation.contact.src }
                      />
                    :
                      <div>
                        {conversation.contact.company[0]}
                      </div>
                    }
                  </div>
                </Col>
                <Col xs={8} style={{ textAlign: 'start', minWidth: '250px' }}>
                  <Row>
                    <Col style={{ lineHeight: '10px' }}>
                      <span className='item-company'>{ conversation.contact.company }</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ lineHeight: '40px' }}>
                      <span className='item-title'>{ conversation.contact.name.slice(0, maxTitle) }</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ lineHeight: '10px' }}>
                      <span
                        className={conversation?.status?.unread ? 'item-subtitle unread': 'item-subtitle'}
                      >
                        {conversation.messages[0].value.slice(0, maxMessage)}  ...
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col xs="auto">
                  {conversation.status.unread &&
                    <span className="notification-dot">{conversation.status?.unreadMessages}</span>
                  }
                </Col>
              </Row>
            </Button>
            <hr className="divider"/>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default ContactList;
