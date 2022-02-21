import React from "react";
import * as styles from "./profilepage.module.scss"
import { Row, Col, Container } from 'react-bootstrap'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import logo from '../../images/logo-infosis-light.png'
import EMailIcon from '../../images/email-icon.svg'
import PhoneIcon from '../../images/phone-icon.svg'
import WebIcon from '../../images/web-icon.svg'
import EditIcon from '../../images/edit-icon.svg'
const ProfilePage = () => {
  const company = {
    name: 'Infosis',
    subtitle: 'Tu socio tecnológico',
    email: 'contacto@infosis.com.ar',
    phone: '+54 9 11 4834 8383',
    web: 'www.infosis.com.ar',
  }
  const sendEmail = () => {
    console.log('sending email...')
  }
  const whatsAppMe = () => {
    console.log('sending whatsapp...')
  }
  const goWebSite = () => {
    console.log('go web ...')
  }
  return (
    <>
      <Container style={{ marginTop: '-1.5rem' }}>
        <Row className="justify-content-md-center mt-n4 pr-3 pl-3 mb-4">
          <Col style={{ position: 'relative' }}>
            <Paper className="profile-hero-resume" elevation={3} square>
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
                  <span className="web">{ company.web }</span>
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
      <Container fluid>
        <Row className="justify-content-md-center mt-n4 pr-3 pl-3 mb-4">
          <Col lg={9} className="profile-page">
            <Row>
              <Col>
                <div className={styles.flexWrapperTwenty}>
                  <div className={styles.relativeWrapperSix}>
                    <div className={styles.frame6}>
                      <div className={styles.line24} />
                      <div className={styles.group298}>
                        <div className={styles.group297}>
                          <div
                            className={styles.flexWrapperTwentyTwo}
                          >
                            <p className={styles.acercaDe}>
                              Acerca de
                            </p>
                            <img
                              alt=""
                              className={styles.vectorTwo}
                              src="https://static.overlay-tech.com/assets/3d947d76-e179-4b25-a8e7-0e8b287d8a9d.svg"
                            />
                            <img
                              alt=""
                              className={styles.vectorThree}
                              src="https://static.overlay-tech.com/assets/abc7db6a-5289-445d-b5cb-a8fd3b5397ad.svg"
                            />
                          </div>
                          <p
                            className={
                              styles.somosUnaEmpresaArgentinaCon20Anos
                            }
                          >
                            Somos una empresa Argentina con 20 años
                            de trayectoria en el sector IT,
                            especialistas en soluciones tecnológicas
                            para la gestión y administración de
                            puntos de venta. Incorporamos estándares
                            internacionales que garantizan la
                            excelencia en nuestros productos y
                            servicios. Acercamos tecnología de
                            avanzada para la gestión comercial en un
                            entorno integrable con soluciones
                            complementarias. Construimos la mejor
                            experiencia para clientes y usuarios.
                          </p>
                        </div>
                        <div className={styles.flexWrapperOne}>
                          <p className={styles.num100Empleados}>
                            100 empleados
                          </p>
                        </div>
                        <div className={styles.flexWrapperTwo}>
                          <img
                            alt=""
                            className={styles.vectorFour}
                            src="https://static.overlay-tech.com/assets/96505120-d6d3-40ce-a733-c18bf1f32cf5.svg"
                          />
                          <p className={styles.espanol}>Español</p>
                          <p className={styles.ingles}>Inglés</p>
                        </div>
                      </div>
                      <div className={styles.line25} />
                    </div>
                    <img
                      alt=""
                      className={styles.group231}
                      src="https://static.overlay-tech.com/assets/55eeca49-4e46-49da-b3b4-3f529002b091.svg"
                    />
                  </div>
                  <div className={styles.group296}>
                    <div className={styles.frame7} />
                    <p className={styles.servicios}>Servicios</p>
                    <img
                      alt=""
                      className={styles.vectorFive}
                      src="https://static.overlay-tech.com/assets/76f800d7-1609-4284-948d-5a3d225b5ab0.svg"
                    />
                    <img
                      alt=""
                      className={styles.vectorSix}
                      src="https://static.overlay-tech.com/assets/5b28f8cb-49c9-4027-8aec-1875a94d2a80.svg"
                    />
                    <div className={styles.group278}>
                      <p
                        className={
                          styles.desarrolloDeSoftwareAMedida
                        }
                      >
                        Desarrollo de Software a medida
                      </p>
                    </div>
                    <div className={styles.group294}>
                      <p
                        className={
                          styles.desarrolloDeSoftwareAMedida
                        }
                      >
                        Gestión de punto de ventas, distribuidores y
                        proveedores
                      </p>
                    </div>
                    <div className={styles.group279}>
                      <p
                        className={
                          styles.desarrolloDeSoftwareAMedida
                        }
                      >
                        Diseño y desarrollo UX UI de software
                      </p>
                    </div>
                    <div className={styles.group280}>
                      <p
                        className={
                          styles.desarrolloDeSoftwareAMedida
                        }
                      >
                        Testing QA
                      </p>
                    </div>
                    <div className={styles.group293}>
                      <p
                        className={
                          styles.desarrolloDeSoftwareAMedida
                        }
                      >
                        Gestión de marketing
                      </p>
                    </div>
                    <div className={styles.group295}>
                      <p
                        className={
                          styles.desarrolloDeSoftwareAMedida
                        }
                      >
                        Gestión logística
                      </p>
                    </div>
                  </div>
                  <div className={styles.flexWrapperFourteen}>
                    <p className={styles.publicaciones}>
                      Publicaciones
                    </p>
                    <div className={styles.line2} />
                    <p className={styles.desarrolladorJava}>
                      Desarrollador Java
                    </p>
                    <div className={styles.flexWrapperTwentyThree}>
                      <div className={styles.relativeWrapperThree}>
                        <p className={styles.buenosAiresArgentina}>
                          Buenos Aires, Argentina
                        </p>
                        <div className={styles.group298}>
                          <p
                            className={
                              styles.buscamosDesarrolladorJavaFullTimeH
                            }
                          >
                            Buscamos Desarrollador Java full time.
                            Home Office.
                          </p>
                          <img
                            alt=""
                            className={styles.vectorSeven}
                            src="https://static.overlay-tech.com/assets/904cecca-cb25-4698-82e3-0402dac22b98.svg"
                          />
                        </div>
                      </div>
                      <p className={styles.talento}>Talento</p>
                      <div className={styles.group280Two}>
                        <p className={styles.publicada}>
                          Publicada
                        </p>
                      </div>
                      <img
                        alt=""
                        className={styles.vectorEight}
                        src="https://static.overlay-tech.com/assets/89ac0749-aca7-4671-b51f-1938a6cade1c.svg"
                      />
                    </div>
                    <div className={styles.line2} />
                    <p className={styles.desarrolladorJava}>
                      Desarrollador Java
                    </p>
                    <div className={styles.flexWrapperTwentyThree}>
                      <div className={styles.relativeWrapperThree}>
                        <p className={styles.buenosAiresArgentina}>
                          Buenos Aires, Argentina
                        </p>
                        <div className={styles.group298}>
                          <p
                            className={
                              styles.buscamosDesarrolladorJavaFullTimeH
                            }
                          >
                            Buscamos Desarrollador Java full time.
                            Home Office.
                          </p>
                          <img
                            alt=""
                            className={styles.vectorSeven}
                            src="https://static.overlay-tech.com/assets/cc78a5e7-e29d-4154-866f-c1b76683150e.svg"
                          />
                        </div>
                      </div>
                      <p className={styles.partnership}>
                        Partnership
                      </p>
                      <div className={styles.group280Three}>
                        <p className={styles.publicada}>Pausada</p>
                      </div>
                      <img
                        alt=""
                        className={styles.vectorEight}
                        src="https://static.overlay-tech.com/assets/0af18b52-583d-49fe-8f4c-39b26f3ff300.svg"
                      />
                    </div>
                    <div className={styles.line2} />
                    <p className={styles.desarrolladorJava}>
                      Desarrollador Java
                    </p>
                    <div className={styles.flexWrapperTwentyThree}>
                      <div className={styles.relativeWrapperThree}>
                        <p className={styles.buenosAiresArgentina}>
                          Buenos Aires, Argentina
                        </p>
                        <div className={styles.group298}>
                          <p
                            className={
                              styles.buscamosDesarrolladorJavaFullTimeH
                            }
                          >
                            Buscamos Desarrollador Java full time.
                            Home Office.
                          </p>
                          <img
                            alt=""
                            className={styles.vectorSeven}
                            src="https://static.overlay-tech.com/assets/e5aec285-180e-442c-b433-fdffa6591747.svg"
                          />
                        </div>
                      </div>
                      <p className={styles.oportunidadDeNegocio}>
                        Oportunidad de negocio
                      </p>
                      <div className={styles.group280Two}>
                        <p className={styles.publicada}>
                          Publicado
                        </p>
                      </div>
                      <img
                        alt=""
                        className={styles.vectorEight}
                        src="https://static.overlay-tech.com/assets/18b3030d-ff25-4892-84bf-229e8610a701.svg"
                      />
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className={styles.flexWrapperTwenty}>
                  <div className={styles.relativeWrapperEight}>
                    <div className={styles.frame4}>
                      <div className={styles.rectangle228} />
                      <div className={styles.rectangle228} />
                      <div className={styles.rectangle228} />
                      <div className={styles.rectangle228} />
                    </div>
                    <div className={styles.groupThree}>
                      <p className={styles.redesSociales}>
                        Redes sociales
                      </p>
                      <img
                        alt=""
                        className={styles.vectorNine}
                        src="https://static.overlay-tech.com/assets/54b93a32-4749-42cd-af53-14cca0593717.svg"
                      />
                    </div>
                    <img
                      alt=""
                      className={styles.vectorTen}
                      src="https://static.overlay-tech.com/assets/3627442d-a210-4900-ae05-4ad2986b1847.svg"
                    />
                    <div className={styles.groupFour}>
                      <img
                        alt=""
                        className={styles.vectorEleven}
                        src="https://static.overlay-tech.com/assets/27606f52-5630-47be-b4d7-13a36a521b7e.svg"
                      />
                      <img
                        alt=""
                        className={styles.vectorTwelve}
                        src="https://static.overlay-tech.com/assets/8f489127-3a88-4c50-a7b9-a4a2fb26d039.svg"
                      />
                    </div>
                    <img
                      alt=""
                      className={styles.group332}
                      src="https://static.overlay-tech.com/assets/c8c2805e-4a57-4d9d-9a4d-b52ba69ca255.svg"
                    />
                    <img
                      alt=""
                      className={styles.vectorThirteen}
                      src="https://static.overlay-tech.com/assets/9058e58e-9405-4660-a9b1-5adcad8cee8f.svg"
                    />
                    <img
                      alt=""
                      className={styles.vectorFourteen}
                      src="https://static.overlay-tech.com/assets/92a7bf2d-83bb-482d-96de-e005123e4d20.svg"
                    />
                  </div>
                  <div className={styles.frame1}>
                    <div className={styles.group277}>
                      <div className={styles.flexWrapperTwentySix}>
                        <p className={styles.team}>Team</p>
                        <img
                          alt=""
                          className={styles.vectorFifteen}
                          src="https://static.overlay-tech.com/assets/ff97df2d-79dd-4f20-86cd-febc597db2cc.svg"
                        />
                        <img
                          alt=""
                          className={styles.vectorSixteen}
                          src="https://static.overlay-tech.com/assets/8b99cff8-2f15-4367-b488-568eb4acfa26.svg"
                        />
                      </div>
                      <div className={styles.group271}>
                        <div className={styles.flexWrapperThree}>
                          <img
                            alt=""
                            className={styles.ellipse7}
                            src="https://static.overlay-tech.com/assets/ecee0d93-03e4-4f72-b374-dd39cfd89efb.png"
                          />
                        </div>
                        <div
                          className={styles.flexWrapperTwentySeven}
                        >
                          <p className={styles.marianaCastillo}>
                            Mariana Castillo
                          </p>
                          <p className={styles.disenadoraUxUi}>
                            Diseñadora UX UI
                          </p>
                        </div>
                      </div>
                      <div className={styles.group271}>
                        <div className={styles.flexWrapperThree}>
                          <img
                            alt=""
                            className={styles.ellipse7}
                            src="https://static.overlay-tech.com/assets/b4e5a37a-0710-405a-a7e6-d30850414d01.png"
                          />
                        </div>
                        <div
                          className={styles.flexWrapperTwentyEight}
                        >
                          <p className={styles.marianaCastillo}>
                            Claudia Sousa
                          </p>
                          <p className={styles.disenadoraUxUi}>
                            Diseñadora UX UI
                          </p>
                        </div>
                      </div>
                      <div className={styles.group271}>
                        <div className={styles.flexWrapperThree}>
                          <img
                            alt=""
                            className={styles.ellipse7}
                            src="https://static.overlay-tech.com/assets/20e1210b-54b5-417f-8c6b-51aeb5f05387.png"
                          />
                        </div>
                        <div
                          className={styles.flexWrapperTwentyEight}
                        >
                          <p className={styles.marianaCastillo}>
                            Luis Carlos Campos
                          </p>
                          <p className={styles.disenadoraUxUi}>
                            Diseñadora UX UI
                          </p>
                        </div>
                      </div>
                      <div className={styles.group271}>
                        <div className={styles.flexWrapperThree}>
                          <img
                            alt=""
                            className={styles.ellipse7}
                            src="https://static.overlay-tech.com/assets/396ad9b8-d35c-429c-932c-e1a3e3805f38.png"
                          />
                        </div>
                        <div
                          className={styles.flexWrapperTwentyEight}
                        >
                          <p className={styles.marianaCastillo}>
                            Victor Andrade
                          </p>
                          <p className={styles.disenadoraUxUi}>
                            Diseñadora UX UI
                          </p>
                        </div>
                      </div>
                      <div className={styles.group271}>
                        <div className={styles.flexWrapperThree}>
                          <img
                            alt=""
                            className={styles.ellipse7}
                            src="https://static.overlay-tech.com/assets/8bcd1fe0-b9c8-492f-a17c-84a5c19735f4.png"
                          />
                        </div>
                        <div
                          className={styles.flexWrapperTwentyEight}
                        >
                          <p className={styles.marianaCastillo}>
                            Karina Silva
                          </p>
                          <p className={styles.disenadoraUxUi}>
                            Diseñadora UX UI
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.relativeWrapperEight}>
                    <div className={styles.frame4Two}>
                      <div className={styles.flexWrapperThirtyTwo}>
                        <img
                          alt=""
                          className={
                            styles.logoZeusGestionOriginal21
                          }
                          src="https://static.overlay-tech.com/assets/0b46ab52-5fbb-4e4f-863e-f86a5a18f8d7.png"
                        />
                        <img
                          alt=""
                          className={styles.logoGris1}
                          src="https://static.overlay-tech.com/assets/4e6369e1-3ae7-448c-a04c-c4b9ebd88455.png"
                        />
                      </div>
                      <div
                        className={styles.flexWrapperThirtyThree}
                      >
                        <img
                          alt=""
                          className={styles.logoYaxDesktop1}
                          src="https://static.overlay-tech.com/assets/969e0001-7667-481e-bd94-84b10d208de3.png"
                        />
                        <div className={styles.pergoColor1}>
                          <img
                            alt=""
                            className={styles.layer1}
                            src="https://static.overlay-tech.com/assets/bae06f9f-b8f0-437c-ba62-a8e40ac7fc07.svg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.groupThree}>
                      <p className={styles.software}>Software</p>
                      <img
                        alt=""
                        className={styles.vectorNine}
                        src="https://static.overlay-tech.com/assets/ca21753c-c860-4898-9165-f276f88f79e9.svg"
                      />
                    </div>
                    <img
                      alt=""
                      className={styles.vectorSeventeen}
                      src="https://static.overlay-tech.com/assets/a16311fa-d5dc-42b9-830d-116e7ffe3c99.svg"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;