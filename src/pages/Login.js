import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.handleOnChange = this.handleOnChange.bind(this);

    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleOnChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      // console.log(this.state);
      const { email, password } = this.state;
      // Found function of test to validate email on:
      // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      const validateEmail = (/\S+@\S+\.\S+/).test(email);
      const validPassword = 6;
      if (validateEmail && validPassword <= password.length) {
        this.setState(
          { disabled: false },
        );
      } else {
        this.setState(
          { disabled: true },
        );
      }
    });
    // Caso a função fique fora como mostra o console.log ela não pega o state no momento da ação,
    // somente na próxima, por isso ela tem que ficar em cima logo após atualizar o state.
    // console.log(this.state);
  }

  render() {
    const { email, password, disabled } = this.state;
    // Destruturate my login action as a props
    const { login } = this.props;

    return (
      <div>
        <input 
          data-testid="email-input"
          type="text"
          placeholder="Enter Email"
          name="email"
          value={ email }
          onChange={ this.handleOnChange } />
        <br />
        <input 
          data-testid="password-input"
          type="text"
          placeholder="Enter Password"
          name="password"
          value={ password }
          onChange={ this.handleOnChange } />
        <br />
        <Link to="/carteira">
          <button type="button"
            disabled={ disabled }
            // Clicking at button disparates dispatch function to save state email at /actions/index
            onClick={ () => login(email) }
          >
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

// Function that make dispatch to my /actions/index
const mapDispatchToProps = (dispatch) => ({
  login: (inputedEmail) => dispatch(login(inputedEmail)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Login);
