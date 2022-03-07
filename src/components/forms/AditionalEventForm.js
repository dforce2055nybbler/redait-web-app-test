import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from '../ui/loader'
import { formatDataSelect } from '../../helpers/formatDataSelect'
import Select from 'react-select'
import { graphql, useStaticQuery } from 'gatsby'

const AditionalEventForm = ({ values, handleSubmitForm, handleBack, title='Información adicional' }) => {
  const [validate, setValidate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verticales, setVerticales] = useState([])
  const [mercados, setMercados] = useState([])
  const characterLimit = 1000
  const showBackButton = false
  const { handleSubmit, touched, errors, getFieldProps } = useFormik({
    initialValues: {
      descripcion: values.descripcion,
      mercados: values.mercados,
      verticales: values.verticales,
    },
    onSubmit: values => {
      setLoading(true);
      setTimeout(() => {
        handleSubmitForm({
          ...values,
          mercados: Object.values(mercados), // retorno array de objectos
          verticales: Object.values(verticales), // retorno array de objectos
        });
      }, 100);
      setLoading(false);
    },
    validationSchema: Yup.object({
      descripcion: Yup.string()
        .min(3, 'Debe tener al menos 3 caractéres')
        .max(characterLimit, `Debe tener menos de ${characterLimit} caractéres`)
        .required('Requerido'),
    }),
  });


  const { value: valueDescripcion } = getFieldProps('descripcion');

  let mounted = true

  useEffect(() => {
    if (
      mounted &&
      valueDescripcion.trim() &&
      verticales !== null &&
      mercados !== null &&
      Object.keys(errors).length === 0
    ) {
      setValidate(true);
    } else {
      setValidate(false);
    }

    return () => {
      mounted = false
    }
  }, [
    valueDescripcion,
    verticales,
    mercados,
    errors,
  ])

  useEffect(() => () => {
    mounted = false
  }, [])
  
  const data = useStaticQuery(graphql`
    query AditionalEventFormData {
      allStrapiVerticals(filter: {active: {eq: true}}) {
        edges {
          node {
            strapiId
            name
          }
        }
      }
      allStrapiMarkets(filter: {active: {eq: true}}) {
        edges {
          node {
            strapiId
            name
          }
        }
      }
    }
  `);

  const optionsVerticals = formatDataSelect(
    data.allStrapiVerticals.edges,
    'strapiId',
    'name'
  )
  const optionsMarkets = formatDataSelect(
    data.allStrapiMarkets.edges,
    'strapiId',
    'name'
  )

  return (
    <>
      <h5 className="header-forms mb-4 mt-4">
        { title }
      </h5>
      <Form
        className="p-4 m-4"
        style={{ backgroundColor: '#fff', borderRadius: '5px' }}
        noValidate
        onSubmit={handleSubmit}
        >
        {loading ? (
          <Loader />
        ) : (
          <>
          <Form.Label className="form-label redit1-text mb-1">Vertical</Form.Label>
            <InputGroup id="select-w100" className="mb-3">
                <Select
                  isMulti
                  style={{ width: '100% !important'}}
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={true}
                  isSearchable={true}
                  placeholder="Seleccione una o varias verticales."
                  name="verticales"
                  value={verticales.value}
                  options={optionsVerticals}
                    onChange={e => {
                      setVerticales({ ...e })
                    }
                  }
                />
              {touched.verticales && errors.verticales && (
                <Form.Control.Feedback type="invalid">
                  {errors.verticales}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            <Form.Label className="form-label redit1-text mb-1">Mercado</Form.Label>
            <InputGroup id="select-w100" className="mb-3">
                <Select
                  isMulti
                  style={{ width: '100% !important'}}
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={true}
                  isSearchable={true}
                  placeholder="Seleccione uno o varios mercados"
                  name="mercados"
                  value={mercados.value}
                  options={optionsMarkets}
                    onChange={e => {
                      setMercados({ ...e })
                    }
                  }
                />
              {touched.mercados && errors.mercados && (
                <Form.Control.Feedback type="invalid">
                  {errors.mercados}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            <Form.Label className="form-label redit1-text mb-1">Descripción</Form.Label>
            <InputGroup>
              <Form.Control
                rows={6}
                isInvalid={!!errors.descripcion && touched.descripcion}
                type="textarea"
                as="textarea"
                placeholder="Añadir descripción general de la vacante"
                {...getFieldProps('descripcion')}
                />
              {touched.descripcion && errors.descripcion && (
                <Form.Control.Feedback type="invalid">
                  {errors.descripcion}
                </Form.Control.Feedback>
              )}
              </InputGroup>
            <Row className="justify-content-end mb-3 character-limit">
              <Col sm={2}>
                <em>{( characterLimit - valueDescripcion.length )}</em>
              </Col>
            </Row>
            
            <div className="d-flex justify-content-center">
              { showBackButton && <Button
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
                disabled={!validate}
              >
                Continuar
              </Button>
            </div>
          </>
        )}
      </Form>
    </>
    
  );
};

export default AditionalEventForm;