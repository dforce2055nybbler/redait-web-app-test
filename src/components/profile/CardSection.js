import React from "react";
import { Row, Col, Card, Button } from 'react-bootstrap'
import EditIcon from '../../images/edit-icon.svg'
import AddIcon from '../../images/add-icon.svg'

const CardSection = ({ title, add, edit, css, children }) => {

  return (
    <Card
      className={'paper-container mt-4 ' + css}
    >
      <Row>
        <Col>
          <h6 className="title">{title}</h6>
        </Col>
        <Col xs="auto" className="edit g-0">
          <Button
            className="avatar-edit-new button-transparent"
            aria-label="Menú de usuario"
            size="sm"
            onClick={() => add()}
          >
            <AddIcon />
          </Button>
        </Col>
        <Col xs="auto" className="edit g-0">
          <Button
            className="avatar-edit-new button-transparent"
            aria-label="Menú de usuario"
            size="sm"
            onClick={() => edit()}
          >
            <EditIcon />
          </Button>
        </Col>
      </Row>
      { children }
    </Card>
  );
};

export default CardSection;