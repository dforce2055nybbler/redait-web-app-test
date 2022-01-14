import React, { useEffect } from 'react';

const Register = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user');
    if (user === 'guest') {
      console.log('es un invitado');
    } else if (user === 'member') {
      console.log('es un miembro');
    }
  }, []);

  return <div>Registrar</div>;
};

export default Register;
