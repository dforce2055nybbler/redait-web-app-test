
import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'gatsby'
import Avatar from '@mui/material/Avatar';
import { FaRegCheckSquare } from 'react-icons/fa'

const MessageList = ({ conversationActive }) => {
  const user = {
    id: 2055,
    name: 'Esteban Quito'
  }
  return (
    <div className="messages">
      <div className="d-grid gap-0 items">
        {conversationActive.messages.map(message => (
          <div key={message.id} className="item" size="lg">
            <Row className={ message.from === user.id ? 'align-items-center from-me-container': 'align-items-center'}>
              <Col xs="auto" style={{ paddingLeft: '0', paddingRight: '0' }}>
                <Avatar className={message.from === user.id ? 'avatar-container me' : 'avatar-container'}>
                  {message.from === user.id ?
                    user.name[0]
                    :
                    <img
                      alt=""
                      className={'item-left-icon ' + conversationActive.contact?.bgcolor}
                      src={conversationActive.contact?.src}
                    />
                  }
                </Avatar>
              </Col>
              <Col xs={8} style={{ textAlign: 'start' }}>
                <Row>
                  <Col style={{ lineHeight: '10px' }}>
                    <div className={message.from === user.id ? 'from-me' : 'from-them'}
                    >
                      {message.value}
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs="auto">
                <span className="date">{message.delivered.time}</span>
                {message.read ?
                  <span className="status-check"><FaRegCheckSquare /></span>
                  :
                  <span className="status"><FaRegCheckSquare /></span>
                }
              </Col>
            </Row>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MessageList;
