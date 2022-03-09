import React, { useState, useEffect } from 'react'
import StepperNew from 'react-stepper-horizontal'
import ContactForm from './ContactForm'
import PerfilEventForm from './PerfilEventForm'
import AditionalEventForm from './AditionalEventForm'
import ConfirmationForm from './ConfirmationForm'
import Loader from '../ui/loader'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { REGISTER_EVENT } from '../../apollo/queries'
import { Link } from 'gatsby'


const steps = [
  { title: 'Contacto' },
  { title: 'Evento' },
  { title: 'Adicional' },
  { title: 'Confirmación' }
]

export default function EventStepper() {
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
    fecha: new Date(),
    lugar: '',
    tipoEvento: 1,
    valorUSD: ''
  })
  const [aditionals, setAditionals] = useState({
    descripcion: '',
    verticales: '',
    mercados: ''
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
    debugger
    setContact(values)
    handleNext()
  }
  const handlePerfilForm = (values) => {
    debugger
    setPerfil(values)
    handleNext()
  }
  const handleAditionalEventForm = (values) => {
    debugger
    setAditionals(values)
    handleNext()
  }

  const handleNewItem = async (data) => {
    try {
      const newItem = await data.result.newItem
      console.log('Event added', newItem)
      setFinalMessage('Gracias, se agrego un nuevo evento a nuestra base.')
      const result = await setNewItem(newItem)
      console.log(result)
      setNavigation(`/?type=${newItem.__typename}&id=${newItem.id}`)
      handleNext()
      setLoading(false)
    } catch (error) {
      throw new Error(error)
    }
  }
  const [ registerEvent ] = useMutation(REGISTER_EVENT)

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
      date: perfil?.fecha,
      place: perfil.lugar,
      event_type: perfil.tipoEvento,
      valor_usd: perfil.valorUSD,
      verticals: aditionals.verticales.map(item => item.value), // ARRAY ID
      markets: aditionals.mercados.map(item => item.value), // ARRAY ID
      description: aditionals.descripcion,
    }
    debugger
    console.log('event', item)
    try {
      const { data, error } = await registerEvent({ variables: { item } })
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
            handleSubmitForm={handleContactForm}
            companyLabel='Empresa organizadora'
          />
        </React.Fragment>
      ) : null }

      { activeStep === 1 ? (
        <React.Fragment>
          <PerfilEventForm
            values={perfil}
            handleSubmitForm={handlePerfilForm}
            handleBack={handleBack}
          />
        </React.Fragment>
      ) : null}

      { activeStep === 2 ? (
        <React.Fragment>
          <AditionalEventForm
            values={aditionals}
            handleSubmitForm={handleAditionalEventForm}
            handleBack={handleBack}
          />
        </React.Fragment>
      ) : null}

      { activeStep === 3 ? (
        <React.Fragment>
          <ConfirmationForm
            values={{ contact, perfil, aditionals, type:'event' }}
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
