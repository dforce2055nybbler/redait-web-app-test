
import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'gatsby'
import Avatar from '@mui/material/Avatar';
import { FaRegCheckSquare } from 'react-icons/fa'

const MessageList = ({ conversationActive }) => {
  const me = 2055
  return (
    <div className="messages">
      <div className="d-grid gap-0 items">
        {conversationActive.messages.map(message => (
          <div key={message.id} className="item" size="lg">
            {message.from === me ?
              <Row className="align-items-center">
                <Col xs={1}>
                  <span className="date">{message.delivered.time}</span>
                  {message.read ?
                    <span className="status-check"><FaRegCheckSquare /></span>
                    :
                    <span className="status"><FaRegCheckSquare /></span>
                  }
                </Col>
                <Col xs={8} style={{ textAlign: 'start' }}>
                  <Row>
                    <Col style={{ lineHeight: '10px' }}>
                      <div className="from-me"
                      >
                        {message.value}
                      </div>
                    </Col>
                  </Row>
                </Col>
                
                <Col xs="auto" style={{ paddingLeft: '0', paddingRight: '0' }}>
                  <Avatar className="avatar-container me">
                      E
                  </Avatar>
                </Col>
              </Row>
              :
              <Row className="align-items-center">
                <Col xs="auto" style={{ paddingLeft: '0', paddingRight: '0' }}>
                  <Avatar className="avatar-container">
                    {conversationActive.contact.src ?
                      <img
                        alt=""
                        className={'item-left-icon ' + conversationActive.contact.bgcolor}
                        src={conversationActive.contact.src}
                      />
                      :
                      conversationActive.contact.company[0]
                    }
                  </Avatar>
                </Col>
                <Col xs={8} style={{ textAlign: 'start' }}>
                  <Row>
                    <Col style={{ lineHeight: '10px' }}>
                      <div className="from-them"
                      >
                        {message.value}
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col xs={1}>
                  <span className="date">{message.delivered.time}</span>
                  {message.read ?
                    <span className="status-check"><FaRegCheckSquare /></span>
                    :
                    <span className="status"><FaRegCheckSquare /></span>
                  }
                </Col>
              </Row>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default MessageList;
