import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { userEmail, expenses } = this.props;
    const totalExpense = expenses.reduce((acc, cur) => acc + cur, 0);
    const localCurrency = 'BRL';
    return (
      <div>
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default connect(mapStateToProps)(Wallet);
