import React, { useState } from 'react';
import { Button, Form, Row, Col} from 'react-bootstrap';
import Loader from '../ui/loader';

const ConfirmationForm = ({
  values,
  handleSubmitForm,
  handleBack,
  title = 'Confirmación',
  type
}) => {
  const [loading, setLoading] = useState(false);
  const showBackButton = false
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    handleSubmitForm(true)
    setLoading(false)
  }
  return (
    <>
      <h5 className="header-forms mb-4 mt-4">
        { title }
      </h5>
      <Form
        className="p-4 m-4"
        style={{ backgroundColor: '#fff', borderRadius: '5px'}}
        noValidate
        onSubmit={handleSubmit}
        >
        {loading ? (
          <Loader />
        ) : (
          <>
            <h5 className="header-forms azulredit-text mb-4 mt-4">
              Información de contacto
            </h5>
            <Row className="g-0 pb-0 mb-0 pt-2">
              <Col>
                <Form.Label className="form-label redit1-text mb-1">Empresa</Form.Label>
              </Col>
            </Row>
            <Row className="g-0 pt-0 mt-0">
              <Col>
                <Form.Label className="form-label redit2-text mb-1">{ values.contact.empresa.label }</Form.Label>
              </Col>
            </Row>
            <Row className="g-0 pb-0 mb-0 pt-2">
              <Col>
                <Form.Label className="form-label redit1-text mb-1">Contacto</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="form-label redit2-text mb-1">{ values.contact.contacto }</Form.Label>
              </Col>
            </Row>
            <Row className="g-0 pb-0 mb-0 pt-2">
              <Col>
                <Form.Label className="form-label redit1-text mb-1">Email</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="form-label redit2-text mb-1">{ values.contact.email }</Form.Label>
              </Col>
            </Row>
            <Row className="g-0 pb-0 mb-0 pt-2">
              <Col>
                <Form.Label className="form-label redit1-text mb-1">Teléfono</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="form-label redit2-text mb-1">{ values.contact.telefono }</Form.Label>
              </Col>
            </Row>
            {values.technologies &&
              <>
              <h5 className="header-forms azulredit-text mb-4 mt-4">
                Tecnologías y habilidades requeridas
              </h5>
              <Row className="g-0 pb-0 mb-0 pt-2">
                <Col>
                  <Form.Label className="form-label redit1-text mb-1">Tecnologías</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="form-label redit2-text mb-1">
                      {values.technologies?.tecnologias?.map(tecnologia => (
                        <span key={tecnologia.value} style={{ padding: '0 .5rem 0 0' }}>
                          {tecnologia.label}
                        </span>
                      )) }
                  </Form.Label>
                </Col>
              </Row>
              <Row className="g-0 pb-0 mb-0 pt-2">
                <Col>
                  <Form.Label className="form-label redit1-text mb-1">Lenguajes</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="form-label redit2-text mb-1">
                    { values.technologies?.lenguajes?.map(lenguaje => (
                      <span key={lenguaje.value} style={{ padding: '0 .5rem 0 0' }}>
                        {lenguaje.label}
                      </span>
                      )) }
                  </Form.Label>
                </Col>
              </Row>
              <Row className="g-0 pb-0 mb-0 pt-2">
                <Col>
                  <Form.Label className="form-label redit1-text mb-1">Experiencia</Form.Label>
                </Col>
              </Row>
              <Row>
                  <Col>
                  <Form.Label className="form-label redit2-text mb-1">{ values.technologies?.experiencia?.label }</Form.Label>
                </Col>
              </Row>
              <Row className="g-0 pb-0 mb-0 pt-2">
                <Col>
                  <Form.Label className="form-label redit1-text mb-1">Duración</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="form-label redit2-text mb-1">{ values.technologies.duracion }</Form.Label>
                </Col>
              </Row>
              <Row className="g-0 pb-0 mb-0 pt-2">
                <Col>
                  <Form.Label className="form-label redit1-text mb-1">Otras habilidades requeridas</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  {/* TODO: validar cantidad de caracteres para experiencia .slice(0, maxCharacters)*/}
                  <Form.Label className="form-label redit2-text mb-1">{ values.technologies.otrasHabilidades }</Form.Label>
                </Col>
              </Row>
            </>
          }
          {values.type === 'event' &&
            <>
              <h5 className="header-forms azulredit-text mb-4 mt-4">
                Información del evento
              </h5>
              <Row className="g-0 pb-0 mb-0 pt-2">
                <Col>
                  <Form.Label className="form-label redit1-text mb-1">Nombre del evento</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="form-label redit2-text mb-1">{ values.perfil?.nombre }</Form.Label>
                </Col>
              </Row>
              <Row className="g-0 pb-0 mb-0 pt-2">
                <Col>
                  <Form.Label className="form-label redit1-text mb-1">Fecha</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="form-label redit2-text mb-1">{ values.perfil?.fecha }</Form.Label>
                </Col>
              </Row>
              <Row className="g-0 pb-0 mb-0 pt-2">
                <Col>
                  <Form.Label className="form-label redit1-text mb-1">Lugar</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="form-label redit2-text mb-1">{ values.perfil?.lugar }</Form.Label>
                </Col>
              </Row>
              <Row className="g-0 pb-0 mb-0 pt-2">
                <Col>
                  <Form.Label className="form-label redit1-text mb-1">Tipo de Evento</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="form-label redit2-text mb-1">{ values.perfil?.tipoEvento }</Form.Label>
                </Col>
              </Row>
              <Row className="g-0 pb-0 mb-0 pt-2">
                <Col>
                  <Form.Label className="form-label redit1-text mb-1">Valor</Form.Label>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label className="form-label redit2-text mb-1">{ values.perfil?.valorUSD }</Form.Label>
                </Col>
                </Row>
              </>
            }
            { values.aditionals &&
              <>
                <h5 className="header-forms azulredit-text mb-4 mt-4">
                  Información adicional
                </h5>
                <Row className="g-0 pb-0 mb-0 pt-2">
                  <Col>
                    <Form.Label className="form-label redit1-text mb-1">Vertical</Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label className="form-label redit2-text mb-1">
                      { values.aditionals?.verticales?.map(vertical => (
                        <span key={vertical.value} style={{ padding: '0 .5rem 0 0' }}>
                          {vertical.label}
                        </span>
                        )) }
                    </Form.Label>
                  </Col>
                </Row>
                <Row className="g-0 pb-0 mb-0 pt-2">
                  <Col>
                    <Form.Label className="form-label redit1-text mb-1">Mercado</Form.Label>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Label className="form-label redit2-text mb-1">
                      { values.aditionals?.mercados?.map(mercado => (
                        <span key={mercado.value} style={{ padding: '0 .5rem 0 0' }}>
                          {mercado.label}
                        </span>
                        )) }
                    </Form.Label>
                  </Col>
                </Row>
              </>
          }
          <div className="d-flex justify-content-center">
            {showBackButton && <Button
              size="lg"
              variant="danger"
              color="inherit"
              className="mx-2"
              style={{ marginTop: '3rem' }}
              onClick={handleBack}
            >
              Volver
            </Button>}
            <Button
              size="lg"
              variant="primary"
              className="btn-publicar"
              type="submit"
            >
              Publicar
            </Button>
          </div>
          </>
        )}
      </Form>
    </>
  );
};

export default ConfirmationForm;