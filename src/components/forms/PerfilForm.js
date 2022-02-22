import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';
import Loader from '../ui/loader';
import { graphql, useStaticQuery } from 'gatsby';
import { formatDataSelect } from '../../helpers/formatDataSelect';

const PerfilForm = ({ values, handleSubmitForm, handleBack, title='Información de perfil' }) => {
  const [validate, setValidate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [perfil, setPerfil] = useState(values.perfil)
  const [tipoVacante, setTipoVacante] = useState(null);
  const showBackButton = false
  const characterLimit = 1000
  const { handleSubmit, touched, errors, getFieldProps } = useFormik({
    initialValues: {
      perfil: values.perfil,
      nombre: values.nombre,
      descripcion: values.descripcion,
      tipoVacante: values.tipoVacante
    },
    onSubmit: values => {
      setLoading(true);
      setTimeout(() => {
        handleSubmitForm({ ...values, perfil, tipoVacante });
      }, 100);
      setLoading(false);
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, 'Debe tener al menos 3 caractéres')
        .required('Requerido'),
      descripcion: Yup.string()
        .min(3, 'Debe tener al menos 3 caractéres')
        .max(characterLimit, `Debe tener menos de ${characterLimit} caractéres`)
        .required('Requerido'),
    }),
  });


  const { value: valueNombre } = getFieldProps('nombre');
  const { value: valueDescripcion } = getFieldProps('descripcion');

  let mounted = true

  useEffect(() => {
    if (
      mounted &&
      valueNombre.trim() &&
      valueDescripcion.trim() &&
      tipoVacante !== null &&
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
    valueNombre,
    valueDescripcion,
    tipoVacante,
    errors,
  ]);

  useEffect(() => () => {
    mounted = false
  }, [] );

  const data = useStaticQuery(graphql`
    query PerfilFormData {
      allStrapiVacanciesTypes(filter: {active: {eq: true}}) {
        edges {
          node {
            strapiId
            title
            description
          }
        }
      }
    }
  `);

  const optionsVacanciesType = formatDataSelect(
    data.allStrapiVacanciesTypes.edges,
    'strapiId',
    'title'
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
            <fieldset>
              <InputGroup as={Row} className="align-items-center mb-3">
                <Col sm={6}>
                  <Form.Check
                    defaultChecked={perfil === 'busco' ? true : false}
                    type="radio"
                    label="Busco perfil"
                    name="perfil"
                    id="busco"
                    value="busco"
                    onChange={() => setPerfil("busco") }
                  />
                </Col>
                <Col sm={6}>
                  <Form.Check
                    defaultChecked={perfil === 'ofrezco' ? true : false}
                    type="radio"
                    label="Ofrezco perfil"
                    name="perfil"
                    id="ofrezco"
                    value="ofrezco"
                    onChange={() => setPerfil("ofrezco") }
                  />
                </Col>
                
                {touched.perfil && errors.perfil && (
                  <Form.Check.Feedback type="invalid">
                    {errors.perfil}
                  </Form.Check.Feedback>
                )}
              </InputGroup>
            </fieldset>
            
            
            <Form.Label className="form-label redit1-text mb-1">Nombre</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                isInvalid={!!errors.nombre && touched.nombre}
                type="text"
                placeholder="Ej: Diseñador UX UI, Desarrollador Java"
                {...getFieldProps('nombre')}
              />
              {touched.nombre && errors.nombre && (
                <Form.Control.Feedback type="invalid">
                  {errors.nombre}
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
              <Col sm={1}>
                <em>{( characterLimit - valueDescripcion.length )}</em>
              </Col>
            </Row>
            <Form.Label className="form-label redit1-text mb-1">Tipo de vacante</Form.Label>
            <InputGroup id="select-w100" className="mb-3">
                <Select
                  style={{ width: '100% !important'}}
                  className="basic-single"
                  classNamePrefix="select"
                  isClearable={true}
                  isSearchable={true}
                  placeholder="Tipo de vacante..."
                  name="tipoVacante"
                  value={tipoVacante}
                  options={optionsVacanciesType}
                    onChange={e => {
                      setTipoVacante({ ...e })
                    }
                  }
                />
              {touched.tipoVacante && errors.tipoVacante && (
                <Form.Control.Feedback type="invalid">
                  {errors.tipoVacante}
                </Form.Control.Feedback>
              )}
            </InputGroup>
              
            
            
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

export default PerfilForm;