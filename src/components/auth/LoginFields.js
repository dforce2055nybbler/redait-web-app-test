import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, navigate } from 'gatsby';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Loader from '../ui/loader';
import { UserContext } from '../../contexts';
import { setUser } from '../../contexts/actions/user-actions';
import AlertClose from '../ui/alertClose';
import ToggleButton from '../ui/toggleButton';

const LoginFields = () => {
  const [validate, setValidate] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
  });

  const { dispatchUser } = useContext(UserContext);

  const { handleSubmit, touched, errors, getFieldProps } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      setLoading(true);
      axios
        .post(process.env.GATSBY_STRAPI_URL + '/auth/local', {
          identifier: values.email,
          password: values.password,
        })
        .then(response => {
          setLoading(false);
          setAlert({ ...alert, show: false });
          dispatchUser(
            setUser({
              ...response.data.user,
              jwt: response.data.jwt,
              onboarding: true,
            })
          );
          navigate('/');
        })
        .catch(error => {
          const { message } = error.response.data.message[0].messages[0];
          setLoading(false);
          setAlert({ show: true, message });
        });
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('El email no tiene un formato válido')
        .required('Requerido'),
      password: Yup.string().required('Requerido'),
    }),
  });

  const { value: valueEmail } = getFieldProps('email');
  const { value: valuePassword } = getFieldProps('password');

  useEffect(() => {
    if (
      valueEmail.trim() &&
      valuePassword.trim() &&
      Object.keys(errors).length === 0
    ) {
      setValidate(true);
    } else {
      setValidate(false);
    }
  }, [valueEmail, valuePassword, errors]);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h6 className="mb-4" style={{ fontWeight: 400 }}>
            Iniciar Sesión
          </h6>
          <InputGroup className="mb-3">
            <Form.Control
              isInvalid={!!errors.email && touched.email}
              type="email"
              placeholder="Email"
              {...getFieldProps('email')}
            />
            {touched.email && errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            )}
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              isInvalid={!!errors.password && touched.password}
              style={{ borderRightColor: !errors.password && 'transparent' }}
              type={hidePassword ? 'password' : 'text'}
              placeholder="Contraseña"
              {...getFieldProps('password')}
            />
            <InputGroup.Text
              style={{
                backgroundColor: '#fff',
                borderLeftColor: 'transparent',
              }}
              onClick={() => setHidePassword(!hidePassword)}
              className={errors.password && 'input-icon-error-redait'}
            >
              {hidePassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
            {touched.password && errors.password && (
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            )}
          </InputGroup>
          <div className="d-flex justify-content-between">
            <div>
              <ToggleButton /> Recordarme
            </div>
            <Link to="/" style={{ textDecoration: 'none', color: '#000' }}>
              Olvide mi contraseña
            </Link>
          </div>
          {alert.show && <AlertClose message={alert.message} />}
          <div className="d-grid">
            <Button
              variant="primary"
              style={{ backgroundColor: '#0033FF', marginTop: '5rem' }}
              type="submit"
              disabled={!validate}
            >
              Ingresar
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};

export default LoginFields;
