import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletHeader extends React.Component {
  render() {
    const { userEmail, expenses } = this.props;
    const totalExpense = expenses.reduce((acc, cur) => acc + cur, 0);
    const localCurrency = 'BRL';
    return (
      <header>
        <div>
          <span>TrybeWallet</span>
        </div>
        <div>
          <span data-testid="email-field">{ userEmail }</span>
        </div>
        <div>
          <span data-testid="total-field">{ totalExpense }</span>
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
  expenses: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default connect(mapStateToProps)(WalletHeader);
