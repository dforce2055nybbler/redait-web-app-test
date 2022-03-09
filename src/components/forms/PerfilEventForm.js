import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from '../ui/loader';
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import { graphql, useStaticQuery } from 'gatsby'
import { formatDataSelect } from '../../helpers/formatDataSelect'

const PerfilEventForm = ({ values, handleSubmitForm, handleBack, title='Información del evento' }) => {
  const [validate, setValidate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tipoEvento, setTipoEvento] = useState(values.tipoEvento)
  const [fecha, setFecha] = useState(values.fecha);
  const showBackButton = false
  const { handleSubmit, touched, errors, getFieldProps } = useFormik({
    initialValues: {
      nombre: values.nombre,
      fecha: values.fecha,
      lugar: values.lugar,
      tipoEvento: values.tipoEvento,
      valorUSD: values.valorUSD
    },
    onSubmit: values => {
      setLoading(true);
      setTimeout(() => {
        handleSubmitForm({ ...values, tipoEvento });
      }, 100);
      setLoading(false);
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, 'Debe tener al menos 3 caractéres')
        .required('Requerido'),
      lugar: Yup.string()
        .min(3, 'Ingrese un lugar válido')
        .required('Requerido'),
      valorUSD: Yup.number()
        .min(0, 'Debe ingresar el valor en USD')
        .required('Requerido'),
    }),
  });


  const { value: valueNombre } = getFieldProps('nombre');
  const { value: valueLugar } = getFieldProps('lugar');
  const { value: valueValorUSD } = getFieldProps('valorUSD');

  let mounted = true

  useEffect(() => {
    if (
      mounted &&
      valueNombre.trim() &&
      valueLugar.trim() &&
      tipoEvento !== null &&
      valueValorUSD !== null &&
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
    valueLugar,
    tipoEvento,
    valueValorUSD,
    errors,
  ]);

  useEffect(() => () => {
    mounted = false
  }, []);
  
  const data = useStaticQuery(graphql`
    query allStrapiEventTypes {
      allStrapiEventTypes {
        edges {
          node {
            name
            strapiId
          }
        }
      }
    }
  `);

  const optionsEvents = formatDataSelect(
    data.allStrapiEventTypes.edges,
    'strapiId',
    'name'
  )
  console.log('allStrapiEventTypes', data)
  console.log('optionsEvents', optionsEvents)
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
            <InputGroup as={Row} className="align-items-center mb-3">
              <Form.Label className="form-label redit1-text mb-1">Nombre</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  isInvalid={!!errors.nombre && touched.nombre}
                  type="text"
                  placeholder="Nombre del evento"
                  {...getFieldProps('nombre')}
                />
                {touched.nombre && errors.nombre && (
                  <Form.Control.Feedback type="invalid">
                    {errors.nombre}
                  </Form.Control.Feedback>
                )}
              </InputGroup>
              <Form.Label className="form-label redit1-text mb-1">Fecha</Form.Label>
              <InputGroup className="mb-3">
                <DatePicker
                  className="date-picker"
                  selected={fecha}
                  onChange={(date) => setFecha(date)} 
                  showTimeSelect
                  locale="es-AR"
                  dateFormat="dd/MM/yyyy  EE hh:mm a"
                  // timeFormat="p"
                  timeIntervals={15}
                  // dateFormat="Pp"
                />
                {touched.nombre && errors.nombre && (
                  <Form.Control.Feedback type="invalid">
                    {errors.nombre}
                  </Form.Control.Feedback>
                )}
              </InputGroup>
              <Form.Label className="form-label redit1-text mb-1">Lugar</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  isInvalid={!!errors.lugar && touched.lugar}
                  type="text"
                  placeholder="Lugar dónde se desarrolla el evento"
                  {...getFieldProps('lugar')}
                />
                {touched.lugar && errors.lugar && (
                  <Form.Control.Feedback type="invalid">
                    {errors.lugar}
                  </Form.Control.Feedback>
                )}
                </InputGroup>
                <Row className="justify-content-md-start">
                  {optionsEvents.map((event, index) => (
                    <Col key={index} sm="auto">
                      <Form.Check
                        defaultChecked={tipoEvento === event.value ? true : false}
                        type="radio"
                        label={event.label}
                        name="tipo"
                        id={event.label}
                        value={event.value}
                        onChange={() => setTipoEvento(event.value) }
                      />
                    </Col>
                  ))}
                  {touched.tipoEvento && errors.tipoEvento && (
                    <Form.Check.Feedback type="invalid">
                      {errors.tipoEvento}
                    </Form.Check.Feedback>
                  )}
                </Row>
            </InputGroup>
            
            <Form.Label className="form-label redit1-text mb-1">Valor USD</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  isInvalid={!!errors.valorUSD && touched.valorUSD}
                  type="number"
                  placeholder="USD 0"
                  {...getFieldProps('valorUSD')}
                />
                {touched.valorUSD && errors.valorUSD && (
                  <Form.Control.Feedback type="invalid">
                    {errors.valorUSD}
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

export default PerfilEventForm;