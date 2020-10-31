import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import trybeWallet from '../img/trybeWallet.png'
import { emailLogin, passwordLogin } from '../actions';


const state = {
  emailValid: false,
  passwordValid: false,
}

function Login({ getEmail, getPassword }) {
  // console.log(email.email)
  return (
    <div className="loginDiv">
      <img src={ trybeWallet } alt='Trybe Wallet' />
      <input onChange={ (e) => {
        if (e.target.value.includes('@')) {
          state.emailValid = true;
          getEmail(e.target.value);
        } else {
          state.emailValid = true;
        }
      } } type="text" data-testid="email-input" placeholder="E-mail" /> <br />

      <input onChange={ (e) => {
        if (e.target.value.length >= 6) {
          state.passwordValid = true;
          getPassword(e.target.value);
        } else {
          state.passwordValid = false;
        }
      } } type="password" data-testid="password-input" placeholder="Password" /> <br />

      {(state.emailValid && state.passwordValid) ?
        <Link to='/carteira'><button>Entrar</button></Link> :
        <button disabled>Entrar</button> }
      <br />
      { (state.emailValid) ? <span></span> : <span>Digite um e-mail válido.</span> } <br />
      { (state.passwordValid) ? <span></span> : <span>Digite um password válido.</span> }
    </div >
  )
}

const mapStateToPros = state => ({
  email: state.user
})

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => { dispatch(emailLogin(email)) },
  getPassword: (password) => { dispatch(passwordLogin(password)) },
})

export default connect(mapStateToPros, mapDispatchToProps)(Login);
