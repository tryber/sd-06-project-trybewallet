import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email, expenses, currencyToExchange } = this.props;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          { expenses.reduce((expense, sum) => sum += expense.value, 0) }
        </p>
        <p data-testid="header-currency-field">{ currencyToExchange }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencyToExchange: state.wallet.currencyToExchange,
});

export default connect(mapStateToProps)(Wallet);

Wallet.defaultProps = {
  email: '',
  expenses: [],
  currencyToExchange: '',
};

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.number),
  currencyToExchange: PropTypes.string,
};
