import React from "react";
import { Row, Col } from 'react-bootstrap'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import EditIcon from '../../images/edit-icon.svg'
import AddIcon from '../../images/add-icon.svg'

const CardSection = ({ title, add, edit, css, children }) => {

  return (
    <Paper
      elevation={2}
      square
      className={'paper-container mt-4 ' + css}
    >
      <Row>
        <Col>
          <h6 className="title">{title}</h6>
        </Col>
        <Col xs="auto" className="edit g-0">
          <Avatar
            onClick={() => add()}
            className="avatar-edit"
          >
            <AddIcon />
          </Avatar>
        </Col>
        <Col xs="auto" className="edit g-0">
          <Avatar
            onClick={() => edit()}
            className="avatar-edit"
          >
            <EditIcon />
          </Avatar>
        </Col>
      </Row>
      { children }
    </Paper>
  );
};

export default CardSection;