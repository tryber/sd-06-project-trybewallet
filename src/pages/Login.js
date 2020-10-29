import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();

    this.setStateValue = this.setStateValue.bind(this);

    this.state = {
      email: '',
    };
  }

  setStateValue(event) {
    const { value } = event.target;
    this.setState({
      email: value,
    });
  }

  render() {
    const { email } = this.state;

    return (
      <div>
        <input
          onChange={ this.setStateValue }
          type="email"
          data-testid="email-input"
          placeholder="Email"
        />
        <input
          type="senha"
          data-testid="password-input"
          placeholder="Senha"
        />
        <Link to="/carteira">
          <button
            type="button"
            onClick={ () => this.props.emailAction(email) }
          >Entrar
          </button>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  emailAction: PropTypes.func.isRequired,
};

const mapDispacthToProps = (dispatch) => ({
  emailAction: (email) => dispatch(login(email)),
});

export default connect(null, mapDispacthToProps)(Login);
