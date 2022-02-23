
import React from 'react'
import { Popover, OverlayTrigger, Button, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'gatsby'
import { roleCoordinador } from '../../constants';
import UserIcon from '../../images/icon-user.svg'
import { FaUserCircle, FaRegUser, FaRegBookmark } from 'react-icons/fa'
import { MdLogout, MdOutlineContentCopy, MdOutlineGroups } from "react-icons/md";

const UserMenu = ({ logoutHandler, user }) => {
  const userImg = user.profileImage
    ? `${process.env.GATSBY_STRAPI_URL}${user?.profileImage?.formats?.thumbnail?.url}`
    : null ;

  const popover = (
    <Popover id="popover-post">
      <div className="d-grid gap-0 menu-user-items">
        <Row className="align-items-center mb-4">
            <Col xs={4} className="g-0" style={{ textAlign: 'center' }}>
              { userImg ?
                <Image src={userImg} alt="User Avatar" roundedCircle fluid />
                :
                <UserIcon className="menu-user-usericon" size={36} />
              }
            </Col>
            <Col xs={7} className="g-0" style={{ textAlign: 'start' }}>
              <p className="menu-user-firstname mb-0">
                {user.firstName}
              </p>
              <p className="menu-user-email mb-0">
                {user.email}
              </p>
            </Col>
        </Row>
        
        <Link to="/company/infosis"> {/* TODO: Obtener la empesa del usuario logueado (?) */}
          <Button className="menu-user-item" size="lg">
            <Row className="align-items-center">
              <Col xs={2} className="g-0" style={{ textAlign: 'center' }}>
                <FaRegUser className="redit1-text" size={20}/>
              </Col>
              <Col xs={8} className="g-0" style={{ textAlign: 'start' }}>
                <span className='user-item-title'>Perfil</span>
              </Col>
            </Row>
          </Button>
        </Link>
        <Link to="/">
          <Button className="menu-user-item" size="lg">
            <Row className="align-items-center">
              <Col xs={2} className="g-0" style={{ textAlign: 'center' }}>
                <MdOutlineContentCopy className="redit1-text" size={20}/>
              </Col>
              <Col xs={8} className="g-0" style={{ textAlign: 'start' }}>
                <span className='user-item-title'>Publicaciones</span>
              </Col>
            </Row>
          </Button>
        </Link>
        <Link to="/">
          <Button className="menu-user-item" size="lg">
            <Row className="align-items-center">
              <Col xs={2} className="g-0" style={{ textAlign: 'center' }}>
                <FaRegBookmark className="redit1-text" size={20}/>
              </Col>
              <Col xs={8} className="g-0" style={{ textAlign: 'start' }}>
                <span className='user-item-title'>Guardados</span>
              </Col>
            </Row>
          </Button>
        </Link>
        <Link to="/">
          <Button className="menu-user-item" size="lg">
            <Row className="align-items-center">
              <Col xs={2} className="g-0" style={{ textAlign: 'center' }}>
                <MdOutlineGroups className="redit1-text" size={30}/>
              </Col>
              <Col xs={8} className="g-0" style={{ textAlign: 'start' }}>
                <span className='user-item-title'>Team</span>
              </Col>
            </Row>
          </Button>
        </Link>
        {user.role.name === roleCoordinador && (
          <Link to="/">
            <Button className="menu-user-item" size="lg">
              <Row className="align-items-center">
                <Col xs={2} className="g-0" style={{ textAlign: 'center' }}>
                  <FaRegUser className="redit1-text" size={20} />
                </Col>
                <Col xs={8} className="g-0" style={{ textAlign: 'start' }}>
                  <span className='user-item-title'>Metricas</span>
                </Col>
              </Row>
            </Button>
          </Link>
        )}
        <hr className="menu-user-hr"/>
        <Button key={999} className="menu-user-item" size="lg" onClick={logoutHandler}>
          <Row className="align-items-center">
            <Col xs={2} className="g-0" style={{ textAlign: 'center' }}>
              <MdLogout className="redit1-text" size={25}/>
            </Col>
            <Col xs={8} className="g-0" style={{ textAlign: 'start' }}>
              <span className='user-item-title'>Logout</span>
            </Col>
          </Row>
        </Button>
        
        
      </div>
    </Popover>
  );
  
  const Menu = () => (
    <OverlayTrigger trigger="click" placement="bottom-end" overlay={popover}>
      <Button
        className="button-transparent"
        aria-label="Menú de usuario"
        size="sm"
      >
        <FaUserCircle color="#657C97" size={29} />
      </Button>
    </OverlayTrigger>
  );
  
  return (
    <Menu />
  );
}

export default UserMenu;