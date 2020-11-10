import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: 'BRL',
    };

    this.headerExpenses = this.headerExpenses.bind(this);
  }

  headerExpenses() {
    const { expenses } = this.props;

    const totalExpenses = expenses.reduce((acc, expense) => {
      const { value, exchangeRates, currency } = expense;
      const convertedValue = (value * exchangeRates[currency].ask);

      return acc + convertedValue;
    }, 0);
    return totalExpenses;
  }

  render() {
    const { currency } = this.state;
    const { email } = this.props;

    return (
      <div>
        <span data-testid="email-field">
          {email}
        </span>
        <span data-testid="total-field">
          { this.headerExpenses() }
        </span>
        <span data-testid="header-currency-field">
          {currency}
        </span>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    email: state.user.email,
    expenses: state.wallet.expenses,
  };
}
Header.propTypes = {
  email: PropTypes.string.isRequired,
  reduce: PropTypes.func.isRequired,
  expenses: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Header);
