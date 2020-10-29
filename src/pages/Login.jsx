import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logAction } from '../actions';

import Input from '../components/Input';
import Button from '../components/Button';

// found at https://iconape.com/truemoney-wallet-logo-logo-icon-svg-png.html
import logo from '../assets/logo.png';

import '../styles/login.css';

const SignIn = ({ logIn }) => {
  const { push } = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = useCallback(
    (submitEvent) => {
      submitEvent.preventDefault();

      if (emailError && passwordError) return;

      logIn(email);
      push('/carteira');
    },
    [push, email, password, setEmailError, setPasswordError],
  );

  const handleEmailChange = useCallback(({ target }) => {
    setEmail(target.value);

    const validEmail = target.value.match(/\w+@(\w+\.)+\w+$/i);

    setEmailError(!validEmail);
  }, [setEmailError]);

  const handlePasswordChange = useCallback(({ target }) => {
    setPassword(target.value);

    const MIN_PW_LENGTH = 5;
    const validPassword = target.value.length > MIN_PW_LENGTH;

    setPasswordError(!validPassword);
  }, [setPasswordError]);

  return (
    <div className="container">
      <div className="content">
        <img src={ logo } alt="GoFinance Logo" />

        <form onSubmit={ handleLogin } method="POST">
          <h1>Faça seu Login</h1>
          <Input
            name="email"
            value={ email }
            onChange={ handleEmailChange }
            icon={ FiMail }
            error={ emailError }
            placeholder="E-mail"
            data-testid="email-input"
          />
          <Input
            name="password"
            value={ password }
            onChange={ handlePasswordChange }
            icon={ FiLock }
            error={ passwordError }
            type="password"
            placeholder="Senha"
            data-testid="password-input"
          />
          <Button
            type="submit"
            disabled={ emailError || passwordError || !email || !password }
          >
            Entrar

          </Button>
        </form>

        <span to="signup">
          <FiAlertCircle size={ 20 } />
          Cadastre-se
        </span>
      </div>
      <div className="background" />
    </div>
  );
};

function dispatchProps(dispatch) {
  return {
    logIn: (email) => dispatch(logAction(email)),
  };
}

SignIn.propTypes = {
  logIn: PropTypes.func.isRequired,
};

export default connect(null, dispatchProps)(SignIn);
