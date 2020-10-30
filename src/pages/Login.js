import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import loginAction from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      email: '',
      senha: '',
    };
    this.emailIsValid = this.emailIsValid.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  handleChange({ target }) {
    this.setState(({
      [target.name]: target.value,
    }), (() => {
      const { email, senha } = this.state;
      const SEIS = 6;

      if ((senha.length >= SEIS) && (this.emailIsValid(email))) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    }));
  }

  handleClick() {
    const { setEmail } = this.props;
    const { email } = this.state;
    setEmail(email);
    this.setState({
      email: '',
      senha: '',
    });
  }

  render() {
    const { email, senha, disabled } = this.state;

    return (
      <div>
        <div>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            onChange={ (event) => this.handleChange(event) }
            value={ email }
          />
        </div>
        <div>
          <input
            data-testid="password-input"
            type="password"
            name="senha"
            placeholder="Digite sua senha"
            onChange={ (event) => this.handleChange(event) }
            value={ senha }
          />
        </div>
        <div>
          <Link to="/carteira">
            <button
              type="button"
              disabled={ disabled }
              onClick={ () => this.handleClick() }
            >
              Entrar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  setEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
