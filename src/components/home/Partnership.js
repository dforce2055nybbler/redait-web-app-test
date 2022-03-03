import React, { useState } from 'react'
import { Card, Col, Row, Image } from 'react-bootstrap'
import {  FaBookmark, FaRegBookmark } from 'react-icons/fa'
import logo from '../../images/logo-zeus.png'
const Product = ({ opportunity }) => {
  const [fav, setFav] = useState(false)
  const maxDescription = 130


  return (
    <Card className="my-3 p-3 rounded product">
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
            <div className="avatar-container">
              <Image
                thumbnail
                alt=""
                className="avatar-image"
                src={logo}
              />
            </div>
          </Col>
        </Row>
        <Card.Title as="div" className="opportunity-title mb-0">
          {opportunity.name}
        </Card.Title>
        <Card.Text as="div" className="opportunity-description mb-3">
          {opportunity.description.slice(0, maxDescription)}<em>...</em>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
