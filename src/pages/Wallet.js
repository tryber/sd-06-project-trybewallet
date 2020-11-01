import React from 'react';
import { connect } from 'react-redux';
// import { loginAction } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // const { loginAction } = this.props;
    // loginAction('email');
  }

  render() {
    // const { nomequalquer } = this.props;

    return <div>TrybeWallet</div>;
    // return <div onClick={this.handleClick}>TrybeWallet {nomequalquer}</div>;
  }
}

const mapStateToProps = () => ({
  // nomequalquer: state.wallet.helloWorld,
});

const mapDispatchToProps = () => ({
  // loginAction: (email) => dispatch(loginAction(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
