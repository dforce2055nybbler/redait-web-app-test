
import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FaRegCheckSquare } from 'react-icons/fa'

const MessageList = ({ user, conversationActive }) => {

  return (
    <div className="messages">
      <div className="d-grid gap-0 items">
        {conversationActive.messages.map(message => (
          <Container fluid="md" key={message.id} className="item" size="lg">
            <Row className={ message.from === user.id ? 'align-items-center from-me-container': 'align-items-center'}>
              <Col xs="1" style={{ paddingLeft: '0', paddingRight: '0' }}>
                <div className={message.from === user.id ? 'avatar-container me' : 'avatar-container'}>
                  {message.from === user.id ?
                    user.firstName[0]
                    :
                    <Image
                      thumbnail
                      alt={conversationActive.contact?.name}
                      className={'item-left-icon ' + conversationActive.contact?.bgcolor}
                      src={conversationActive.contact?.src}
                    />
                  }
                </div>
              </Col>
              <Col xs="7" style={{ textAlign: 'start' }}>
                <Row>
                  <Col style={{ lineHeight: '10px' }} className="message-container">
                    <div className={message.from === user.id ? 'from-me' : 'from-them'}
                    >
                      {message.value}
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xs="1">
                <span className="date">{message.delivered.time}</span>
                {message.read ?
                  <span className="status-check"><FaRegCheckSquare /></span>
                  :
                  <span className="status"><FaRegCheckSquare /></span>
                }
              </Col>
            </Row>
          </Container>
        ))}
      </div>
    </div>
  )
}

export default MessageList;
