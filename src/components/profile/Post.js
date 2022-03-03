import React from "react";
import { Row, Col, Badge, Button } from 'react-bootstrap'
import EditIcon from '../../images/edit-icon.svg'
import LocationIcon from '../../images/location-icon.svg'
import { graphql, useStaticQuery } from 'gatsby';
import { formatDataSelect } from '../../helpers/formatDataSelect';

const Post = ({ post, editPost }) => {

  const data = useStaticQuery(graphql`
    query PostsCompanyData {
      allStrapiTypesOpportunites {
        edges {
          node {
            strapiId
            name
          }
        }
      }
    }
  `);
  const optionsTypesOpportunities = formatDataSelect(
    data.allStrapiTypesOpportunites.edges,
    'strapiId',
    'name'
  );
  console.log(optionsTypesOpportunities)
  const getPostType = (id) => {
    const result = optionsTypesOpportunities.find(item => item.value === id)
    if (result)
      return result.label
    else
      return id
  }
  return (
    <>
      <Row className="pt-1 justify-content-start g-0">
        <Col>
          <h6 className="title">{post.title}</h6>
        </Col>
      </Row>
      <Row className="mb-1 justify-content-start ">
        <Col lg={4} style={{ paddingRight: 0 }} className="my-auto">
          <span className="post-subtitle">
            {post.description}
          </span>
        </Col>
        <Col lg={2} style={{ paddingRight: 0 }} className="my-auto">
          <span className="post-location">
            <LocationIcon /> {post.location}
          </span>
        </Col>
        <Col lg={3} style={{ paddingRight: 0 }} className="my-auto">
          <span className="post-type">
            {getPostType(post.type)}
          </span>
        </Col>
        <Col xs="auto" className="my-auto" >
          <Badge
            className="chip post-status-chip disabled"
            className={post.status === 'Pausada' ? "chip post-status-chip disabled" : "chip post-status-chip" }
            onClick={(e) => editPost(post)}
          >
            {post.status}
          </Badge>
        </Col>
        <Col xs="auto" style={{ padding: '0', textAlign: 'center' }} className="my-auto">
          <Button
            className="avatar-edit-new button-transparent"
            aria-label="Menú de usuario"
            size="sm"
            onClick={() => editPost(post)}
          >
            <EditIcon />
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Post;