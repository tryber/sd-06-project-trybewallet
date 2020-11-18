import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import HeaderForm from '../components/HeaderForm';
import {
  currenciesThunk,
  fetchExchangeRates,
  editAction, deleteAction } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
      editMode: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.editButton = this.editButton.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    const { currencyFetch } = this.props;
    currencyFetch();
  }

  calculateTotal() {
    const { expenses } = this.props;
    const total = expenses
      .reduce((accumulator, current) => accumulator + parseFloat((current
        .exchangeRates[current.currency].ask * current.value)), 0).toFixed(2);

    return total;
  }

  handleChange({ target }) {
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  async handleAdd(event) {
    event.preventDefault();
    const { expensesAction } = this.props;
    const {
      id,
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    this.setState((prevState) => ({ id: prevState.id + 1 }));
    await expensesAction(expense);
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  editButton(expense) {
    const { value, currency, method, tag, description, id } = expense;
    this.setState({
      editMode: true,
      id,
      value,
      description,
      currency,
      method,
      tag,
    });
  }

  async handleEdit() {
    const { changeExpense } = this.props;
    const { value, currency, method, tag, description, id } = this.state;
    await changeExpense({ value, currency, method, tag, description, id });
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  render() {
    const { email, currencies, expenses, handleDelete } = this.props;
    const { value, description, editMode } = this.state;
    const tableHeaders = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];

    return (
      <>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ this.calculateTotal() }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <hr />
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              name="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              <option>Moeda:</option>
              {
                currencies.map((currency) => (
                  <option
                    key={ currency }
                    data-testid={ currency }
                  >
                    { currency }
                  </option>))
              }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              id="method"
              onChange={ this.handleChange }
              data-testid="method-input"
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
              id="tag"
              onChange={ this.handleChange }
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          {
            editMode
              ? <button className="btn-submit" style={ { backgroundColor: '#E0A800' } } type="submit" onClick={ this.handleEdit }>Editar despesa</button>
              : <button className="btn-submit" style={ { backgroundColor: '#888888' } } type="submit" onClick={ this.handleAdd }>Adicionar despesa</button>
          }
        </form>
        <hr />
        <table className="table table-striped">
          <thead>
            <tr>
              {
                tableHeaders.map((header) => <th key={ header }>{ header }</th>)
              }
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{ expense.description }</td>
                  <td>{ expense.tag }</td>
                  <td>{ expense.method }</td>
                  <td>{ expense.value }</td>
                  <td>{ expense.exchangeRates[expense.currency].name }</td>
                  <td>
                    {
                      parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)
                    }
                  </td>
                  <td>
                    {
                      (
                        expense.value * expense.exchangeRates[expense.currency].ask
                      ).toFixed(2)
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-testid="edit-btn"
                      onClick={ () => this.editButton(expense) }
                    >
                      EDIT
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-testid="delete-btn"
                      onClick={ () => handleDelete(expense.id) }
                    >
                      DEL
                    </button>
                  </td>
                </tr>))
            }
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currencyFetch: () => dispatch(currenciesThunk()),
  expensesAction: (expenses) => dispatch(fetchExchangeRates(expenses)),
  handleDelete: (id) => dispatch(deleteAction(id)),
  changeExpense: (expense) => dispatch(editAction(expense)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencyFetch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)).isRequired,
  expensesAction: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  changeExpense: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
