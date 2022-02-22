import React from "react";
import { Row, Col, Container } from 'react-bootstrap'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import logo from '../../images/logo-infosis-light.png'
import EMailIcon from '../../images/email-icon.svg'
import PhoneIcon from '../../images/phone-icon.svg'
import WebIcon from '../../images/web-icon.svg'
import EditIcon from '../../images/edit-icon.svg'
import TeamIcon from '../../images/team-icon.svg'
import WorldIcon from '../../images/world-icon.svg'
import LinkedinIcon from '../../images/linkedin-icon.svg'
import InstagramIcon from '../../images/instagram-icon.svg'
import TwitterIcon from '../../images/twitter-icon.svg'
import FacebookIcon from '../../images/facebook-icon.svg'
import CardSection from './CardSection'
import { Link } from 'gatsby'
import Chip from '@mui/material/Chip'
import PostList from "./PostList"
import TeamList from "./TeamList";

const ProfilePage = ({ companyDetails }) => { 
  console.log('companyDetails', companyDetails)
  const company = {
    name: 'Infosis',
    subtitle: 'Tu socio tecnológico',
    email: 'contacto@infosis.com.ar',
    phone: '+54 9 11 4834 8383',
    domain: 'www.infosis.com.ar',
    description: 'Somos una empresa Argentina con 20 años de trayectoria en el sector IT, especialistas en soluciones tecnológicas para la gestión y administración de puntos de venta. Incorporamos estándares internacionales que garantizan la excelencia en nuestros productos y servicios. Acercamos tecnología de avanzada para la gestión comercial en un entorno integrable con soluciones complementarias. Construimos la mejor experiencia para clientes y usuarios.',
    employees: 100,
    languages: 'Español | Inglés',
    socials: {
      linkedin: {
        url: '/profile',
      },
      instagram: {
        url: '/profile',
      },
      facebook: {
        url: '/profile',
      },
      twitter: {
        url: '/profile',
      }
    },
    services: [
      { id: 1, name: 'Desarrollo de Software a medida' },
      { id: 2, name: 'Diseño y desarrollo UX UI de software' },
      { id: 3, name: 'Testing QA' },
      { id: 4, name: 'Gestión de marketing' },
      { id: 5, name: 'Gestión de punto de ventas, distribuidores y proveedores' },
      { id: 6, name: 'Gestión de punto de ventas, distribuidores y proveedoresGestión logística' }
    ],
    posts: [
      { id: 1, title: 'Desarrollo Javascript', description: 'Buscamos Desarrollador Java full time. Home Office.', location: 'Buenos Aires, Argentina', type: 'Talento', status: 'Publicada' },
      { id: 2, title: 'Desarrollo Java', description: 'Buscamos Desarrollador Java full time. Home Office.', location: 'Buenos Aires, Argentina', type: 'Partnership', status: 'Pausada' },
      { id: 3, title: 'Desarrollo Java', description: 'Buscamos Desarrollador Java full time. Home Office.', location: 'Buenos Aires, Argentina', type: 'Oportunidad de negocio', status: 'Publicada' },
    ],
    team: [
      { id: 1, name: 'Mariana Castillo', job: 'Diseñadora UX UI', img: 'https://static.overlay-tech.com/assets/b4e5a37a-0710-405a-a7e6-d30850414d01.png' },
      { id: 2, name: 'Claudia Sousa', job: 'Diseñadora UX UI', img: 'https://static.overlay-tech.com/assets/20e1210b-54b5-417f-8c6b-51aeb5f05387.png' },
      { id: 3, name: 'Luis Carlos Campos', job: 'Diseñadora UX UI', img: 'https://static.overlay-tech.com/assets/396ad9b8-d35c-429c-932c-e1a3e3805f38.png' },
      { id: 4, name: 'Victor Andrade', job: 'Diseñadora UX UI', img: 'https://static.overlay-tech.com/assets/8bcd1fe0-b9c8-492f-a17c-84a5c19735f4.png' },
      { id: 5, name: 'Karina Silva', job: 'Diseñadora UX UI', img: 'https://static.overlay-tech.com/assets/ecee0d93-03e4-4f72-b374-dd39cfd89efb.png' },
    ],
    software: [
      { id: 1, name: 'Zeus Gestión', img: 'https://static.overlay-tech.com/assets/0b46ab52-5fbb-4e4f-863e-f86a5a18f8d7.png', url: '#' },
      { id: 2, name: 'BillApp', img: 'https://static.overlay-tech.com/assets/4e6369e1-3ae7-448c-a04c-c4b9ebd88455.png', url: '#' },
      { id: 3, name: 'YAX', img: 'https://static.overlay-tech.com/assets/969e0001-7667-481e-bd94-84b10d208de3.png', url: '#' },
      { id: 4, name: 'Pergo', img: 'https://static.overlay-tech.com/assets/bae06f9f-b8f0-437c-ba62-a8e40ac7fc07.svg', url: '#' },
    ]
  }
  const sendEmail = () => {
    console.log('sending email...')
  }
  const whatsAppMe = () => {
    console.log('sending whatsapp...')
  }
  const goWebSite = () => {
    console.log('go domain ...', company.domain)
  }
  const add = () => {
    console.log('adding something ...')
  }
  const edit = () => {
    console.log('editing ...')
  }
  const editPost = () => {
    console.log('editing post ...')
  }
  return (
    <>
      <Container style={{ marginTop: '-1.5rem' }} className="profile-page">
        <Row className="justify-content-md-center mt-n4 pr-3 pl-3 mb-4">
          <Col style={{ position: 'relative' }}>
            <Paper className="profile-hero-resume" elevation={2} square>
              <Row className="justify-content g-0">
                <Col xs={1}>
                  <Avatar className="avatar-container">
                    <img
                      alt=""
                      className="avatar-image"
                      src={logo}
                    />
                  </Avatar>
                </Col>
                <Col xs={4}>
                  <p className="title">{ company.name }</p>
                  <p className="subtitle">{ company.subtitle }</p>
                </Col>
                <Col xs="auto" className="contact-media g-0">
                  <Avatar
                    onClick={() => sendEmail()}
                    className="avatar-info"
                  >
                    <EMailIcon />
                  </Avatar>
                </Col>
                <Col className="contact-media g-0">
                  <span className="email">{ company.email }</span>
                </Col>
                <Col xs="auto" className="contact-media g-0">
                  <Avatar
                    onClick={() => whatsAppMe()}
                    className="avatar-info"
                  >
                    <PhoneIcon />
                  </Avatar>
                </Col>
                <Col className="contact-media g-0">
                  <span className="email">{ company.phone }</span>
                </Col>
                <Col xs="auto" className="contact-media g-0">
                  <Avatar
                    onClick={() => goWebSite()}
                    className="avatar-info"
                  >
                    <WebIcon />
                  </Avatar>
                </Col>
                <Col className="contact-media g-0">
                  <span className="web">{ company.domain }</span>
                </Col>
                <Col xs="auto" className="edit g-0">
                  <Avatar
                    onClick={() => goWebSite()}
                    className="avatar-edit"
                  >
                    <EditIcon />
                  </Avatar>
                </Col>
              </Row>
            </Paper>
          </Col>
        </Row>
      </Container>
      <Container fluid className="profile-page">
        <Row className="justify-content-md-center mt-n4 pr-3 pl-3 mb-4 g-0">
          <Col lg={9}>
            <Row>
              <Col lg={8} className="left-col">
                {company.description &&
                  <CardSection
                    title="Acerca de"
                    add={add}
                    edit={edit}
                    css="about"
                  >
                    <Row style={{ height: '60px' }} className="pt-3 mb-3 justify-content-start">
                      <Col xs="auto">
                        <span className="employees">
                          <TeamIcon /> {company.employees} empleados
                        </span>
                      </Col>
                      <Col xs="auto">
                        <span className="employees">
                          <WorldIcon /> {company.languages}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p className="description">{company.description}</p>
                      </Col>
                    </Row>
                  </CardSection>
                }

                {company.services &&
                  <CardSection
                    title="Servicios"
                    add={add}
                    edit={edit}
                    css="services"
                  >
                    <Row className="pt-3 mb-3 justify-content-start">
                      {company.services.map(service => (
                        <Col key={service.id} xs="auto">
                          <Chip className="chip" label={service.name} />
                        </Col>
                      ))}
                    </Row>

                  </CardSection>
                }

                {company.posts &&
                  <CardSection
                    title="Publicaciones"
                    add={add}
                    edit={edit}
                    css="posts"
                  >
                    <hr className="divider" />
                    <PostList
                      posts={company.posts}
                      editPost={editPost} 
                    />
                  </CardSection>
                }
              </Col>
              <Col lg={4} className="right-col">
                {company.socials &&
                  <CardSection
                    title="Redes sociales"
                    add={add}
                    edit={edit}
                    css="socials"
                  >
                    <Row style={{ height: '60px' }} className="pt-3 mb-3 justify-content-start">
                      {company.socials &&
                        <Col xs="auto">
                          {company.socials.linkedin &&
                            <Link to={company.socials.linkedin.url}>
                              <span className="social-medias">
                                <LinkedinIcon />
                              </span>
                            </Link>
                          }
                          {company.socials.instagram &&
                            <Link to={company.socials.instagram.url}>
                              <span className="social-medias">
                                <InstagramIcon />
                              </span>
                            </Link>
                          }
                          {company.socials.twitter &&
                            <Link to={company.socials.twitter.url}>
                              <span className="social-medias slim-icon">
                                <TwitterIcon />
                              </span>
                            </Link>
                          }
                          {company.socials.facebook &&
                            <Link to={company.socials.facebook.url}>
                              <span className="social-medias slim-icon">
                                <FacebookIcon />
                              </span>
                            </Link>
                          }
                        </Col>
                      }
                    </Row>
                  </CardSection>
                }

                {company.team &&
                  <CardSection
                    title="Team"
                    add={add}
                    edit={edit}
                    css="team"
                  >
                    <Row className="pt-3 mb-3 justify-content-start">
                      <TeamList team={company.team} />
                    </Row>
                  </CardSection>
                }

                {company.software &&
                  <CardSection
                    title="Software"
                    add={add}
                    edit={edit}
                    css="software"
                  >
                    <Row className="pt-3 mb-3 justify-content-center">
                      {company.software.map(software => (
                        <Col key={software.id} lg={5} className="pt-3 mb-3 justify-content-center">
                          <Link to={software.url}>
                            <img
                              alt={software.name}
                              src={software.img}
                              className="software-logo"
                            />
                          </Link>
                        </Col>
                      ))}
                    </Row>
                  </CardSection>
                }
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;