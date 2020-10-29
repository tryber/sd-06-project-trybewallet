import React from 'react';
import { loginAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };

    this.submitEmail = this.submitEmail.bind(this);
  };

  submitEmail(e) {
    e.preventDefault();
    const { email } = this.state;
    const { importedThunk } = this.props;

    this.setState({
      email: e.target.value
    }, () => {
      loginDispatch(email)
    })
  };

  render() {
    return (
      <div>
        <form>
          <fieldset>
            <input type="email" data-testid="email-input" placeholder="Email" />
            <input type="password" data-testid="password-input" placeholder="Password" minLength="6" />
          </fieldset>
          <button type="button" onClick={this.submitEmail}>
            Entrar
          </button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  loginDispatch: (email) => dispatch(loginAction(email))
};

Login.propTypes = {
  loginDispatch: propTypes.func.isRequired,
};

export default Login;
