import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super()

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { loginAction } = this.props
    loginAction('email')
  }

  render() {
    const { nomequalquer } = this.props

    return <div onClick={this.handleClick}>TrybeWallet {nomequalquer}</div>;
  }
}

const mapStateToProps = (state) => ({
  nomequalquer: state.wallet.helloWorld,
});

const mapDispatchToProps = (dispatch) => ({
  loginAction: (email) => dispatch(loginAction(email)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
