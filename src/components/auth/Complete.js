import { navigate } from 'gatsby';
import React from 'react';
import { Button } from 'react-bootstrap';

const Complete = ({ user }) => {
  const resendMailHandler = () => {
    console.log('reenviar mail');
  };

  if (!user.email) {
    navigate('/');
  }

  return (
    <>
      <div className="text-center">
        <h2
          style={{
            fontSize: '1.375rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
          }}
        >
          Confirma tu email
        </h2>
        <p style={{ fontSize: '18px', marginBottom: 0 }}>
          Hemos enviado un email a
        </p>
        <p style={{ fontSize: '18px', fontWeight: 700 }}>{user.email}</p>
      </div>
      <div className="text-center">
        <p style={{ fontSize: '20px', fontWeight: 500, marginBottom: 0 }}>
          ¿No te llegó el email?
        </p>
        <p style={{ fontSize: '14px' }}>Recuerda revisar la bandeja de Spam</p>
        <div className="d-grid">
          <Button
            variant="primary"
            style={{ backgroundColor: '#0033FF', marginTop: '1rem' }}
            onClick={resendMailHandler}
          >
            Reenviar email
          </Button>
        </div>
      </div>
    </>
  );
};

export default Complete;
