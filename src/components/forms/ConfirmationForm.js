import React, { useState, useRef } from 'react';
import { Button, Form, Row, Col} from 'react-bootstrap';
import Loader from '../ui/loader';

const ConfirmationForm = ({ values, handleSubmitForm, handleBack, title='Información de contacto' }) => {
  const [loading, setLoading] = useState(false);
 
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    handleSubmitForm(true)
    setLoading(false)
  }
  return (
    <>
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
                <Form.Label className="form-label redit2-text mb-1">{ values.contact.empresa }</Form.Label>
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
            <h5 className="header-forms azulredit-text mb-4 mt-4">
              Tecnologías y habilidades requeridas
            </h5>
            <Row className="g-0 pb-0 mb-0 pt-2">
              <Col>
                <Form.Label className="form-label redit1-text mb-1">Tecnología o lenguaje</Form.Label>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label className="form-label redit2-text mb-1">
                  { values.technologies?.tecnologia?.label }
                  {/* {values.technologies.tecnologias.map(tecnologia => (
                    tecnologia.value
                  ))} */}
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
                <Form.Label className="form-label redit2-text mb-1">{ values.technologies.experiencia }</Form.Label>
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
                <Form.Label className="form-label redit2-text mb-1">{ values.technologies.otrasHabilidades }</Form.Label>
              </Col>
            </Row>
            
            
            <div className="d-flex justify-content-center">
              {false && <Button
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
                style={{ backgroundColor: '#0033FF', marginTop: '3rem' }}
                type="submit"
              >
                Finalizar
              </Button>
            </div>
          </>
        )}
      </Form>
    </>
    
  );
};

export default ConfirmationForm;