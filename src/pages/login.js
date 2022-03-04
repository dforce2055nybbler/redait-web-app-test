import React, { useContext, useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import Seo from '../components/seo';
import AuthLayout from '../components/auth/AuthLayout';
import LoginFields from '../components/auth/LoginFields';
import { UserContext } from '../contexts';

const Login = () => {
  const [loginOption, setLoginOption] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.jwt && user.onboarding) {
      navigate('/');
    }
  }, [user]);

  return (
    <AuthLayout>
      <Seo title="Login" />
      {loginOption ? (
        <FaArrowLeft
          onClick={() => setLoginOption(false)}
          style={{
            alignSelf: 'flex-start',
            width: '1.313rem',
            height: '1.875rem',
            marginInlineStart: 'calc(100% - 90%)',
            cursor: 'pointer',
          }}
        />
      ) : null}
      <h1>¡Bienvenido!</h1>
      <div className="d-grid gap-4 w-60">
        {loginOption ? (
          <LoginFields />
        ) : (
          <>
            <Button
              variant="outline-primary-redait"
              className="outline-primary-redait"
              onClick={() => navigate('/register?user=member')}
            >
              Crear Cuenta
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => setLoginOption(true)}
            >
              Ingresar
            </Button>
          </>
        )}
      </div>
      <div className="text-center">
        <h6>¿Tu empresa no está registrada?</h6>
        <Link to="/register?user=guest" style={{ textDecoration: 'none' }}>
          <h6 style={{ color: '#FF5C40' }}>Ingresá como invitado</h6>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
