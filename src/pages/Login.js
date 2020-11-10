import React from 'react';
// import { PropTypes } from "prop-types";
import { connect } from 'react-redux';
import { saveLogin } from '../actions';

const validEmail = /^\w*@\w*\.\w{2,5}$|^\w*@\w*\.\w{2,5}\.\w{2,3}$/;
//const validPassword = /[^\s ]{6,25}/;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      validEmail: '',
      validPassword: '',
      btnDesabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendInfoLogin = this.sendInfoLogin.bind(this);
  }
  
  handleChange({ target }) {
    const { validPassword, validEmail } = this.state;
    if (validEmail !== '' && validPassword !== '' ) {
      this.setState({
        btnDesabled: false,
      });
    } else {
      this.setState({
        btnDesabled: true,
      });
    }
  }

  sendInfoLogin(e) {
    const { history, Login } = this.props;
    const { email } = this.state;
    e.preventDefault();
    Login(email);
    history.push('carteira');
  };

  render() {
    const { btnDesabled } = this.state;
    return (
      <div>
        <form onSubmit={ this.sendInfoLogin }>
          <label>
            Email
            <input
              type="text"
              id="email"
              name="email"
              onChange={ (e) => {
                const valid = validEmail.test(e.target.value);
                this.handleChange(e);
                if (valid === true) {
                  this.setState({
                    email: e.target.value,
                    validEmail: 'OK',
                  });
                } else {
                  this.setState({
                    email: e.target.value,
                    validEmail: '',
                  });
                }
              } }
              data-testid="email-input"
            />
          </label>
          <label>
            Senha
            <input
              type="password"
              name="password"
              onChange={ (e) => {
                const valid = e.target.value;
                if (valid.length >= 5) {
                  this.setState({
                   validPassword: 'OK',
                 })
                } else {
                  this.setState({
                   validPassword: '',
                 })
                }
                this.handleChange(e);
              } }
              data-testid="password-input"
            />
          </label>
          <button type="submit" className="btn-login" disabled={btnDesabled} >Entrar</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  Login: (email) => dispatch(saveLogin(email)),
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Login);
