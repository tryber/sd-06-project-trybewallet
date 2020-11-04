import React from 'react';
import './AddExpenses.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchCurrenciesPrice,
  addExpensesToState,
  editExpenseField,
  editActiveExpense,
} from '../actions';

class AddExpenses extends React.Component {
  constructor() {
    super();
    this.addExpensesToReduxState = this.addExpensesToReduxState.bind(this);
    this.convertValue = this.convertValue.bind(this);
  }

  componentDidMount() {
    const { fetchPrices } = this.props;
    fetchPrices();
  }

  convertValue() {
    const {
      currenciesPrice,
      expenses,
      totalExpenses,
      expenseEditingBar: { currency, value },
    } = this.props;
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
    const {
      addExpense,
      fetchPrices,
      expenseEditingBar: { value, currency, method, tag, description },
    } = this.props;
    await fetchPrices();
    const totalExpenses = this.convertValue();
    const payload = { value, currency, method, tag, description };
    addExpense(payload, totalExpenses);
  }

  editExpensesOnReduxState() {
    const { editExpense } = this.props;
    editExpense();
  }

  render() {
    const {
      currenciesPrice,
      isEditing,
      expenseEditingBar = 0,
      editItemExpense,
    } = this.props;
    const btClickFunc = (isEditing)
      ? (() => this.editExpensesOnReduxState())
      : (() => this.addExpensesToReduxState());
    let classEditingForm = 'add-expense';
    let textButton = 'Adicionar Despesa';
    let btIcon = <AiOutlinePlusCircle size="35" />;
    if (isEditing) {
      classEditingForm = 'edit-expense';
      textButton = 'Editar Despesa';
      btIcon = <FaEdit size="35" />;
    }
    const currencies = (currenciesPrice[0])
      ? Object.keys(currenciesPrice[0])
      : ['Loading...'];
    return (
      <form className={ classEditingForm }>
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            type="number"
            className="inputs size1"
            data-testid="value-input"
            value={ expenseEditingBar.value }
            onChange={ ({ target }) => editItemExpense(target.id, target.value) }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            type="text"
            className="inputs size1"
            data-testid="currency-input"
            value={ expenseEditingBar.currency }
            onChange={ ({ target }) => editItemExpense(target.id, target.value) }
          >
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
            value={ expenseEditingBar.method }
            onChange={ ({ target }) => editItemExpense(target.id, target.value) }
          >
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
            value={ expenseEditingBar.tag }
            onChange={ ({ target }) => editItemExpense(target.id, target.value) }
          >
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
            value={ expenseEditingBar.description }
            onChange={ ({ target }) => editItemExpense(target.id, target.value) }
          />
        </label>
        <button
          type="button"
          className="bt-add-expenses"
          onClick={ btClickFunc }
        >
          {textButton}
          {btIcon}
        </button>
      </form>
    );
  }
}

AddExpenses.propTypes = {
  fetchPrices: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  currenciesPrice: PropTypes.arrayOf(PropTypes.object).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalExpenses: PropTypes.number.isRequired,
  isEditing: PropTypes.bool.isRequired,
  editExpense: PropTypes.func.isRequired,
  editItemExpense: PropTypes.func.isRequired,
  expenseEditingBar: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  currenciesPrice: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  expenses: state.wallet.expenses,
  totalExpenses: state.wallet.totalExpenses,
  isEditing: state.wallet.isEditing,
  expenseEditingBar: state.wallet.expenseEditingBar,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPrices: () => dispatch(fetchCurrenciesPrice()),
  editItemExpense: (key, value) => dispatch(editExpenseField(key, value)),
  editExpense: () => dispatch(editActiveExpense()),
  addExpense: (payload, totalExpenses) => (
    dispatch(addExpensesToState(payload, totalExpenses))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenses);
