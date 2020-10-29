import React from 'react';
import { connect } from 'react-redux';
import { user } from '../actions';
import { Link } from 'react-router-dom';
import Wallet from '../img/wallet.png';


class Login extends React.Component {
  constructor(){
    super();
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.state = {
      email: '',
      emailValidate: false,
      passwordValidate: false,
    }
  }

  validateEmail = (email)  => {
    let emailValidate = false;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.toLowerCase())){
      emailValidate = true;
    }
    this.setState({
      email,
      emailValidate
    });
  }

  validatePassword = (password) => {
    let passwordValidate = false;
    if(password.length >= 6){
      passwordValidate = true;
    }
    this.setState({
      passwordValidate
    });
  }

  render() {
    const { email, emailValidate, passwordValidate} = this.state;
    const { loginUser } = this.props;

    return (
      <div className="containerLogin">
        <div>
          <img src={Wallet} alt="Wallet" width="100" height="100" />
        </div>
        <div>
          <input
            data-testid="email-input"
            type="email"
            name="email"
            placeholder="Digite seu email"
            onChange={ e => this.validateEmail(e.target.value) }
          />
        </div>
        <div>
          <input
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Digite sua senha"
            onChange={ e => this.validatePassword(e.target.value) }
          />
        </div>
        <div>
          <Link to="/carteira">
            <button
              type="button"
              name="btnEntrar"
              disabled={ !(emailValidate && passwordValidate) }
              onClick={ () => loginUser(email) }
            >
              Entrar
            </button>
          </Link>
          
        </div>
        
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  loginUser: (email) => dispatch(user(email))
})

export default connect(null, mapDispatchToProps)(Login);
