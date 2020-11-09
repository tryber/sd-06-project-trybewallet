import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../../actions/index';
import PropTypes from 'prop-types';
import './LoginForm.css';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.checkFields = this.checkFields.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  checkFields() {
    const { password, email } = this.state;
    const verifyEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i);
    const passLeng = 6;
    let check = true
    if (verifyEmail && password.length >= passLeng) {
      check = false;
    }
    return check;
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="login-card">
        <form>
          <div className="form-group">
            <label htmlFor="usr-email">Email</label>
            <input
              className="form-control"
              type="email"
              name="usr-email"
              placeholder="email@email.com"
              data-testid="email-input"
              value={email}
              onChange={this.handleChange}
            />
            <label htmlFor="usr-password">Senha</label>
            <input
              className="form-control"
              type="password"
              name="usr-password"
              placeholder="senha"
              data-testid="password-input"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <Link
            to="/carteira"
            onClick={ () => {
              fieldChange(email);
            } }
          >
            <button
              type="button"
              disabled={ this.checkFields() }
              className="btn"
            >
              Entrar
          </button>
          </Link>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  fieldChange: (email) => dispatch(loginAction(email))
});

LoginForm.propTypes = {
  fieldChange: PropTypes.func.isRequired(),
};

export default connect(null, mapDispatchToProps)(LoginForm);
