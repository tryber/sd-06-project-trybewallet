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
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
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
