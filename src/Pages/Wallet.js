import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: {
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
      },
    }

  }

  render() {
    const { email, expenses, currencies } = this.props;
    const { expense } = this.state;
    const { value, currency, method, tag, description } = expense;

    const expensesSum = expenses
      .reduce(((acc, curr) => acc + parseFloat((curr
        .exchangeRates[curr.currency].ask * curr.value).toFixed(2))), 0);

    return (
      <div>
        <nav className="user-info">
          <div>
            User:
              <span data-testid="email-field"> { email } </span>
          </div>
          <div>
            Despesas: R$
              <span data-testid="total-field"> { expensesSum } </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({

})

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
