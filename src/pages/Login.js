import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      submitEmail: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      email: event.target.value,
      submitEmail: '',
    });
  }

  handleSubmit(event) {
    event.prevenDefault();
    const { email, submitEmail } = this.state;
    const { submitButton } = this.props;

    this.setState({
      email: '',
      submitEmail: email,
    }, () => {
      submitButton(submitEmail);
    });
  }

  render() {
    const { email } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <fieldset>
          <input data-testid="password-input"
            type="email"
            placeholder="Email"
            onChange={ this.handleChange }
            value={ email }
          />
          <br />
          <br />
          <input data-testid="email-input"
            type="password"
            placeholder="Senha"
            minLength="6"
          />
          <br />
          <br />
          <button type="submit">
            Entrar
          </button>
        </fieldset>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitButton: (email) => dispatch(loginAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);
