import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup, Row, Col} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from '../ui/loader';

const ContactForm = ({ values, handleSubmitForm, title='Información de contacto' }) => {
  const [validate, setValidate] = useState(false);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, touched, errors, getFieldProps } = useFormik({
    initialValues: {
      empresa: values.empresa,
      contacto: values.contacto,
      email: values.email,
      telefono: values.telefono
    },
    onSubmit: values => {
      setLoading(true);
      setTimeout(() => {
        handleSubmitForm(values)
      }, 100);
      setLoading(false);
    },
    validationSchema: Yup.object({
      empresa: Yup.string()
        .min(3, 'Debe tener al menos 3 caractéres')
        .required('Requerido'),
      contacto: Yup.string()
        .min(3, 'Debe tener al menos 3 caractéres')
        .required('Requerido'),
      email: Yup.string()
        .email('El email no tiene un formato válido')
        .required('Requerido'),
      telefono: Yup.number('Número inválido')
        .integer('Número inválido')
        .min(3, 'Debe tener al menos 3 números')
        .positive('Número inválido')
        .required('Requerido')
        .typeError('Número inválido')
    }),
  });

  const { value: valueEmpresa } = getFieldProps('empresa');
  const { value: valueContacto } = getFieldProps('contacto');
  const { value: valueEmail } = getFieldProps('email');
  const { value: valueTelefono } = getFieldProps('telefono');

  let mounted = true

  useEffect(() => {
    if (
      mounted &&
      valueEmpresa.trim() &&
      valueContacto.trim() &&
      valueTelefono.trim() &&
      valueEmail.trim() &&
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
    valueEmpresa,
    valueContacto,
    valueTelefono,
    valueEmail,
    errors,
  ]);

  useEffect(() => () => {
    mounted = false
  }, [] );

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
            <Form.Label className="form-label redit1-text mb-1">Empresa</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                isInvalid={!!errors.empresa && touched.empresa}
                type="text"
                placeholder="Nombre de empresa"
                {...getFieldProps('empresa')}
              />
              {touched.empresa && errors.empresa && (
                <Form.Control.Feedback type="invalid">
                  {errors.empresa}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            <Form.Label className="form-label redit1-text mb-1">Contacto</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                isInvalid={!!errors.contacto && touched.contacto}
                type="text"
                placeholder="Nombre de contacto"
                {...getFieldProps('contacto')}
              />
              {touched.contacto && errors.contacto && (
                <Form.Control.Feedback type="invalid">
                  {errors.contacto}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            <Form.Label className="form-label redit1-text mb-1">Email</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                isInvalid={!!errors.email && touched.email}
                type="text"
                placeholder="Email de contacto"
                {...getFieldProps('email')}
              />
              {touched.email && errors.email && (
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            <Form.Label className="form-label redit1-text mb-1">Teléfono</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                isInvalid={!!errors.telefono && touched.telefono}
                type="text"
                placeholder="Teléfono de contacto"
                {...getFieldProps('telefono')}
              />
              {touched.telefono && errors.telefono && (
                <Form.Control.Feedback type="invalid">
                  {errors.telefono}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            
            <div className="d-flex justify-content-center">
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

export default ContactForm;