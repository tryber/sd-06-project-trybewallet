import React from 'react';
import { connect } from 'react-redux';
import propType from 'prop-types';
import { fetchSavedCurrencies, addElement } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.handleAddNewExpense = this.handleAddNewExpense.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    const { dispatchFetchCurrencies } = this.props;
    dispatchFetchCurrencies();
  }

  handleAddNewExpense(e) {
    e.preventDefault();
    const { dispatchSaveExpenses } = this.props;
    dispatchSaveExpenses(this.state);
  }

  handleInput({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { email, currencies, expenses } = this.props;
    const { value, ...expense } = this.state;
    const total = expenses.length ? Math.round(expenses
      .reduce((acc, cur) => acc + cur.value
       * cur.exchangeRates[cur.currency].ask, 0) * 100) / 100 : 0;
    return (
      <div className="containerWallet">
        <header className="containerHeader">
          Email:
          <div data-testid="email-field">{ email }</div>
          Despesa total:
          <div data-testid="total-field">
            { total }
            <div data-testid="header-currency-field">
              BRL
            </div>
          </div>
        </header>
        <main className="containerMain">
          <input
            type="text"
            data-testid="value-input"
            required
            placeholder="Type the value of the expense"
            value={ value }
            name="value"
            id="value"
            onChange={ this.handleInput }
          />
          <input
            type="text"
            data-testid="description-input"
            required
            placeholder="Type the description of the expense"
            value={ expense.description }
            id="description"
            name="description"
            onChange={ this.handleInput }
          />
          <select
            data-testid="currency-input"
            required
            placeholder="Currency"
            id="currency"
            name="currency"
            value={ expense.currency }
            onChange={ this.handleInput }
          >
            <option>Select a currency </option>
            {currencies.map((currency) => (
              <option
                key={ currency }
                value={ currency }
                data-testid={ currency }
              >
                {currency !== 'USDT' ? currency : null}
              </option>
            ))}
          </select>
          <select
            data-testid="method-input"
            required
            placeholder="Payment type"
            id="method"
            name="method"
            value={ expense.method }
            onChange={ this.handleInput }
          >
            <option>Select a payment type</option>
            {paymentMethods.map((method) => (
              <option
                key={ method }
                value={ method }
                data-testid={ method }
              >
                { method }
              </option>
            ))}
          </select>
          <select
            data-testid="tag-input"
            required
            placeholder="Category"
            id="tag"
            name="tag"
            value={ expense.tag }
            onChange={ this.handleInput }
          >
            <option>Select a tag</option>
            {tags.map((tag) => (
              <option
                key={ tag }
                value={ tag }
                data-testid={ tag }
              >
                { tag }
              </option>
            ))}
          </select>
          <button
            type="submit"
            onClick={ this.handleAddNewExpense }
          >
            Adicionar despesa
          </button>
        </main>
        <Table />
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
  dispatchFetchCurrencies: () => dispatch(fetchSavedCurrencies()),
  dispatchSaveExpenses: (expense) => dispatch(addElement(expense)),
});

Wallet.propTypes = {
  email: propType.string.isRequired,
  dispatchFetchCurrencies: propType.func.isRequired,
  dispatchSaveExpenses: propType.func.isRequired,
  currencies: propType.arrayOf(Object).isRequired,
  expenses: propType.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
