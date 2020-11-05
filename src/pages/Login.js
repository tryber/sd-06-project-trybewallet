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
      disable: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    this.setState({
      [name]: target.value,
    },
    () => {
      const { email, pass } = this.state;
      const min = 5;
      const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/;

      this.setState({
        disable: pass.length > min && regex.test(email),
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { login, history } = this.props;
    const { email, disable } = this.state;
    if (disable) {
      history.push('/carteira');
      return login(email);
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
                required
              />
            </div>

            <button
              disabled={ !disable }
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
