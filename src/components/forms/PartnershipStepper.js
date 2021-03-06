import React, { useState, useEffect } from 'react'
import StepperNew from 'react-stepper-horizontal'
import ContactForm from './ContactForm'
import PerfilForm from './PerfilForm'
import TechnologiesForm from './TechnologiesForm'
import ConfirmationForm from './ConfirmationForm'
import Loader from '../ui/loader'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { REGISTER_PARTNETSHIP } from '../../apollo/queries'
import { Link } from 'gatsby'


const steps = [
  { title: 'Contacto' },
  { title: 'Perfil' },
  { title: 'Tecnologías' },
  { title: 'Confirmación' }
]

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


  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }


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

  const handleNewItem = async (data) => {
    try {
      const newItem = await data.result.newItem
      console.log('Partnership added', newItem)
      setFinalMessage('Gracias, se agrego un nuevo Partnership a nuestra base.')
      const result = await setNewItem(newItem)
      console.log(result)
      setNavigation(`/?type=${newItem.__typename}&id=${newItem.id}`)
      handleNext()
      setLoading(false)
    } catch (error) {
      throw new Error(error)
    }
  }
  const [ registerTalent ] = useMutation(REGISTER_PARTNETSHIP)

  const handleConfirmationForm = async () => {
    window?.scrollTo(0, 0)
    setLoading(true)

    const item = {
      company: contact.empresa.value,
      contact: contact.contacto,
      email: contact.email,
      phone: contact.telefono,
      profile: perfil.perfil,
      name: perfil.nombre,
      active: true,
      description: perfil.descripcion,
      vacancies_type: perfil.tipoVacante.value,
      technologies: technologies.tecnologias.map(item => item.value), // ARRAY ID
      programming_langs: technologies.lenguajes.map(item => item.value), // ARRAY ID
      experience_year: technologies.experiencia.value,
      duration: technologies.duracion,
      skills: technologies.otrasHabilidades
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
  }, [newItem])
  
  return (
    <Card className="form-container">
      <div className="stepper">
        <StepperNew
          steps={steps}
          activeStep={activeStep} 
          />
      </div>
      

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
            <Card className="form-result">
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
                              <Button variant="outline-primary">
                                Ver resultado
                              </Button>
                            </Link>
                          </Col>
                        </Row>
                      </>
                    )
                  }
                </Card>
            </Col>
          </Row>
        </React.Fragment>
      ) : null }
    </Card>
  )
}
