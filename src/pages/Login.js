import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { selectUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: '',
      senha: '',
      controlButton: false,
      login: false,
    };
  }

  handleSubmit(event) {
    const { email } = this.state;
    const { mySelectUser } = this.props;
    event.preventDefault();
    mySelectUser(email);
    this.setState({
      login: true,
    });
  }

  handleUpdateState(field, event) {
    this.setState({
      [field]: event.target.value,
    });
  }

  validateEmail(email) {
    const regexEmail = /\S+@\S+\.\S+/;
    const validation = regexEmail.test(email.toLowerCase());
    if (validation) {
      this.setState({
        controlButton: true,
      });
    } else {
      this.setState({
        controlButton: false,
      });
    }
  }

  render() {
    const { login } = this.state;
    if (login) {
      return <Redirect to="/carteira" />;
    }
    const { email, senha, controlButton } = this.state;
    const passwordLength = 6;
    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <label
            htmlFor="email-user"
          >
            Email
            <input
              placeholder="Digite seu email"
              data-testid="email-input"
              id="email-user"
              type="text"
              value={ email }
              onChange={ (event) => {
                this.handleUpdateState('email', event);
                this.validateEmail(email);
              } }
            />
          </label>
          <label htmlFor="movie_image">
            Senha
            <input
              placeholder="Digite sua senha"
              data-testid="password-input"
              id="senha-user"
              type="password"
              value={ senha }
              onChange={ (event) => this.handleUpdateState('senha', event) }
            />
          </label>
          <button
            type="submit"
            disabled={ senha.length < passwordLength || controlButton === false }
          >
            Entrar
          </button>
        </form>
      </div>);
  }
}



const mapDispatchToProps = (dispatch) => ({
  mySelectUser: (email) => dispatch(selectUser(email)),
});

export default connect(null, mapDispatchToProps)(Login);
