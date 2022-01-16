import React, { useState, useEffect, useContext } from 'react';
import { Link, navigate } from 'gatsby';
import AuthLayout from '../components/auth/AuthLayout';
import Seo from '../components/seo';
import { FaArrowLeft } from 'react-icons/fa';
import RegisterFields from '../components/auth/RegisterFields';
import { UserContext } from '../contexts';
import Complete from '../components/auth/Complete';

const Register = () => {
  const [member, setMember] = useState(null);
  const [confirm, setConfirm] = useState(false);

  const { user } = useContext(UserContext);

  const params = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : null
  );
  const status = params.get('status');
  const userParams = params.get('user');

  useEffect(() => {
    if (userParams === 'guest') {
      setMember(false);
    } else if (userParams === 'member') {
      setMember(true);
    }
  }, [userParams]);

  useEffect(() => {
    if (user.jwt && user.onboarding) {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    if (status === 'confirm') {
      setConfirm(true);
    } else {
      setConfirm(false);
    }
  }, [status]);

  return (
    <AuthLayout>
      <Seo title="Registro" />
      {confirm ? (
        <Complete user={user} />
      ) : (
        <>
          <FaArrowLeft
            onClick={() => navigate('/login')}
            style={{
              alignSelf: 'flex-start',
              width: '1.313rem',
              height: '1.875rem',
              marginInlineStart: 'calc(100% - 90%)',
              cursor: 'pointer',
            }}
          />
          <h1>¡Bienvenido!</h1>
          <div className="d-grid gap-4 w-60">
            {member ? (
              <RegisterFields member={member} />
            ) : (
              <RegisterFields member={member} />
            )}
          </div>
          <div className="text-center">
            <h6>¿Tu empresa no está registrada?</h6>
            <Link to="/register?user=guest" style={{ textDecoration: 'none' }}>
              <h6 style={{ color: '#FF5C40' }}>Ingresá como invitado</h6>
            </Link>
          </div>
        </>
      )}
    </AuthLayout>
  );
};

export default Register;
