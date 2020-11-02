import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addEmail } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      disableButton: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkInput = this.checkInput.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, () => this.checkInput());
  }

  checkInput() {
    const { email, senha } = this.state;
    const check = email.split('@');
    // console.log(check);
    const num = 6;
    if (check.length === 2 && check[1].endsWith('.com')) {
      if (senha.split('').length >= num) {
        return this.setState({
          disableButton: false,
        });
      }
    }
    return this.setState({
      disableButton: true,
    });
  }

  render() {
    const { email, disableButton } = this.state;
    const { handleLogin } = this.props;
    return (
      <form>
        <input
          data-testid="email-input"
          name="email"
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          name="senha"
          onChange={ this.handleChange }
        />
        <Link to="/carteira">
          <button
            type="button"
            onClick={ () => handleLogin(email) }
            disabled={ disableButton }
          >
            Entrar
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (email) => dispatch(addEmail(email)),
});

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
