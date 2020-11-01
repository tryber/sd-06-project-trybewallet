import React from 'react';
import { connect } from 'react-redux';

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
    const { email } = this.props;

    return (
      <>
        <header>
          <h1 data-testid="email-field">oi, { email }</h1>
        </header>
      </>
    );
    // return <div onClick={this.handleClick}>TrybeWallet {nomequalquer}</div>;
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = () => ({
  // loginAction: (email) => dispatch(loginAction(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
