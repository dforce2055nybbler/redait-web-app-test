
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'
import DeleteIcon from '@mui/icons-material/Delete'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Select from 'react-select'

const NewMessage = ({ contacts, inputMessage, setInputMessage, sendMessage, cancelMessage }) => {
  const [receiver, setReceiver] = useState(null)
  const [ready, setReady] = useState(false)

  const contactsOptions = contacts.map(contact => ({ value: contact.id, label: contact.name }))
  const handleSendMessage = () => {
    // TODO: MOstar mensaje enviado y loader
    setTimeout(() => {
      sendMessage()
      setReceiver(null)
    }, 1500);
  }
  useEffect(() => { 
    try {
      if (receiver.value && inputMessage.length > 3)
        setReady(true)
      else
        setReady(false)
    } catch (error) {
      setReady(false)
    }
  }, [receiver, inputMessage])
  return (
    <div className="new-message">
      <Row>
        <Col xs={12}><h5>Para</h5></Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Select
            isClearable
            isSearchable
            name="search"
            placeholder="Escribe un usuario"
            className="input-search-receiver"
            options={contactsOptions}
            value={receiver}
            onChange={e => {
              if (e)
                setReceiver({ ...e })
              else
                setReceiver(null)
              }
            }
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12}><h5>Mensaje</h5></Col>
      </Row>
      <Row>
        <Col xs={12}>
          <TextareaAutosize
            minRows={14}
            maxRows={16}
            aria-label="Escribe un mensaje"
            placeholder="Escribe un mensaje"
            className="input-new-message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={2}>
          <Button
            className="btn-cancel"
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={cancelMessage}
          >
            Cancelar
          </Button>
        </Col>
        <Col xs={2}>
          <Button
            disabled={!ready}
            className={ ready ? 'btn-send active' : '' }
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleSendMessage}
          >
            Enviar
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default NewMessage;
