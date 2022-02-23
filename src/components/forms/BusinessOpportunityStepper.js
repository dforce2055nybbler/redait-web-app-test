import  React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ContactForm from './ContactForm'
import PerfilForm from './PerfilBusinessOpportunityForm'
import ConfirmationForm from './ConfirmationForm'
import Loader from '../ui/loader';
import Paper from '@mui/material/Paper';
import { Row, Col } from 'react-bootstrap';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client'
import { REGISTER_BUSINESS_OPPORTUNITY } from '../../apollo/queries'
import { Link } from 'gatsby';


const steps = ['Contacto', 'Perfil', 'Confirmación'];

export default function PartnershipStepper() {
  const [loading, setLoading] = useState(false)
  const [finalMessage, setFinalMessage] = useState('')
  const [newItem, setNewItem] = useState(null)
  const [navigation, setNavigation] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())
  const [contact, setContact] = useState({
    contacto: '',
    email: '',
    empresa: '',
    telefono: ''
  })
  const [perfil, setPerfil] = useState({
    nombre: '',
    descripcion: '',
    verticales: '',
    mercados: ''
  })

  const isStepOptional = (step) => {
    return step === 99999;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleContactForm = (values) => {
    setContact(values)
    handleNext()
  }
  const handlePerfilForm = (values) => {
    debugger
    setPerfil(values)
    handleNext()
  }

  const handleNewItem = async (data) => {
    try {
      const newItem = await data.result.newItem
      console.log('Business Opportunity added', newItem)
      setFinalMessage('Gracias, se agrego un nuevo Business Opportunity a nuestra base.')
      const result = await setNewItem(newItem)
      console.log(result)
      setNavigation(`/?type=${newItem.__typename}&id=${newItem.id}`)
      handleNext()
      setLoading(false)
    } catch (error) {
      throw new Error(error)
    }
  }
  const [ registerTalent ] = useMutation(REGISTER_BUSINESS_OPPORTUNITY)

  const handleConfirmationForm = async () => {
    window?.scrollTo(0, 0)
    setLoading(true)

    const item = {
      company: contact.empresa.value,
      contact: contact.contacto,
      email: contact.email,
      phone: contact.telefono,
      active: true,
      name: perfil.nombre,
      description: perfil.descripcion,
      verticals: perfil.verticales.map(item => item.value), // ARRAY ID
      markets: perfil.mercados.map(item => item.value), // ARRAY ID
      // TODO: Verificar si es necesario definir un país y una región
      // country: null,
      // region: null,
    }

    try {
      const { data, error } = await registerTalent({ variables: { item } })
      if (!error) {
        handleNewItem(data)
      }
    } catch (error) {
      console.error('Error adding talent', error)
      setFinalMessage('Error al intentar agregar un nuevo talento, intentelo de nuevo más tarde.')
      setLoading(false)
    }
  }

  useEffect(() => {
    if (newItem) {
      setNavigation(`/?type=${newItem.__typename}&id=${newItem.id}`)
    }
    else
      setNavigation('/')
  }, [newItem]);
  
  return (
    <Box sx={{ width: '100%', height: '100vmax' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      

      { activeStep === 0 ? (
        <React.Fragment>
          <ContactForm
            values={contact}
            handleSubmitForm={handleContactForm} />
        </React.Fragment>
      ) : null }

      { activeStep === 1 ? (
        <React.Fragment>
          <PerfilForm
            values={perfil}
            handleSubmitForm={handlePerfilForm}
            handleBack={handleBack}
          />
        </React.Fragment>
      ) : null}

      { activeStep === 2 ? (
        <React.Fragment>
          <ConfirmationForm
            values={{ contact, perfil }}
            handleSubmitForm={handleConfirmationForm}
            handleBack={handleBack}
          />
        </React.Fragment>
      ) : null}

      {activeStep === steps.length ? (
        <React.Fragment>
          <Row className="align-items-center mt-4 pt-4">
            <Col className="align-items-center text-center">
                <Paper style={{ height: '350px', padding: '6rem 1rem', borderRadius: '20px' }} elevation={6} square>
                  {loading ? (<Loader />)
                    :
                    (
                      <>
                        <Row className="justify-content-center">
                          <Col>
                            <h3>{finalMessage}</h3>
                          </Col>
                        </Row>
                        <Row className="justify-content-center">
                          <Col>
                            <Link
                              to={navigation}
                              style={{ textDecoration: 'none' }}
                            >
                              <Button variant="outlined" color="primary">
                                Ver resultado
                              </Button>
                            </Link>
                          </Col>
                        </Row>
                      </>
                    )
                  }
                </Paper>
            </Col>
          </Row>
        </React.Fragment>
      ) : null }
    </Box>
  );
}