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
  const [tecnologias, setTecnologias] = useState([]);
  const [lenguajes, setLenguajes] = useState([]);
  const [experiencia, setExperiencia] = useState(null);

  const showBackButton = false

  const { handleSubmit, touched, errors, getFieldProps } = useFormik({
    initialValues: {
      tecnologias: values.tecnologias,
      lenguajes: values.lenguajes,
      experiencia: values.experiencia,
      duracion: values.duracion,
      otrasHabilidades: values.otrasHabilidades,
    },
    onSubmit: values => {
      setLoading(true);
      setTimeout(() => {
        handleSubmitForm({
          ...values,
          tecnologias: Object.values(tecnologias), // retorno array de objectos
          lenguajes: Object.values(lenguajes), // retorno array de objectos
          experiencia
        });
      }, 100);
      setLoading(false);
    },
    validationSchema: Yup.object({
      duracion: Yup.string()
        .min(3, 'Debe tener al menos 3 caractéres')
        .required('Requerido')
    }),
  });


  const { value: valueDuracion } = getFieldProps('duracion');
  const { value: valueOtrasHabilidades } = getFieldProps('otrasHabilidades');

  let mounted = true

  useEffect(() => {
    if (
      mounted &&
      (tecnologias !== null || lenguajes !== null) &&
      experiencia !== null &&
      valueDuracion.trim() !== null &&
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
    tecnologias,
    lenguajes,
    experiencia,
    valueDuracion,
    valueOtrasHabilidades,
    errors,
  ]);

  useEffect(() => () => {
    mounted = false
  }, [] );

  const data = useStaticQuery(graphql`
    query TechnologiesFormData {
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
      allStrapiExperienceYears(filter: {active: {eq: true}}) {
        edges {
          node {
            strapiId
            description
          }
        }
      }
    }
  `);

  

  const optionsTechnologies = formatDataSelect(
    data.allStrapiTechnologies.edges,
    'strapiId',
    'name'
  )
  const optionsProgrammingLangs = formatDataSelect(
    data.allStrapiProgrammingLangs.edges,
    'strapiId',
    'name'
  )
  
  const optionsTechnologiesAndProgramingLans = [
    {
      label: "Tecnologías",
      options: [ ...optionsTechnologies ]
    },
    {
      label: "Lenguaje",
      options: [ ...optionsProgrammingLangs ]
    }
  ]


  const optionsExperienceYears = formatDataSelect(
    data.allStrapiExperienceYears.edges,
    'strapiId',
    'description'
  )
  
  // ordeno años de experiencia por id
  const optionsExperienceYearsSorted = optionsExperienceYears.sort((a, b) => a.value - b.value);

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
            <Form.Label className="form-label redit1-text mb-1">Tecnologías</Form.Label>
            <InputGroup id="select-w100" className="mb-3">
              <Select
                isMulti
                style={{ width: '100% !important'}}
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                placeholder="Tecnología/Lenguaje"
                name="tecnologias"
                value={tecnologias.value}
                options={optionsTechnologies}
                  onChange={e => {
                    setTecnologias({ ...e })
                  }
                }
              />
              {touched.tecnologias && errors.tecnologias && (
                <Form.Control.Feedback type="invalid">
                  {errors.tecnologias}
                </Form.Control.Feedback>
              )}
            </InputGroup>
            <Form.Label className="form-label redit1-text mb-1">Lenguajes</Form.Label>
            <InputGroup id="select-w100" className="mb-3">
              <Select
                isMulti
                style={{ width: '100% !important'}}
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                placeholder="Lenguajes"
                name="lenguajes"
                value={lenguajes.value}
                options={optionsProgrammingLangs}
                  onChange={e => {
                    setLenguajes({ ...e })
                  }
                }
              />
              {touched.lenguajes && errors.lenguajes && (
                <Form.Control.Feedback type="invalid">
                  {errors.lenguajes}
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
                options={optionsExperienceYearsSorted}
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

export default TechnologiesForm;