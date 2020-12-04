import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletHeader extends React.Component {
  render() {
    const decimalBase = 10;
    const { userEmail, expenses } = this.props;
    const totalExpense = expenses
      .reduce((acc, cur) => (
        acc + (parseFloat(cur.value, decimalBase) * parseFloat(
          cur.exchangeRates[`${cur.currency}`].ask,
          decimalBase,
        ))), 0);
    const localCurrency = 'BRL';
    return (
      <header className="wallet-header">
        <div className="wallet-title">
          <h1>TrybeWallet</h1>
        </div>
        <div>
          <span data-testid="email-field">{ userEmail }</span>
        </div>
        <div>
          <span data-testid="total-field">{ totalExpense.toFixed(2) }</span>
          {' '}
          <span data-testid="header-currency-field">{ localCurrency }</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

WalletHeader.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(WalletHeader);
