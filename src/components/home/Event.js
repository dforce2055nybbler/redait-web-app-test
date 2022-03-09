import React, { useState } from 'react';
import { Badge, Card, Col, Row, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import UserIcon from '../../images/icon-user.svg';

const Event = ({ event }) => {
  const [fav, setFav] = useState(false)
  const maxDescription = 130
  // const maxSkills = 5
  // const technologies = event.technologies ? event.technologies : []
  // const programming_langs = event.programming_langs ? event.programming_langs : []
  // const skills = [ ...technologies, ...programming_langs].slice(0, maxSkills)

  const seeMoreSkills = () => {
    console.log('more skills')
  }

  const date = new Date(event.date).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })
  const time = new Date(event.date).toLocaleTimeString('es-AR')

  return (
    <Card className="p-2 pt-2 rounded event">
      {fav ? (
        <FaBookmark
          onClick={() => setFav(!fav)}
          className={fav ? 'opportunity-fav-selected' : 'opportunity-fav'}
        />
      ) : (
        <FaRegBookmark
          onClick={() => setFav(!fav)}
          className={fav ? 'opportunity-fav-selected' : 'opportunity-fav'}
        />
      )}
      <Card.Body>
        <Row className="align-items-center mb-2">
          <Col sm={12}>
            <Card.Title as="div" className="opportunity-company mb-0">
              {event.name}
            </Card.Title>
            <Card.Title as="div" className="opportunity-location">
              <FaMapMarkerAlt color="#264A75" /> {event.location || 'Buenos Aires, Argentina'}
            </Card.Title>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col sm={12}>
            <span className="date">{ date || '13 de marzo'}</span>
            <span className="time"> | { time || '10:00 hs'}</span>
          </Col>
        </Row>
        <Row className="align-items-center mb-3">
          <Col sm={12}>
          <span className="type">{event.type || 'Evento presencial'}</span>
          </Col>
        </Row>
        <Row className="justify-content-end">
          <Col sm={6}>
            <Badge className="chip cost"
            >
              {event.cost || 'Valor USD150'}
            </Badge>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Event;
