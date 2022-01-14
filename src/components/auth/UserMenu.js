import React from 'react';
import { Col, Dropdown, DropdownButton, Image, Row } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { roleCoordinador } from '../../constants';

const UserMenu = ({ logoutHandler, user }) => {
  const userImg = user.profileImage ? (
    `${process.env.GATSBY_STRAPI_URL}${user.profileImage.formats.thumbnail.url}`
  ) : (
    <FaUserCircle />
  );

  return (
    <DropdownButton
      className="button-transparent"
      align="end"
      title={<FaUserCircle color="#fff" size={29} />}
    >
      <Dropdown.Header className="mb-2">
        <Row
          style={{ width: 'max-content', minWidth: '18.75rem' }}
          className="align-items-center"
        >
          <Col sm={4}>
            <Image src={userImg} roundedCircle fluid />
          </Col>
          <Col sm={8}>
            <p
              className="mb-0"
              style={{
                fontSize: '1.25rem',
                fontWeight: 500,
                color: '#353542',
              }}
            >
              {user.firstName}
            </p>
            <p className="mb-0" style={{ color: '#353542' }}>
              {user.email}
            </p>
          </Col>
        </Row>
      </Dropdown.Header>
      <Dropdown.Item>Perfil</Dropdown.Item>
      <Dropdown.Item>Publicaciones</Dropdown.Item>
      <Dropdown.Item>Favoritos</Dropdown.Item>
      <Dropdown.Item>Team</Dropdown.Item>
      {user.role.name === roleCoordinador && (
        <Dropdown.Item>Métricas</Dropdown.Item>
      )}
      <Dropdown.Divider />
      <Dropdown.Item onClick={logoutHandler}>Cerrar sesión</Dropdown.Item>
    </DropdownButton>
  );
};

export default UserMenu;
