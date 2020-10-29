import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import trybewallet from './trybewallet.png';
import { changeEmail } from '../actions/index'
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      email: ""
    };
  }
  changeHandler = event => {
    this.setState({
      email: event.target.value
    })
  }
  render() {
    const { changeEmail } = this.props;
    return (
      <div className="login">
        <img alt="trybe-logo" src={ trybewallet } width="200px" />
        <Form>
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Enter email"
              data-testid="email-input"
              value={this.state.email}
              onChange={this.changeHandler}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password"
              data-testid="password-input"
            />
          </Form.Group>
          <Link to="/carteira" onClick={ () => changeEmail(this.state.email) }>
            <Button variant="success" block>Entrar</Button>
          </Link>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeEmail: (email) => dispatch(changeEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
