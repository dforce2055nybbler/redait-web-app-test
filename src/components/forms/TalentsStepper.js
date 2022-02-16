import  React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ContactForm from './ContactForm'
import PerfilForm from './PerfilForm'
import TechnologiesForm from './TechnologiesForm';
import ConfirmationForm from './ConfirmationForm';
import Loader from '../ui/loader';
import Paper from '@mui/material/Paper';
import { Row, Col } from 'react-bootstrap';
import { useMutation } from '@apollo/client'
import { REGISTER_TALEN } from '../../apollo/queries'


const steps = ['Contacto', 'Perfil', 'Tecnologías', 'Confirmación'];

export default function TalentsStepper() {
  const [loading, setLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())
  const [contact, setContact] = useState({
    contacto: '',
    email: '',
    empresa: '',
    telefono: ''
  })
  const [perfil, setPerfil] = useState({
    perfil: 'busco',
    nombre: '',
    descripcion: '',
    tipoVacante: '',
  })
  const [technologies, setTechnologies] = useState({
    tecnologia: '', // TODO: array (?)
    experiencia: '',
    duracion: '',
    otrasHabilidades: '',
  })

  const finalMessage = 'Gracias'

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
    setPerfil(values)
    handleNext()
  }
  const handleTechnologiesForm = (values) => {
    setTechnologies(values)
    handleNext()
  }

  const [ registerTalent ] = useMutation(REGISTER_TALEN)

  const handleConfirmationForm = () => {
    window?.scrollTo(0, 0)
    setLoading(true)
    const variables = {
      companyId: contact.empresa,
      contact: contact.contacto,
      email: contact.email,
      phone: contact.phone,
      profile: perfil.perfil,
      name: perfil.nombre,
      description: perfil.descripcion,
      vacancies_type: perfil.tipoVacante.id,
      technology: technologies.tecnologia.id, // TODO: enviar array de tecnologías
      experience_year: technologies.experiencia.id,
      duration: technologies.duracion,
      skills: technologies.otrasHabilidades
    }
    debugger
    registerTalent({variables })

    handleNext()
    setTimeout(() => {
      setLoading(false)
    }, 1500);
  }

  
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
          <TechnologiesForm
            values={technologies}
            handleSubmitForm={handleTechnologiesForm}
            handleBack={handleBack}
          />
        </React.Fragment>
      ) : null}

      { activeStep === 3 ? (
        <React.Fragment>
          <ConfirmationForm
            values={{ contact, perfil, technologies }}
            handleSubmitForm={handleConfirmationForm}
            handleBack={handleBack}
          />
        </React.Fragment>
      ) : null }

      {activeStep === steps.length ? (
        <React.Fragment>
          <Row className="align-items-center mt-4 pt-4">
            <Col className="align-items-center text-center">
              <Paper style={{ height: '350px', paddingTop: '125px', borderRadius: '20px' }} elevation={6} square>
                { loading ? (<Loader />) : (<h1>{ finalMessage }</h1>) }
              </Paper>
            </Col>
          </Row>
        </React.Fragment>
      ) : null }
    </Box>
  );
}
