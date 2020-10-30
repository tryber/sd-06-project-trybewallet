import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const expensesCategories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const currenciesOptions = ['USD', 'CAD', 'EUR', 'GBP', 'ARS',
  'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];

class Wallet extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      paymentMethod: '',
    };
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const { email } = this.props;
    const { currency, paymentMethod, expenseCategory } = this.state;
    return (
      <div>
        WALLET
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <section>
          <p>
            Valor:
            <input type="number" />
          </p>
          <p>
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {currenciesOptions
                .map((coin) => (
                  <option data-testid={ coin } value={ coin } key={ coin }>
                    { coin }
                  </option>
                ))}
            </select>
          </p>
          <p>
            Método de pagamento:
            <select
              data-testid="method-input"
              name="paymentMethod"
              value={ paymentMethod }
              onChange={ this.handleChange }
            >
              {paymentMethods
                .map((method) => (
                  <option value={ method } key={ method }>
                    { method }
                  </option>
                ))}
            </select>
          </p>
          <p>
            Categoria:
            <select
              data-testid="tag-input"
              name="expenseCategory"
              value={ expenseCategory }
              onChange={ this.handleChange }
            >
              {expensesCategories
                .map((category) => (
                  <option value={ category } key={ category }>
                    { category }
                  </option>
                ))}
            </select>
          </p>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  email: propTypes.arrayOf(propTypes.array).isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
