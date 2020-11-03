import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/Form';

class Wallet extends React.Component {
  totalExpenses() {
    const { expenses } = this.props;
    const numberBasis = 10;
    if (expenses.length !== 0) {
      const total = expenses.reduce((acc, cur) => {
        acc += parseFloat((parseFloat(cur.value, numberBasis)
          * parseFloat(cur.exchangeRates[cur.currency].ask, numberBasis)
            .toFixed(2)).toFixed(2));
        return acc;
      }, 0);
      return total;
    }
    return 0;
  }

  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <div data-testid="email-field">{ email }</div>
          <div data-testid="total-field">
            Gastos totais:
            { this.totalExpenses() }
          </div>
          <div data-testid="header-currency-field">Cambio: BRL</div>
        </header>
        <Form />
      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

function mapStateToProps(state) {
  return {
    email: state.user.email,
    expenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps)(Wallet);
