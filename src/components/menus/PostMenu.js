
import React from 'react'
import { Popover, OverlayTrigger, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'gatsby'
import talentIcon from '../../images/talent-icon.png'
import rightArrowIcon from '../../images/right-arrow-icon.png'
import eventIcon from '../../images/event-icon.png'
import businessOportunityIcon from '../../images/business-oportunity-icon.png'
import partnershipIcon from '../../images/partnership-icon.png'
const PostMenu = () => {
  // TODO: Obtener botones y detalles de cada uno
  const buttons = [
    {
      id: 1,
      title: 'Talento',
      subtitle: 'Alguna bajada sobre este item',
      src: talentIcon,
      to:'/post/talent'
    },
    {
      id: 2,
      title: 'Partnership',
      subtitle: 'Alguna bajada sobre este item',
      src: partnershipIcon,
      to:'/post/partnership'
    },
    {
      id: 3,
      title: 'Oportunidades de negocio',
      subtitle: 'Alguna bajada sobre este item',
      src: businessOportunityIcon,
      to:'/post/business-opportunity'
    },
    {
      id: 4,
      title: 'Eventos',
      subtitle: 'Alguna bajada sobre este item',
      src: eventIcon,
      to:'/'
    }
  ]
  const popover = (
    <Popover id="popover-post">
      <div className="d-grid gap-2 menu-post-items">
        {buttons.map(button => (
          <Link key={ button.id } to={ button.to }>
            <Button className="menu-post-item" size="lg">
              <Row className="align-items-center">
                <Col xs={2}>
                  <img
                    alt=""
                    className="post-item-left-icon"
                    src={ button.src }
                  />
                </Col>
                <Col xs={8} style={{ textAlign: 'start' }}>
                  <Row>
                    <Col style={{ lineHeight: '40px' }}>
                      <span className='post-item-title'>{ button.title }</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ lineHeight: '10px' }}>
                      <span className='post-item-subtitle'>{ button.subtitle }</span>
                    </Col>
                  </Row>
                </Col>
                <Col xs={2}>
                  <img
                    alt=""
                    className="post-item-right-icon"
                    src={rightArrowIcon}
                  />
                </Col>
              </Row>
            </Button>
          </Link>
        ))}
      </div>
    </Popover>
  );
  
  const Menu = () => (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <Button
        className="btn-light-main-naranjaredait"
        aria-label="Publicar"
        style={{ paddingInline: '2rem' }}
      >
        Publicar
      </Button>
    </OverlayTrigger>
  );
  
  return (
    <Menu />
  );
}

export default PostMenu;