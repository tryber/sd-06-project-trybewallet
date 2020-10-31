import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { thunkCurrencies, thunkAddANewCurrency } from '../actions';
import './Wallet.css';

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
    this.handleNewExpense = this.handleNewExpense.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { currenciesFetchSucess } = this.props;
    currenciesFetchSucess();
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleNewExpense(event) {
    event.preventDefault();
    const { saveExpensesInfo } = this.props;
    saveExpensesInfo(this.state);
  }

  render() {
    const { value, ...expense } = this.state;
    const { email, currencies, expenses } = this.props;
    const totalValue = expenses.length ? Math.round(expenses
      .reduce((acc, cur) => acc + cur.value
       * cur.exchangeRates[cur.currency].ask, 0) * 100) / 100 : 0;
    return (
      <main>
        <header>
          <span data-testid="email-field">
            Email:
            { email }
          </span>
          <span data-testid="total-field">
            { totalValue }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              onChange={ this.handleChange }
              type="text"
              name="value"
              id="value"
              data-testid="value-input"
              value={ value }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              onChange={ this.handleChange }
              type="text"
              name="description"
              id="description"
              data-testid="description-input"
              value={ expense.description }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ expense.currency }
              onChange={ this.handleChange }
            >
              {currencies.map((coin) => (
                <option key={ coin } data-testid={ `${coin}` }>
                  { coin }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              value={ expense.method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              value={ expense.tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte ">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
            <button
              onClick={ this.handleNewExpense }
              type="submit"
            >
              Adicionar despesa
            </button>
          </label>
        </form>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesFetchSucess: () => dispatch(thunkCurrencies()),
  saveExpensesInfo: (expense) => dispatch(thunkAddANewCurrency(expense)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
  currenciesFetchSucess: PropTypes.func.isRequired,
  saveExpensesInfo: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
