
import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'gatsby'
import Avatar from '@mui/material/Avatar';

const MessageList = ({ conversationActive }) => {

  return (
    <div className="contact-list">
      <div className="d-grid gap-0 items">
        {conversationActive.messages.map(message => (
          <Button key={message.id} className="item" size="lg">
            <Row className="align-items-center">
              <Col xs="auto" style={{ paddingLeft: '0', paddingRight: '0' }}>
                <Avatar className="avatar-container">
                  {conversationActive.contact.src ? 
                    <img
                      alt=""
                      className={ 'item-left-icon ' + conversationActive.contact.bgcolor }
                      src={ conversationActive.contact.src }
                    />
                  :
                  conversationActive.contact.company[0]
                  }
                </Avatar>
              </Col>
              <Col xs={8} style={{ textAlign: 'start' }}>
                <Row>
                  <Col style={{ lineHeight: '10px' }}>
                    <span
                      className="item-subtitle"
                    >
                      {message.value} ...
                    </span>
                  </Col>
                </Row>
              </Col>
              <Col xs="auto">
                ...
              </Col>
            </Row>
          </Button>
        ))}
      </div>
    </div>
  )
}

export default MessageList;
