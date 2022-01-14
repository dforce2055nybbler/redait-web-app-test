import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const AlertClose = ({ message, variant = 'danger' }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Alert variant={variant} show={show}>
      {message}
    </Alert>
  );
};

export default AlertClose;
