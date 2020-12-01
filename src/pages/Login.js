import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { emailReady } from '../actions/loginActions';

const Login = (props) => {
  const { emailIsReady, emailValue } = props;
  const [senha, setSenha] = useState('');

  const valido = emailValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i);
  const five = 5;
  const isItDisabled = senha.length > five && valido !== null;

  return (
    <div>
      <div>
        <input
          type="text"
          name="email"
          onChange={ ({ target: { value } }) => { emailIsReady(value); } }
          value={ emailValue }
          data-testid="email-input"
          placeholder="E-mail"
        />
        <input
          type="password"
          name="senha"
          value={ senha }
          onChange={ ({ target: { value } }) => setSenha(value) }
          data-testid="password-input"
          placeholder="Password"
        />
        <Link to="/carteira">
          <button
            type="button"
            disabled={ !isItDisabled }
            data-testid="login-submit-btn"
          >
            Entrar
          </button>
        </Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  emailIsReady: (email) => dispatch(emailReady(email)),
});

const mapStateToProps = (state) => ({
  emailValue: state.user.email,
});

Login.propTypes = {
  emailIsReady: PropTypes.func.isRequired,
  emailValue: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

//  ref1: https://stackoverflow.com/questions/55983047/strange-behavior-of-react-hooks-delayed-data-update
