import React from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form';

class Wallet extends React.Component {
  totalExpenses() {
    const { expenses } = this.props;
    if (expenses.length !== 0) {
      const total = expenses.reduce((acc, cur) => {
        acc += parseInt(cur.value, 10);
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

function mapStateToProps(state) {
  return {
    email: state.user.email,
    expenses: state.wallet.expenses,
  };
}

export default connect(mapStateToProps)(Wallet);
