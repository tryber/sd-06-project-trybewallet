import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import user from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.senhaTest = this.senhaTest.bind(this);
    this.loginTest = this.loginTest.bind(this);

    this.state = {
      email: '',
      loginTest: false,
      senhaTest: false,
    };
  }

  senhaTest(password) {
    let senhaTest = false;
    const rule = 6;
    if (password.length >= rule) {
      senhaTest = true;
    }
    this.setState({
      senhaTest,
    });
  }

  loginTest(email) {
    let loginTest = false;
    const re = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
    if (re.test(email.toLowerCase())) {
      loginTest = true;
    }
    this.setState({
      email,
      loginTest,
    });
  }

  render() {
    const { email, loginTest, senhaTest } = this.state;
    const { state } = this.props;
    return (
      <div>
        <form>
          <div>
            <input
              data-testid="email-input"
              name="email"
              onChange={ (e) => this.loginTest(e.target.value) }
            />
          </div>
          <div>
            <input
              data-testid="password-input"
              type="password"
              name="password"
              onChange={ (e) => this.senhaTest(e.target.value) }
            />
          </div>
          <div>
            <Link to="/carteira">
              <button
                type="button"
                disabled={ !(loginTest && senhaTest) }
                onClick={ () => state(email) }
              >
                Entrar
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  state: (email) => dispatch(user(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = { state: PropTypes.func.isRequired };
