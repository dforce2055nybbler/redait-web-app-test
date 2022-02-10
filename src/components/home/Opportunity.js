import React, { useState } from 'react';
import { Badge, Card, Col, Image, Row, Button } from 'react-bootstrap';
import { FaMapMarkerAlt, FaRegHeart, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import userIcon from '../../images/icon-user.svg';

const Opportunity = ({ opportunity }) => {
  const [fav, setFav] = useState(false)
  const maxDescription = 130
  const maxSkills = 5
  const skills = opportunity.skills.slice(0, maxSkills)

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
            <Image src={userIcon} alt="Company Avatar" roundedCircle fluid />
          </Col>
          <Col sm={8}>
            <Card.Title as="div" className="opportunity-company mb-0">
              {opportunity.company.name}
            </Card.Title>
            <Card.Title as="div" className="opportunity-location">
              <FaMapMarkerAlt color="#264A75" /> {opportunity.company.location}
            </Card.Title>
          </Col>
        </Row>
        <Card.Title as="div" className="opportunity-title mb-0">
          {opportunity.title}
        </Card.Title>
        <Card.Text as="div" className="opportunity-description mb-3">
          {opportunity.description.slice(0, maxDescription)}<em>...</em>
        </Card.Text>
        <Card.Text>
          {skills.map(({ name }) => (
            <Badge key={name} className="me-2 badge-redait p-2" pill bg="light" text="dark">
              <span>{name}</span>
            </Badge>
          ))}
          {opportunity.skills.length > 5 ?
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

export default Opportunity;
