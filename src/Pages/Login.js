import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { loginEmail } from '../Actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.checkFields = this.checkFields.bind(this);
    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  checkFields() {
    const { email, password } = this.state;
    const validEmail = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3})$/i);
    const passLeng = 6;
    let check = true;
    if( validEmail && password.length >= passLeng) { check=false }
    return check;
  }


  render() {
    const { fieldChange } = this.props;
    const { email, password } = this.state;
    return (
      <div className="form-container">
        <div className="login-form">
          <form>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="email@email.com"
                data-testid="email-input"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="senha"
                data-testid="password-input"
                value={password}
                onChange={this.handleChange}
              />
            </div>
            <Link
              to="/carteira"
              onClick={() => {
                fieldChange(email);
              }}
            >
              <button
                type="button"
                disabled={this.checkFields()}
                className="btn"
              >
                Entrar
                            </button>
            </Link>
          </form>

        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fieldChange: (email) => dispatch(loginEmail(email)),
});

Login.propTypes = {
  fieldChange: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(Login);