import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { inputAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      pass: '',
      disable: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;

    this.setState({
      [name]: target.value,
    });
  }

  handleSubmit() {
    const { login, history } = this.props;
    const { email } = this.state;

    login(email);
    history.push('/carteira');
  }

  handleLogin() {
    const { email, pass } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;
    const min = 5;

    if (pass.length > min && regex.test(email)) {
      this.setState({
        disable: false,
      });
    }
  }

  render() {
    const { email, pass, disable } = this.state;
    return (
      <div>
        <div className="text-center">
          <h1>Welcome</h1>
        </div>

        <div className="row justify-content-center">
          <form onSubmit={ this.handleSubmit }>
            <div className="form-group">
              <input
                type="email"
                value={ email }
                placeholder="email"
                data-testid="email-input"
                name="email"
                onChange={ this.handleChange }
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                value={ pass }
                placeholder="senha"
                data-testid="password-input"
                name="pass"
                onChange={ this.handleChange }
                onKeyDown={ this.handleLogin }
                required
              />
            </div>

            <button
              disabled={ disable }
              className="btn btn-primary"
              type="submit"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (email) => dispatch(inputAction(email)),
});

Login.propTypes = {
  email: PropTypes.string,
  login: PropTypes.string,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
