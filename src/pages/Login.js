import React from 'react';
import PropTypes from 'prop-types';
import { actionCreators } from '../store/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <input
          type="email"
          data-testid="email-input"
          onChange={ (e) => actionCreators.login(e.target.value) }
        />
        <br />
        <input
          type="password"
          data-testid="password-input"
        />
        <br />
        <button onClick={ () => history.push('/carteira') } type="button">Entrar</button>
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
