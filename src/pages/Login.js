import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { inputAction } from '../actions';

class Login extends React.Component {

  render() {
    const { email, pass, saveData } = this.props;
    return (
      <div>
        <div className="main">
          <h1>Login</h1>
          <form>
            <div>
              <input type="email" onChange={ ({target}) => saveData(target.name, target.value) } value={email} placeholder="email" data-testid="email-input" name="email"></input>
            </div>
            <div>
              <input type="password" onChange={ ({target}) => saveData(target.name, target.value) } value={pass} placeholder="senha" data-testid="password-input" name="pass"></input>
            </div>

            <Link to="/wallet">
              <button className="btn btn-info" type="submit">Entrar</button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.email,
  pass: state.pass,
});

const mapDispatchToProps = (dispatch) => ({
  saveData: (name, value) => dispatch(inputAction(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
