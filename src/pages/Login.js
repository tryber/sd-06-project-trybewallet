import React, { Fragment } from 'react';
import EmailLogin from './components/Email';
import PasswordLogin from './components/Password';
import ButtonLogin from './components/Button';

const Login = () => (
  <>
    <EmailLogin />
    <PasswordLogin />
    <ButtonLogin />
  </>
);

export default Login;
