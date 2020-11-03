import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, fetchCurrencies } from '../actions/index';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.addExpenseForm = this.addExpenseForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  async fetchExRate(currency) {
    const APIURL = `https://economia.awesomeapi.com.br/all/${currency}-BRL`;
    const response = await fetch(APIURL);
    const exchangeRate = await response.json();
    return exchangeRate[currency].ask;
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { getCurrencies } = this.props;
    getCurrencies();
    const { wallet: { currencies, expenses } } = this.props;
    const expense = {};
    const { addExpenseInfo } = this.props;
    event.target.childNodes.forEach((el) => {
      if (el.tagName !== 'BUTTON') expense[el.children[0].name] = el.children[0].value;
    });
    expense.exchangeRates = currencies;
    expense.id = expenses.length;
    addExpenseInfo(expense);
    event.target.reset();
  }

  // Formulário para adicionar despesa
  addExpenseForm(currencies) {
    const currencyCodes = Object.keys(currencies).filter((curr) => curr !== 'USDT');
    const currenciesList = currencyCodes.map((currency, index) => (
      <option
        key={ index }
        data-testid={ currency }
        value={ currency }
      >
        {currency}
      </option>));
    const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const paymentList = paymentMethods.map((method, index) => (
      <option
        key={ index }
        value={ method }
      >
        {method}
      </option>));
    const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const categoriesList = categories.map((category, index) => (
      <option
        key={ index }
        value={ category }
      >
        {category}
      </option>));
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="value-input">
          Valor da despesa:
          <input
            type="number"
            name="value"
            min="0"
            step="any"
            data-testid="value-input"
            id="value-input"
          />
        </label>
        <label htmlFor="description-input">
          Descrição da despesa:
          <input
            type="text"
            name="description"
            data-testid="description-input"
            id="description-input"
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select data-testid="currency-input" name="currency" id="currency-input">
            {currenciesList}
          </select>
        </label>
        <label htmlFor="method-input">
          Forma de Pagamento:
          <select data-testid="method-input" name="method" id="method-input">
            {paymentList}
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select data-testid="tag-input" name="tag" id="tag-input">
            {categoriesList}
          </select>
        </label>
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }

  render() {
    const { wallet: { currencies, expenses } } = this.props;
    const { user: { email } } = this.props;
    const expenseValues = expenses
      .map((expense) => ((expenses.exchangeRates !== null)
        ? expense.value * expense.exchangeRates[expense.currency].ask
        : expense.value));
    const total = expenseValues
      .reduce((acc, expense) => acc + Number(expense), 0).toFixed(2);
    return (
      <main>
        <header>
          <h1 data-testid="email-field">{email}</h1>
          <data data-testid="total-field">
            {(expenses.length === 0) ? 0 : total}
            <span data-testid="header-currency-field">BRL</span>
          </data>
        </header>
        {this.addExpenseForm(currencies)}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenseInfo: (e) => dispatch(addExpense(e)),
  getCurrencies: (currency) => dispatch(fetchCurrencies(currency)),
});

Wallet.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  addExpenseInfo: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.shape(PropTypes.any).isRequired,
    expenses: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
