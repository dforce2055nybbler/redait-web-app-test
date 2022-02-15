
import React from 'react'
import { Popover, OverlayTrigger, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'gatsby'
import talentIcon from '../../images/talent-icon.svg'
import rightArrowIcon from '../../images/right-arrow-icon.svg'
import eventIcon from '../../images/event-icon.svg'
import businessOportunityIcon from '../../images/business-oportunity-icon.svg'
import partnershipIcon from '../../images/partnership-icon.svg'
const MenuPost = () => {
  // TODO: Obtener botones y detalles de cada uno
  const buttons = [
    {
      id: 1,
      title: 'Talento',
      subtitle: 'Alguna bajada sobre este item',
      src: talentIcon,
      to:'/post/talents'
    },
    {
      id: 2,
      title: 'Partnership',
      subtitle: 'Alguna bajada sobre este item',
      src: partnershipIcon,
      to:'/'
    },
    {
      id: 3,
      title: 'Oportunidades de negocio',
      subtitle: 'Alguna bajada sobre este item',
      src: businessOportunityIcon,
      to:'/'
    },
    {
      id: 4,
      title: 'Eventos',
      subtitle: 'Alguna bajada sobre este item',
      src: eventIcon,
      to:'/'
    },
    {
      id: 5,
      title: 'Talento',
      subtitle: 'Alguna bajada sobre este item',
      src: talentIcon,
      to:'/'
    },
  ]
  const popover = (
    <Popover id="popover-post">
      <div className="d-grid gap-2 menu-items">
        {buttons.map(button => (
          <Link key={ button.id } to={ button.to }>
            <Button className="menu-item" size="lg">
              <Row className="align-items-center">
                <Col xs={2}>
                  <img
                    alt=""
                    className="item-left-icon"
                    src={ button.src }
                  />
                </Col>
                <Col xs={8} style={{ textAlign: 'start' }}>
                  <Row>
                    <Col style={{ lineHeight: '40px' }}>
                      <span className='item-title'>{ button.title }</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ lineHeight: '10px' }}>
                      <span className='item-subtitle'>{ button.subtitle }</span>
                    </Col>
                  </Row>
                </Col>
                <Col xs={2}>
                  <img
                    alt=""
                    className="item-right-icon"
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

export default MenuPost;