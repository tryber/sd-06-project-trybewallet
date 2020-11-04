import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormExpense from '../components/FormExpense';
import '../css/Wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();

    this.sumPrice = this.sumPrice.bind(this);
  }

  sumPrice() {
    const { expenseValue } = this.props;
    if (expenseValue.length > 0) {
      return expenseValue
        .reduce((acc, curr) => (acc + (
          parseFloat(curr.exchangeRates[curr.currency].ask)
        ) * curr.value), 0).toFixed(2);
    }
    return 0;
  }

  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <header className="headerInfo">
          <ul>
            <li data-testid="email-field">{`Email: ${userEmail}`}</li>
            <li data-testid="total-field">{this.sumPrice()}</li>
            <li data-testid="header-currency-field">BRL</li>
          </ul>
        </header>
        <FormExpense />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenseValue: state.wallet.expenses,
});

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenseValue: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Wallet);
