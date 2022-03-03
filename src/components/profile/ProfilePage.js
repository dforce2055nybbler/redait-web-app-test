import React from "react";
import { Row, Col, Container, Card, Image, Badge } from 'react-bootstrap'
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
import PostList from "./PostList"
import TeamList from "./TeamList";

const ProfilePage = ({ companyDetails }) => { 
  const socials = {
    linkedin: {
      url: companyDetails.linkedin_url,
    },
    instagram: {
      url: companyDetails.instagram_url,
    },
    facebook: {
      url: companyDetails.facebook_url,
    },
    twitter: {
      url: companyDetails.twitter_url,
    }
  }
  const company = { ...companyDetails, socials }

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
  const editPost = (post) => {
    console.log('editing post ...', post)
  }
  const handleService = (service) => {
    console.log('service ...', service)
  }
  return (
    <>
      <Container style={{ marginTop: '-1.5rem' }} className="profile-page">
        <Row className="justify-content-md-center mt-n4 pr-3 pl-3 mb-4">
          <Col style={{ position: 'relative' }}>
            <Card className="profile-hero-resume">
              <Row className="justify-content g-0">
                <Col xs={1}>
                  <div
                    className="avatar-container"
                  >
                    <Image
                      alt={ company.name }
                      className="avatar-image"
                      src={logo}
                    />
                  </div>
                </Col>
                <Col xs={4}>
                  <p className="title">{ company.name }</p>
                  <p className="subtitle">{ company.subtitle }</p>
                </Col>
                <Col xs="auto" className="contact-media g-0">
                  <div
                    onClick={() => sendEmail()}
                    className="avatar-info"
                  >
                    <EMailIcon />
                  </div>
                </Col>
                <Col className="contact-media g-0">
                  <span className="email">{ company.email }</span>
                </Col>
                <Col xs="auto" className="contact-media g-0">
                  <div
                    onClick={() => whatsAppMe()}
                    className="avatar-info"
                    style={{ paddingLeft: '.6rem', paddingRight: '.6rem'}}
                  >
                    <PhoneIcon />
                  </div>
                </Col>
                <Col className="contact-media g-0">
                  <span className="email">{ company.phone }</span>
                </Col>
                <Col xs="auto" className="contact-media g-0">
                  <div
                    onClick={() => goWebSite()}
                    className="avatar-info"
                  >
                    <WebIcon />
                  </div>
                </Col>
                <Col className="contact-media g-0">
                  <span className="web">{ company.domain }</span>
                </Col>
                <Col xs="auto" className="edit g-0">
                  <div
                    onClick={() => goWebSite()}
                    className="avatar-edit"
                  >
                    <EditIcon />
                  </div>
                </Col>
              </Row>
            </Card>
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
                          <WorldIcon /> {
                            company.languages.map((language, index) => {
                              if (index + 1 !== company.languages.length) {
                                return language.name + ' | '
                              } else {
                                return language.name
                              }
                            })
                          }
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
                          <Badge
                            className="chip"
                            bg="light"
                            text="dark"
                            onClick={() => handleService(service)}
                          >
                            {service.name}
                          </Badge>
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
                          {company.socials.linkedin.url &&
                            <Link to={company.socials.linkedin.url + '?referer=redit'} target="_blank" rel="redit">
                              <span className="social-medias">
                                <LinkedinIcon />
                              </span>
                            </Link>
                          }
                          {company.socials.instagram.url &&
                            <Link to={company.socials.instagram.url + '?referer=redit'} target="_blank" rel="redit">
                              <span className="social-medias">
                                <InstagramIcon />
                              </span>
                            </Link>
                          }
                          {company.socials.twitter.url &&
                            <Link to={company.socials.twitter.url + '?referer=redit'} target="_blank" rel="redit">
                              <span className="social-medias slim-icon">
                                <TwitterIcon />
                              </span>
                            </Link>
                          }
                          {company.socials.facebook.url &&
                            <Link to={company.socials.facebook.url + '?referer=redit'} target="_blank" rel="redit">
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
                      {company.software.map((software, index) => (
                        <Col key={software.id} lg={5} className="pt-3 mb-3 justify-content-center">
                          <Link to={software.url}>
                            <Image
                              thumbnail
                              alt={software.name}
                              src={software.img ? software.img : `https://picsum.photos/300/300?random=${index}` }
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