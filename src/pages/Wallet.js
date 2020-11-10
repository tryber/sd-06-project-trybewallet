import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email, currency } = this.props; 
    return <div>
    TrybeWallet
    <div data-testid="email-field">{email}</div>
    <div data-testid="total-field" value="0"></div>
    <div data-testid="header-currency-field">{currency}</div>
    </div>;
  }
}

const mapStateToProps = store => ({
  email: store.user.email,
  currency: store.wallet.currencies,
  expense: store.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
