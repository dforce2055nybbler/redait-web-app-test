import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from '../ui/loader';
import { graphql, useStaticQuery } from 'gatsby';
import { formatDataSelect } from '../../helpers/formatDataSelect';
import Select from 'react-select';

const ContactForm = ({
  values,
  handleSubmitForm,
  companyLabel = 'Empresa',
  title = 'Información de contacto' }) => {
  const [validate, setValidate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [empresa, setEmpresa] = useState(null);
  
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
        handleSubmitForm({ ...values, empresa })
      }, 100);
      setLoading(false);
    },
    validationSchema: Yup.object({
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

  const { value: valueContacto } = getFieldProps('contacto');
  const { value: valueEmail } = getFieldProps('email');
  const { value: valueTelefono } = getFieldProps('telefono');

  let mounted = true

  useEffect(() => {
    if (
      mounted &&
      empresa !== {} &&
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
    empresa,
    valueContacto,
    valueTelefono,
    valueEmail,
    errors,
  ]);

  useEffect(() => () => {
    mounted = false
  }, []);


  const data = useStaticQuery(graphql`
    query allStrapiCompanies {
      allStrapiCompanies(filter: {active: {eq: true}}) {
        edges {
          node {
            name
            strapiId
          }
        }
        totalCount
      }
    }
  `);

  const optionsCompanies = formatDataSelect(
    data.allStrapiCompanies.edges,
    'strapiId',
    'name'
  );

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
              <Form.Label className="form-label redit1-text mb-1">{companyLabel}</Form.Label>
              <InputGroup id="select-w100" className="mb-3">
              <Select
                style={{ width: '100% !important'}}
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                placeholder="Nombre de la empresa"
                name="empresa"
                value={empresa}
                options={optionsCompanies}
                  onChange={e => {
                    setEmpresa({ ...e })
                  }
                }
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