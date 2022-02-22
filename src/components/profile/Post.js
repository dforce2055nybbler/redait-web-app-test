import React from "react";
import { Row, Col } from 'react-bootstrap'
import EditIcon from '../../images/edit-icon.svg'
import LocationIcon from '../../images/location-icon.svg'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'

const Post = ({ post, editPost }) => {

  return (
    <>
      <Row className="pt-1 justify-content-start g-0">
        <Col>
          <h6 className="title">{post.title}</h6>
        </Col>
      </Row>
      <Row className="mb-1 justify-content-start ">
        <Col lg={4} style={{ paddingRight: 0 }}>
          <span className="post-subtitle">
            {post.description}
          </span>
        </Col>
        <Col lg={2} style={{ paddingRight: 0 }}>
          <span className="post-location">
            <LocationIcon /> {post.location}
          </span>
        </Col>
        <Col lg={3} style={{ paddingRight: 0 }}>
          <span className="post-type">
            {post.type}
          </span>
        </Col>
        <Col xs="auto">
          <Chip
            className="post-status-chip"
            onClick={editPost}
            label={post.status}
            disabled={post.status === 'Pausada' ? true : false }
          />
        </Col>
        <Col xs="auto" style={{ padding: '0 0 .5rem 0', textAlign: 'center' }}>
          <Avatar
            onClick={() => editPost()}
            className="avatar-edit"
            style={{ marginTop: '.2rem 0'}}
          >
            <EditIcon />
          </Avatar>
        </Col>
      </Row>
    </>
  );
};

export default Post;