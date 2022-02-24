
import React, { useState } from 'react';
import { Popover, OverlayTrigger, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'gatsby'
import { FaCommentDots } from 'react-icons/fa';
import Badge from '@mui/material/Badge';
import logoIcon from '../../images/logo-infosis-light.png'
import logoInfosis from '../../images/logo-infosis-light.png'
import logoBlimop from '../../images/logo-blimop.png'
import logoCloudSpace from '../../images/logo-grupo-cloudspace.png'
import logoGLGroup from '../../images/logo-gl-group.png'
import logoGlobant from '../../images/logo-globant.png'
import logoClarika from '../../images/logo-clarika.png'
import rightArrowIcon from '../../images/right-arrow-icon.png'
import Avatar from '@mui/material/Avatar';


const MessagesMenu = () => {
  const [notifications, setNotifications] = useState(3)
  const maxTitle = 30
  const maxSubtitle = 46
  // TODO: Obtener botones y detalles de cada uno
  const buttons = [
    {
      id: 1,
      company: 'Infosis',
      title: 'Desarrolador Java',
      subtitle: 'Buscamos Desarrollador Java full time. Home Office para importante empresa multinacional',
      src: logoInfosis,
      bgcolor: 'dark-background',
      lastUpdate: '15 de Diciembre de 2021',
      to:'/messages'
    },
    {
      id: 2,
      company: 'Blimop',
      title: 'Desarrolador Java',
      subtitle: 'Buscamos Desarrollador Java full time. Home Office para importante empresa multinacional',
      src: logoBlimop,
      bgcolor: 'none',
      lastUpdate: '15 de Diciembre de 2021',
      to:'/messages'
    },
    {
      id: 3,
      company: 'Grupo Cloudspace',
      title: 'Desarrolador Java',
      subtitle: 'Buscamos Desarrollador Java full time. Home Office para importante empresa multinacional',
      src: logoCloudSpace,
      bgcolor: 'none',
      lastUpdate: '15 de Diciembre de 2021',
      to:'/messages'
    },
    {
      id: 4,
      company: 'G&L Group',
      title: 'Desarrolador Java',
      subtitle: 'Buscamos Desarrollador Java full time. Home Office para importante empresa multinacional',
      src: logoGLGroup,
      bgcolor: 'blue-gl-background',
      lastUpdate: '15 de Diciembre de 2021',
      to:'/messages'
    },
    {
      id: 5,
      company: 'Globant',
      title: 'Desarrolador Java',
      subtitle: 'Buscamos Desarrollador Java full time. Home Office para importante empresa multinacional',
      src: logoGlobant,
      bgcolor: 'none',
      lastUpdate: '15 de Diciembre de 2021',
      to:'/messages'
    },
    {
      id: 6,
      company: 'Etixen',
      title: 'Desarrolador Java',
      subtitle: 'Buscamos Desarrollador Java full time. Home Office para importante empresa multinacional',
      src: '',
      bgcolor: 'blue-redit1-background',
      lastUpdate: '15 de Diciembre de 2021',
      to:'/messages'
    },
    {
      id: 7,
      company: 'Clarika',
      title: 'Desarrolador Java',
      subtitle: 'Buscamos Desarrollador Java full time. Home Office para importante empresa multinacional',
      src: logoClarika,
      bgcolor: '',
      lastUpdate: '15 de Diciembre de 2021',
      to:'/messages'
    },
  ]
  const popover = (
    <Popover id="popover-notifications" className="menu-notifications">
      <Row className="title">
        <Col xs="6">
          <h5 className="subheader">Mensajes</h5>
        </Col>
        <Col xs="auto">
          <Link to="/" className="actions left">
            <h6>Nuevo Mensaje</h6>
          </Link>
        </Col>
        <Col xs="auto" style={{ padding: 0 }}>
          <div className="d-flex" style={{ height: '35px' }}>
            <div className="vr"></div>
          </div>
        </Col>
        <Col xs="auto">
          <Link to="/" className="actions">
            <h6>Ver todos</h6>
          </Link>
        </Col>
      </Row>
      <hr className="menu-user-hr"/>
      <div className="d-grid gap-0 items">
        {buttons.map(button => (
          <Link key={button.id} to={button.to} style={{ borderBottom: '1px solid #E5E5E5'}}>
            <Button className="item" size="lg">
              <Row className="justify-content-md-end">
                <Col xs={6} className="d-flex flex-column justify-content-end ">
                  <span className="date">{button.lastUpdate}</span>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs="auto" style={{ verticalAlign: 'middle' }}>
                  <span className="dot">&nbsp;</span>
                </Col>
                <Col xs="auto" style={{ paddingLeft: '.6rem', paddingRight: '0' }}>
                  <Avatar className="avatar-container">
                    {button.src ? 
                      <img
                        alt=""
                        className={ 'item-left-icon ' + button.bgcolor }
                        src={ button.src }
                      />
                    :
                      button.company[0]
                    }
                  </Avatar>
                </Col>
                <Col xs={8} style={{ textAlign: 'start' }}>
                  <Row>
                    <Col style={{ lineHeight: '10px' }}>
                      <span className='item-company'>{ button.company }</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ lineHeight: '40px' }}>
                      <span className='item-title'>{ button.title.slice(0, maxTitle) }</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ lineHeight: '10px' }}>
                      <span className='item-subtitle'>{ button.subtitle.slice(0, maxSubtitle) } ...</span>
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
        className="button-transparent"
        aria-label="Menú de mensajes"
        size="sm"
      >
        <Badge badgeContent={notifications} className="notification-badge">
          <FaCommentDots color="#657C97" size={29} />
        </Badge>
      </Button>
    </OverlayTrigger>
  );
  
  return (
    <Menu />
  );
}

export default MessagesMenu;