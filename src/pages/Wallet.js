import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpense, fetchCurrencies } from '../actions/index';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    // this.fetchCurrencies = this.fetchCurrencies.bind(this);
    this.addExpenseForm = this.addExpenseForm.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleSubmit(event) {
    return console.log(event.target.value);
  }

  // Formulário para adicionar despesa
  addExpenseForm(currencies) {
    console.log(currencies);
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
          <input type="number" data-testid="value-input" id="value-input" />
        </label>
        <label htmlFor="description-input">
          Descrição da despesa:
          <input type="text" data-testid="description-input" id="description-input" />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select data-testid="currency-input" id="currency-input">
            {currenciesList}
          </select>
        </label>
        <label htmlFor="method-input">
          Forma de Pagamento:
          <select data-testid="method-input" id="method-input">
            {paymentList}
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select data-testid="tag-input" id="tag-input">
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
    return (
      <main>
        <header>
          <h1 data-testid="email-field">{email}</h1>
          <data data-testid="total-field">
            {(expenses.length === 0) ? 0 : expenses}
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
  addExpense: (e) => dispatch(addExpense(e)),
  getCurrencies: (currency) => dispatch(fetchCurrencies(currency)),
});

Wallet.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.shape(PropTypes.any).isRequired,
    expenses: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
