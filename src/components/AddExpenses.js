import React from 'react';
import './AddExpenses.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesPrice, addExpensesToState } from '../actions';

class AddExpenses extends React.Component {
  constructor() {
    super();
    this.handleOwnState = this.handleOwnState.bind(this);
    this.addExpensesToReduxState = this.addExpensesToReduxState.bind(this);
    this.convertValue = this.convertValue.bind(this);

    this.state = {
      value: '',
      currency: '',
      method: '',
      tag: '',
      description: '',
    };
  }

  componentDidMount() {
    const { fetchPrices } = this.props;
    fetchPrices();
  }

  handleOwnState(id, value) {
    this.setState({ [id]: value });
  }

  convertValue() {
    const { currenciesPrice, expenses, totalExpenses } = this.props;
    const { currency, value } = this.state;
    const currPrice = parseFloat(currenciesPrice[0][currency].ask);
    const totalValue = currPrice * parseFloat(value);
    let totalCost = 0;
    if (expenses.length === 0) {
      totalCost = totalValue;
    } else {
      totalCost = totalExpenses + totalValue;
    }
    return totalCost;
  }

  async addExpensesToReduxState() {
    const { value, currency, method, tag, description } = this.state;
    const { addExpense, fetchPrices } = this.props;
    await fetchPrices();
    const totalExpenses = this.convertValue();
    const payload = { value, currency, method, tag, description };
    addExpense(payload, totalExpenses);
  }

  render() {
    const { currenciesPrice } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const currencies = (currenciesPrice[0])
      ? Object.keys(currenciesPrice[0])
      : ['Loading...'];
    return (
      <form className="add-expense">
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            type="number"
            className="inputs size1"
            data-testid="value-input"
            value={ value }
            onChange={ ({ target }) => this.handleOwnState(target.id, target.value) }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            type="text"
            className="inputs size1"
            data-testid="currency-input"
            value={ currency }
            onChange={ ({ target }) => this.handleOwnState(target.id, target.value) }
          >
            <option>-</option>
            {currencies.map((eachCurrency) => (
              <option
                key={ eachCurrency }
                value={ eachCurrency }
                data-testid={ eachCurrency }
              >
                {eachCurrency}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            id="method"
            type="text"
            className="inputs size3"
            data-testid="method-input"
            value={ method }
            onChange={ ({ target }) => this.handleOwnState(target.id, target.value) }
          >
            <option>-</option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            id="tag"
            type="text"
            className="inputs size2"
            data-testid="tag-input"
            value={ tag }
            onChange={ ({ target }) => this.handleOwnState(target.id, target.value) }
          >
            <option>-</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            type="text"
            className="inputs size4"
            data-testid="description-input"
            value={ description }
            onChange={ ({ target }) => this.handleOwnState(target.id, target.value) }
          />
        </label>
        <button
          type="button"
          className="bt-add-expenses"
          onClick={ () => this.addExpensesToReduxState() }
        >
          Adicionar Despesa
          <AiOutlinePlusCircle className="bt-icon-plus" size="35" />
        </button>
      </form>
    );
  }
}

AddExpenses.propTypes = {
  fetchPrices: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  currenciesPrice: PropTypes.objectOf(PropTypes.object).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currenciesPrice: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  expenses: state.wallet.expenses,
  totalExpenses: state.wallet.totalExpenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPrices: () => dispatch(fetchCurrenciesPrice()),
  addExpense: (payload, totalExpenses) => (
    dispatch(addExpensesToState(payload, totalExpenses))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenses);
