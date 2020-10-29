import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSignUp(event) {
    event.preventDefault();
    const { sendEmail } = this.props;
    const { email } = this.state;
    sendEmail(email);
    const { history } = this.props;
    history.push('/carteira');
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        LOGIN
        <form onSubmit={ this.handleSignUp }>
          <input
            type="text"
            placeholder="email"
            name="email"
            value={ email }
            data-testid="email-input"
            onChange={ this.handleChange }
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={ password }
            data-testid="password-input"
            onChange={ this.handleChange }
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (emailUser) => dispatch(login(emailUser)),
});

Login.propTypes = {
  history: propTypes.objectOf(propTypes.object).isRequired,
  sendEmail: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
