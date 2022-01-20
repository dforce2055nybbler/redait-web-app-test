import React, { useState, useEffect, useContext } from 'react';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Select from 'react-select';
import AlertClose from '../ui/alertClose';
import Loader from '../ui/loader';
import { UserContext } from '../../contexts';
import { setUser } from '../../contexts/actions/user-actions';
import { formatDataSelect } from '../../helpers/formatDataSelect';

const RegisterFields = ({ member }) => {
  const [validate, setValidate] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState({
    select: '',
    confirm: false,
    regex: '',
  });
  const [alert, setAlert] = useState({
    show: false,
    message: '',
  });

  const { dispatchUser } = useContext(UserContext);

  const { handleSubmit, touched, errors, getFieldProps } = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    onSubmit: values => {
      setLoading(true);
      axios
        .post(process.env.GATSBY_STRAPI_URL + '/auth/local/register', {
          username: values.username,
          email: values.email,
          password: values.password,
        })
        .then(response => {
          setLoading(false);
          setAlert({ ...alert, show: false });
          dispatchUser(
            setUser({
              ...response.data.user,
              jwt: response.data.jwt,
            })
          );
          navigate('/register?status=confirm');
        })
        .catch(error => {
          const { message } = error.response.data.message[0].messages[0];
          setLoading(false);
          setAlert({ show: true, message });
        });
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Debe tener al menos 3 caracteres')
        .required('Requerido'),
      email: Yup.string()
        .email('El email no tiene un formato válido')
        .matches(
          member ? new RegExp(company.regex) : new RegExp(),
          'El email no corresponde a la empresa'
        )
        .required('Requerido'),
      password: Yup.string()
        .min(12, 'Debe tener al menos 12 caracteres')
        .required('Requerido'),
      passwordConfirmation: Yup.string().test(
        'passwords-match',
        'Las contraseñas deben ser iguales',
        function (value) {
          return this.parent.password === value;
        }
      ),
    }),
  });

  const { value: valueUsername } = getFieldProps('username');
  const { value: valueEmail } = getFieldProps('email');
  const { value: valuePassword } = getFieldProps('password');
  const { value: valuePasswordConfirmation } = getFieldProps(
    'passwordConfirmation'
  );

  useEffect(() => {
    if (
      valueUsername.trim() &&
      valueEmail.trim() &&
      valuePassword.trim() &&
      valuePasswordConfirmation.trim() &&
      Object.keys(errors).length === 0
    ) {
      setValidate(true);
    } else {
      setValidate(false);
    }
  }, [
    valueUsername,
    valueEmail,
    valuePassword,
    valuePasswordConfirmation,
    errors,
  ]);

  const data = useStaticQuery(graphql`
    query GetCompanies {
      allStrapiCompanies {
        edges {
          node {
            id
            name
            domain
          }
        }
      }
    }
  `);

  const options = formatDataSelect(
    data.allStrapiCompanies.edges,
    'domain',
    'name'
  );

  return (
    <Form noValidate onSubmit={handleSubmit}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h6 className="mb-4" style={{ fontWeight: 400 }}>
            {member ? 'Empresa para la que trabajas' : 'Ingresa tus datos'}
          </h6>
          {member && !company.confirm ? (
            <>
              <Select
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                placeholder="Seleccionar empresa..."
                name="company"
                options={options}
                onChange={e =>
                  setCompany({
                    ...company,
                    select: e.value,
                    regex: `^[A-Za-z0-9._%+-]+@${e.value}$`,
                  })
                }
              />
              <div className="d-grid">
                <Button
                  variant="primary"
                  style={{ backgroundColor: '#0033FF', marginTop: '5rem' }}
                  onClick={() => setCompany({ ...company, confirm: true })}
                >
                  Continuar
                </Button>
              </div>
            </>
          ) : (
            <>
              <InputGroup className="mb-3">
                <Form.Control
                  isInvalid={!!errors.username && touched.username}
                  type="text"
                  placeholder="Username"
                  {...getFieldProps('username')}
                />
                {touched.username && errors.username && (
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                )}
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control
                  isInvalid={!!errors.email && touched.email}
                  type="email"
                  placeholder={`${
                    member ? `Email @${company.select}` : 'Email'
                  }`}
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
                  style={{
                    borderRightColor: !errors.password && 'transparent',
                  }}
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
              <InputGroup className="mb-3">
                <Form.Control
                  isInvalid={
                    !!errors.passwordConfirmation &&
                    touched.passwordConfirmation
                  }
                  style={{
                    borderRightColor:
                      !errors.passwordConfirmation && 'transparent',
                  }}
                  type={hidePassword ? 'password' : 'text'}
                  placeholder="Confirmación contraseña"
                  {...getFieldProps('passwordConfirmation')}
                />
                <InputGroup.Text
                  style={{
                    backgroundColor: '#fff',
                    borderLeftColor: 'transparent',
                  }}
                  onClick={() => setHidePassword(!hidePassword)}
                  className={
                    errors.passwordConfirmation && 'input-icon-error-redait'
                  }
                >
                  {hidePassword ? <FaEye /> : <FaEyeSlash />}
                </InputGroup.Text>
                {touched.passwordConfirmation &&
                  errors.passwordConfirmation && (
                    <Form.Control.Feedback type="invalid">
                      {errors.passwordConfirmation}
                    </Form.Control.Feedback>
                  )}
              </InputGroup>
              {alert.show && <AlertClose message={alert.message} />}
              <div className="d-grid">
                <Button
                  variant="primary"
                  style={{ backgroundColor: '#0033FF', marginTop: '3rem' }}
                  type="submit"
                  disabled={!validate}
                >
                  Crear Cuenta
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </Form>
  );
};

export default RegisterFields;
