import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';
import Loader from '../ui/loader';
import { graphql, useStaticQuery } from 'gatsby';
import { formatDataSelect } from '../../helpers/formatDataSelect';

const TechnologiesForm = ({
  values,
  handleSubmitForm,
  handleBack,
  title = 'Tecnologías y habilidades requeridas'
}) => {
  const [validate, setValidate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tecnologia, setTecnologia] = useState({
    id: 1, value: 'Javascript', label: 'Javascript'
  });
  // TODO: Obtener tecnologías desde servicio
  const [tecnologias, setTecnologias] = useState([
    { id: 1, value: 'Javascript', label: 'Javascript' },
    { id: 2, value: 'Git', label: 'Git' },
    { id: 3, value: 'Linux', label: 'Linux' },
    { id: 4, value: 'React', label: 'React' },
    { id: 5, value: 'Vue', label: 'Vue' },
  ]);
  const [experiencia, setExperiencia] = useState({
    id: 1, value: '1-3', label: '1 a 3 años'
  });
  const [tiemposDeExperiencia, setTiemposDeExperiencia] = useState([
    { id: 1, value: '1-3', label: '1 a 3 años' },
    { id: 2, value: '2-4', label: '2 a 4 años' },
    { id: 2, value: '3-5', label: '3 a 5 años' },
  ]);


  const { handleSubmit, touched, errors, getFieldProps } = useFormik({
    initialValues: {
      tecnologia: values.tecnologia,
      experiencia: values.experiencia,
      duracion: values.duracion,
      otrasHabilidades: values.otrasHabilidades,
    },
    onSubmit: values => {
      setLoading(true);
      setTimeout(() => {
        handleSubmitForm({ ...values, tecnologia, experiencia });
      }, 100);
      setLoading(false);
    },
    validationSchema: Yup.object({
      duracion: Yup.string()
        .min(3, 'Debe tener al menos 3 caractéres')
        .required('Requerido'),
      otrasHabilidades: Yup.string()
        .min(3, 'Debe tener al menos 3 caractéres')
        .required('Requerido'),
    }),
  });


  const { value: valueDuracion } = getFieldProps('duracion');
  const { value: valueOtrasHabilidades } = getFieldProps('otrasHabilidades');

  let mounted = true

  useEffect(() => {
    if (
      mounted &&
      tecnologia !== null &&
      experiencia !== null &&
      valueDuracion.trim() !== null &&
      valueOtrasHabilidades.trim() &&
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
    tecnologia,
    experiencia,
    valueDuracion,
    valueOtrasHabilidades,
    errors,
  ]);

  useEffect(() => () => {
    mounted = false
  }, [] );

  const data = useStaticQuery(graphql`
    query AllTechnologiesAndProgrammingLangs {
      allStrapiTechnologies {
        edges {
          node {
            name
            strapiId
          }
        }
      }
      allStrapiProgrammingLangs {
        edges {
          node {
            strapiId
            name
          }
        }
      }
    }
  `);

  const allTechnologiesAndProgrammingLangs = [
    ...data.allStrapiTechnologies.edges,
    ...data.allStrapiProgrammingLangs.edges
  ]
  const optionsTechnologiesAndProgramingLangs = formatDataSelect(
    allTechnologiesAndProgrammingLangs,
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
            <Form.Label className="form-label redit1-text mb-1">Tecnología o lenguaje</Form.Label>
            <InputGroup id="select-w100" className="mb-3">
              <Select
                style={{ width: '100% !important'}}
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                placeholder="Tipo de vacante..."
                name="tecnologia"
                value={tecnologia}
                options={optionsTechnologiesAndProgramingLangs}
                  onChange={e => {
                    setTecnologia({ ...e })
                  }
                }
              />
              {touched.tecnologia && errors.tecnologia && (
                <Form.Control.Feedback type="invalid">
                  {errors.tecnologia}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            <Form.Label className="form-label redit1-text mb-1">Experiencia</Form.Label>
              <InputGroup id="select-w100" className="mb-3">
              <Select
                style={{ width: '100% !important'}}
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                placeholder="Años de experiencia"
                name="experiencia"
                value={experiencia}
                options={tiemposDeExperiencia}
                  onChange={e => {
                    setExperiencia({ ...e })
                  }
                }
              />
              {touched.experiencia && errors.experiencia && (
                <Form.Control.Feedback type="invalid">
                  {errors.experiencia}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            
            <Form.Label className="form-label redit1-text mb-1">Duración</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                isInvalid={!!errors.duracion && touched.duracion}
                type="text"
                placeholder="Duración del proyecto"
                {...getFieldProps('duracion')}
              />
              {touched.duracion && errors.duracion && (
                <Form.Control.Feedback type="invalid">
                  {errors.duracion}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            <Form.Label className="form-label redit1-text mb-1">Otras habilidades requeridas</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                rows={3}
                isInvalid={!!errors.otrasHabilidades && touched.otrasHabilidades}
                type="textarea"
                as="textarea"
                placeholder="Agrega otras habilidades y separa con  (,)"
                {...getFieldProps('otrasHabilidades')}
              />
              {touched.otrasHabilidades && errors.otrasHabilidades && (
                <Form.Control.Feedback type="invalid">
                  {errors.otrasHabilidades}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            
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

export default TechnologiesForm;