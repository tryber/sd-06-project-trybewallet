import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchAPI, saveExpense, deleteExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      totalValue: 0,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      edit: false,
      indexEdit: 0,
    };

    this.addExpense = this.addExpense.bind(this);
    this.excludeExpense = this.excludeExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
  }

  componentDidMount() {
    const { search } = this.props;
    search();
  }

  handleInput({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  addExpense() {
    const { saveState, coinsOptions, search } = this.props;
    search();
    const {
      id,
      totalValue,
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    const newExpenses = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: { ...coinsOptions },
    };

    saveState(newExpenses);

    const total = totalValue + (Number(value) * Number(coinsOptions[currency].ask));

    this.setState({
      id: id + 1,
      totalValue: total,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  edit(expense, index) {
    this.setState({
      edit: true,
      indexEdit: index,
      value: expense.value,
      currency: expense.currency,
      method: expense.method,
      tag: expense.tag,
      description: expense.description,
    });
  }

  editExpense() {
    const { expenses, deleteState } = this.props;
    const {
      value,
      currency,
      method,
      tag,
      description,
      indexEdit,
    } = this.state;

    expenses[indexEdit].value = value;
    expenses[indexEdit].currency = currency;
    expenses[indexEdit].method = method;
    expenses[indexEdit].tag = tag;
    expenses[indexEdit].description = description;

    deleteState(expenses);
    console.log(expenses);
    this.setState({
      edit: false,
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
  }

  excludeExpense(index) {
    const { expenses, deleteState } = this.props;
    expenses.splice(index, 1);
    deleteState(expenses);
    this.setState({ value: 0 });
  }

  render() {
    const { email, isFetching, coinsOptions, expenses } = this.props;
    const {
      value, currency, method, tag, description, totalValue, edit } = this.state;
    const optionsCoins = (coinsOptions)
      ? Object.keys(coinsOptions).filter((coins) => coins !== 'USDT')
      : ['USD'];

    return (
      <div>
        <header>
          <nav>
            <img src="https://app.betrybe.com/assets/images/trybe-logo.png" width="150px" alt="Trybe" />
            <div className="nav-right">
              <p>
                Email:
                <span data-testid="email-field">
                  { email }
                </span>
              </p>
              <p>
                Despesa Total:
                <span data-testid="total-field">
                  { totalValue }
                  <span data-testid="header-currency-field">BRL</span>
                </span>
              </p>
            </div>
          </nav>
        </header>

        <form className="form-expense">
          <label htmlFor="value">
            Valor:
            <input
              name="value"
              value={ value }
              onChange={ (event) => this.handleInput(event) }
              data-testid="value-input"
              type="number"
              id="value"
            />
          </label>

          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              value={ currency }
              onChange={ (event) => this.handleInput(event) }
              data-testid="currency-input"
              id="currency"
            >
              { optionsCoins.map((options) => (
                <option
                  key={ options }
                  data-testid={ options }
                  value={ options }
                >
                  { options }
                </option>
              )) }
            </select>
          </label>

          <label htmlFor="pay-metod">
            Método de pagamento:
            <select
              name="method"
              value={ method }
              onChange={ (event) => this.handleInput(event) }
              data-testid="method-input"
              id="pay-metod"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            Tag:
            <select
              name="tag"
              value={ tag }
              onChange={ (event) => this.handleInput(event) }
              data-testid="tag-input"
              id="tag"
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
              name="description"
              value={ description }
              onChange={ (event) => this.handleInput(event) }
              data-testid="description-input"
              type="text"
              id="description"
            />
          </label>
          <button
            onClick={ !edit ? this.addExpense : this.editExpense }
            type="button"
          >
            { !edit ? 'Adicionar despesa' : 'Editar despesa' }
          </button>
        </form>

        <table border="1">
          <thead className="cabecalho">
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          { (expenses.length > 0)
            ? expenses.map((expense, index) => (
              <tbody key={ expense.id }>
                <tr>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ expense.value }</td>
                  <td>{ expense.exchangeRates[expense.currency].name }</td>
                  <td>
                    { Number(expense.exchangeRates[expense.currency].ask)
                      .toFixed(2) }
                  </td>
                  <td>
                    { (Number(expense.exchangeRates[expense.currency].ask)
                      * Number(expense.value)).toFixed(2) }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.edit(expense, index) }
                    >
                      <img width="25px" height="25px" src="https://img2.gratispng.com/20180319/ysw/kisspng-computer-icons-editing-vector-graphics-editor-edit-pen-write-icon-5ab06a2456fa55.3095970115215109483563.jpg" alt="Editar" />
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.excludeExpense(index) }
                    >
                      <img width="25px" height="25px" src="https://e7.pngegg.com/pngimages/953/119/png-clipart-computer-icons-delete-icon-cdr-angle.png" alt="Excluir" />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))
            : <tbody /> }
        </table>
        <p>{ isFetching ? 'Loading' : '' }</p>

        <Link to="/">Voltar</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  isFetching: state.wallet.isFetching,
  expenses: state.wallet.expenses,
  coinsOptions: state.wallet.coinsOptions,
});

const mapDispatchToProps = (dispatch) => ({
  search: () => dispatch(fetchAPI),
  saveState: (expenses) => dispatch(saveExpense(expenses)),
  deleteState: (expenses) => dispatch(deleteExpense(expenses)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  coinsOptions: PropTypes.objectOf(String).isRequired,
  search: PropTypes.func.isRequired,
  saveState: PropTypes.func.isRequired,
  deleteState: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
