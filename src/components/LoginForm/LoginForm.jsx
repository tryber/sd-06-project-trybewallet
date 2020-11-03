import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import './LoginForm.css';

const LoginForm = (props) => {

  const history = useHistory();

  const handleSubmit = values => {
    console.log('Login submit', values);
    history.push('/carteira');
  }

  const validations = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  });

  return (
    <div className="login-card">
      <Formik initialValues={{}} onSubmit={handleSubmit} validationSchema={validations}>
        <Form className="login-form">
          <div className="login-group">
            <div className="form-group">
              <Field 
                name="email"
                type="email"
                data-testid="email-input"
                className="login-field"
                placeholder="email@email.com"
              />
              <ErrorMessage 
                name="email"
                component="span"
                className="login-error"
              />
            </div>
            <div className="form-group">
              <Field 
                name="password"
                type="password"
                data-testid="password-input"
                className="login-field"
                placeholder="senha"
              />
              <ErrorMessage 
                name="password"
                component="span"
                className="login-error"
              />
            </div>
            <div className="btn-wrapper">
              <button className="btn-login" type="submit">Entrar</button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default LoginForm;
