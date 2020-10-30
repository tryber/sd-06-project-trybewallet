import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import handleLogin, { updateForm } from '../actions/Login';

function Login({ email, password, handleClick, status, handleChange }) {
  return (
    <div>
      <input
        type="text"
        data-testid="email-input"
        name="email"
        onChange={ (e) => handleChange(e) }
        value={ email }
      />
      <input
        type="text"
        name="password"
        onChange={ (e) => handleChange(e) }
        data-testid="password-input"
        value={ password }
      />

      <button type="button" onClick={ () => handleClick(email, status) }>
        Entrar
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  password: state.user.password,
  status: state.user.status,
});

const mapDispatchToProps = (dispatch) => ({
  handleClick: dispatch(handleLogin()),
  handleChange: (e) => dispatch(updateForm(e)),
});

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  handleClick: PropTypes.shape({
    handleClick: PropTypes.func,
  }),
  handleChange: PropTypes.func,
  status: PropTypes.bool,
};

Login.defaultProps = {
  email: '',
  password: '',
  status: false,
  handleClick: () => {},
  handleChange: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
