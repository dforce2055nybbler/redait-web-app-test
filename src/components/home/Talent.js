import React, { useState } from 'react';
import { Badge, Card, Col, Row, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import UserIcon from '../../images/icon-user.svg';

const Talent = ({ talent }) => {
  const [fav, setFav] = useState(false)
  const maxDescription = 130
  const maxSkills = 5
  const technologies = talent.technologies ? talent.technologies : []
  const programming_langs = talent.programming_langs ? talent.programming_langs : []
  const skills = [ ...technologies, ...programming_langs].slice(0, maxSkills)

  const seeMoreSkills = () => {
    console.log('more skills')
  }

  return (
    <Card className="my-3 p-3 rounded">
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
        <Row className="align-items-center mb-3">
          <Col sm={4}>
            <UserIcon />
          </Col>
          <Col sm={8}>
            <Card.Title as="div" className="opportunity-company mb-0">
              {talent.company.name}
            </Card.Title>
            <Card.Title as="div" className="opportunity-location">
              <FaMapMarkerAlt color="#264A75" /> {talent.company.location}
            </Card.Title>
          </Col>
        </Row>
        <Card.Title as="div" className="opportunity-title mb-0">
          {talent.name}
        </Card.Title>
        <Card.Text as="div" className="opportunity-description mb-3">
          {talent.description.slice(0, maxDescription)}<em>...</em>
        </Card.Text>
        <Card.Text>
          {skills && skills.map(({ name }) => (
            <Badge key={name} className="me-2 badge-redait p-2" pill bg="light" text="dark">
              <span>{name}</span>
            </Badge>
          ))}
          {skills && skills.length > 5 ?
            (
              <Button
                variant="light"
                size="sm"
                className="btn-see-more"
                onClick={() => seeMoreSkills()}
              >
                <span  className="me-2 badge-redait see-more p-2">Ver más</span>
              </Button>
            ):
              ''
          }
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Talent;
