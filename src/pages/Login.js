import React from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import trybeWallet from '../img/trybeWallet.png';
import { emailLogin, passwordLogin } from '../actions';

const localState = {
  emailValid: false,
  passwordValid: false,
};

function Login({ getEmail, getPassword }) {
  // console.log(email.email)
  const PASSWORD_SIZE = 6;
  const validation = localState.emailValid && localState.passwordValid
  const history = useHistory();
  return (
    <div className="loginDiv">
      <img src={ trybeWallet } alt="Trybe Wallet" />
      <input
        onChange={ (e) => {
          const lastChar = e.target.value[e.target.value.length - 1];
          const numberOfAts = e.target.value.replace(/[^@]/g, "").length;
          if (e.target.value.includes('@')
          && numberOfAts === 1
          && lastChar !== '@'
          && lastChar !== '.'
          ) {
            localState.emailValid = true;
            getEmail(e.target.value);
          } else {
            localState.emailValid = false;
            getEmail(e.target.value);
          }
        } }
        type="text"
        data-testid="email-input"
        placeholder="E-mail"
      />
      <br />

      <input
        onChange={ (e) => {
          if (e.target.value.length >= PASSWORD_SIZE) {
            localState.passwordValid = true;
            getPassword(e.target.value);
          } else {
            localState.passwordValid = false;
            getPassword(e.target.value);
          }
        } }
        type="password"
        data-testid="password-input"
        placeholder="Password"
      />
      <br />
      
      <button 
      onClick={() => history.push("/carteira")} 
      disabled={!validation} 
      type="button">Entrar</button>

      <br />
      { (localState.emailValid) ? <span> </span>
        : <span>Digite um e-mail válido.</span> }
      <br />
      { (localState.passwordValid) ? <span> </span>
        : <span>Digite um password válido.</span> }
    </div>
  );
}

const mapStateToPros = (state) => ({
  email: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => { dispatch(emailLogin(email)); },
  getPassword: (password) => { dispatch(passwordLogin(password)); },
});

export default connect(mapStateToPros, mapDispatchToProps)(Login);

Login.propTypes = {
  getEmail: PropTypes.func.isRequired,
  getPassword: PropTypes.func.isRequired,
};
