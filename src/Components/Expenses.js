import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchingSaveExpense,
  fetchingCurrencies,
  deleteItem,
  addTotal,
  changeIsEditing,
  addEditionItem,
} from '../actions/index';
import '../styles/expenses.css';

class Expenses extends Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buttonDeleteItem = this.buttonDeleteItem.bind(this);
    this.buttonEditarTab = this.buttonEditarTab.bind(this);
    this.handleChangeExpense = this.handleChangeExpense.bind(this);

    this.state = {
      expenses: {
        id: '',
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      },
    };
  }

  componentDidMount() {
    const { fetchCurrenciesSuccess } = this.props;
    fetchCurrenciesSuccess();
  }

  handleInput({ target }) {
    const { name, value } = target;
    const { expenses } = this.state;
    this.setState({
      expenses: {
        ...expenses,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { sendExpenseApi } = this.props; // buscando da props a função para despachar
    const { expenses: expensesToSend } = this.state;
    sendExpenseApi(expensesToSend); // thunk
    this.setState({
      expenses: {
        id: '',
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      },
    });
  }

  upDateTotal(expense) {
    addTotal(expense);
  }

  handleChangeExpense(event) {
    event.preventDefault();
    const { editing, addChangeEditDispatch } = this.props;
    editing(false);
    const { expenses: expensesToSendEdit } = this.state;
    addChangeEditDispatch(expensesToSendEdit);
    this.setState({
      expenses: {
        id: '',
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      },
    });
  }

  buttonEditarTab(expenses) {
    const { editing } = this.props;
    editing(true);
    this.setState({
      expenses,
    });
  }

  buttonDeleteItem(id) {
    const { deleteItemExpenses } = this.props;
    deleteItemExpenses(id);
  }

  render() {
    const { expenses: { value,
      description,
      currency,
      method,
      tag,
    },
    } = this.state;

    const { currencies, expenses, isEditing } = this.props;
    const { handleInput,
      handleSubmit,
      handleChangeExpense,
    } = this;

    return (
      <div>
        <form className="despesas">
          <div className="container">
            <div className="input">
              <label htmlFor="expense-value">
                Valor da despesa:
                <input
                  id="expense-value"
                  name="value"
                  type="number"
                  data-testid="value-input"
                  value={ value }
                  onChange={ handleInput }
                />
              </label>
            </div>
            <div className="input">
              <label htmlFor="description">
                Descrição:
                <input
                  id="description"
                  name="description"
                  data-testid="description-input"
                  value={ description }
                  onChange={ handleInput }
                />
              </label>
            </div>
            <div className="input">
              <label htmlFor="currency">
                Moeda:
                <select
                  id="currency"
                  name="currency"
                  data-testid="currency-input"
                  value={ currency }
                  onChange={ handleInput }
                >
                  {currencies.map((currencyMap) => (
                    <option
                      value={ currencyMap }
                      data-testid={ currencyMap }
                      key={ currencyMap }
                    >
                      { currencyMap }
                    </option>
                  ))}

                  {/* {buscar as moedas} */}
                </select>
              </label>
            </div>

            <div className="input">
              <label htmlFor="method">
                Forma de Pagamento:
                <select
                  id="method"
                  name="method"
                  data-testid="method-input"
                  value={ method }
                  onChange={ handleInput }
                >
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                </select>
              </label>
            </div>
            <div className="input">
              <label htmlFor="tag">
                Tipo:
                <select
                  id="tag"
                  name="tag"
                  data-testid="tag-input"
                  value={ tag }
                  onChange={ handleInput }
                >
                  <option value="Alimentação">Alimentação</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Saúde">Saúde</option>
                </select>
              </label>
            </div>
            { (!isEditing)
              ? (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={ handleSubmit }
                >
                  Adicionar despesa
                </button>)
              : (
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={ handleChangeExpense }
                >
                  Editar Despesa
                </button>) }

          </div>
        </form>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Descrição</th>
              <th scope="col">Tag</th>
              <th scope="col">Método de pagamento</th>
              <th scope="col">Valor</th>
              <th scope="col">Moeda</th>
              <th scope="col">Câmbio utilizado</th>
              <th scope="col">Valor convertido</th>
              <th scope="col">Moeda de conversão</th>
              <th scope="col">Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (

              <tr key={ expense }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td
                  id="coin"
                >
                  {parseFloat(expense.exchangeRates[expense.currency].ask * expense.value)
                    .toFixed(2)}
                </td>
                <td>
                  {parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => {
                      this.buttonEditarTab(expense);
                      this.upDateTotal(expense);
                    } }
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => {
                      this.buttonDeleteItem(expense.id);
                      this.upDateTotal(expense);
                    } }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Expenses.propTypes = {
  expenses: PropTypes.objectOf.isRequired,
  currencies: PropTypes.number.isRequired,
  map: PropTypes.func.isRequired,
  fetchCurrenciesSuccess: PropTypes.func.isRequired,
  sendExpenseApi: PropTypes.func.isRequired,
  deleteItemExpenses: PropTypes.arrayOf.isRequired,
  // editItemExpenses: PropTypes.arrayOf.isRequired,
  isEditing: PropTypes.number.isRequired,
  editing: PropTypes.func.isRequired,
  addChangeEditDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  isEditing: state.wallet.isEditing,
  total: state.wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesSuccess: () => dispatch(fetchingCurrencies()),
  sendExpenseApi: (expenses) => dispatch(fetchingSaveExpense(expenses)),
  deleteItemExpenses: (id) => dispatch(deleteItem(id)),
  upDateTotal: () => dispatch(addTotal()),
  editing: (change) => dispatch(changeIsEditing(change)),
  addChangeEditDispatch:
  (expensesToSendEdit) => dispatch(addEditionItem(expensesToSendEdit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
