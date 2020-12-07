import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createExpense,
  requestCurrencies,
  deleteExpense,
  saveEditExpense,
} from '../actions/wallet';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: 'Lazer',
      description: '',
      currency: 'BRL',
      value: 0,
      method: 'Dinheiro',
      noEditing: true,
      idExpenseEdit: '',
    };
    this.handleSpent = this.handleSpent.bind(this);
    this.submitWallet = this.submitWallet.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
  }

  componentDidMount() {
    const { loadCurrencies } = this.props;
    loadCurrencies();
  }

  handleSpent({ name, value }) {
    this.setState({
      [name]: value,
    });
  }

  submitWallet(event) {
    event.preventDefault();
    const { createNewExpense, edit } = this.props;
    const {
      tag,
      description,
      currency,
      method,
      value,
      noEditing,
      idExpenseEdit,
    } = this.state;
    if (noEditing) {
      createNewExpense({ tag, description, currency, method, value });
    } else {
      edit({ idExpenseEdit, tag, description, currency, method, value });
      console.log('o que é edit:', edit);
    }
    this.setState({
      description: '',
      value: 0,
      noEditing: true,
    });
  }

  handleEdit(id) {
    this.setState({
      noEditing: false,
      idExpenseEdit: id,
    });
    console.log('qual id para editar?:', id);
  }

  renderTable() {
    const { userExpenses, handleDelete } = this.props;
    console.log('O que é user Expenses:', userExpenses);
    const fieldHeader = [
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
      <table>
        <thead>
          <tr>
            {fieldHeader.map((field, index) => (
              <th key={ index }>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userExpenses.map((expense, i) => (
            <tr key={ i }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {((expense.exchangeRates[expense.currency].ask * 100) / 100).toFixed(2)}
              </td>
              <td>
                {(expense.value * expense.exchangeRates[expense.currency].ask).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => handleDelete(expense.id) }
                >
                  Excluir
                </button>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => this.handleEdit(expense.id) }
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  renderSelect() {
    const { tag, currency, method } = this.state;
    const { globalCurrencies } = this.props;
    return (
      <div>
        <span>Escolha a moeda:</span>
        <select
          data-testid="currency-input"
          value={ currency }
          name="currency"
          onChange={ ({ target }) => this.handleSpent(target) }
        >
          {globalCurrencies.map((currencyGlobal) => (
            <option
              key={ currencyGlobal }
              data-testid={ currencyGlobal }
              value={ currencyGlobal }
            >
              {currencyGlobal}
            </option>
          ))}
        </select>
        <span>Forma de pagamento:</span>
        <select
          name="method"
          value={ method }
          data-testid="method-input"
          onChange={ ({ target }) => this.handleSpent(target) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <span>Categoria da despesa</span>
        <select
          name="tag"
          value={ tag }
          data-testid="tag-input"
          onChange={ ({ target }) => this.handleSpent(target) }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </div>
    );
  }

  render() {
    const { value, description, noEditing } = this.state;
    const { addEmail, userExpenses } = this.props;
    console.log('userExpenses:', userExpenses);
    const sumExpenses = userExpenses.reduce(
      (acumulator, expense) => ((acumulator + Number(expense.value)
        * expense.exchangeRates[expense.currency].ask)), 0,
    ).toFixed(2);

    return (
      <div>
        <header data-testid="email-field">
          <p>{`Usuario: ${addEmail}`}</p>
          <p data-testid="total-field">
            {`Despesa Total: ${sumExpenses}`}
          </p>
          <p data-testid="header-currency-field">
            Moeda utilizado: BRL
          </p>
        </header>
        <form onSubmit={ this.submitWallet }>
          <input
            type="text"
            name="value"
            value={ value }
            data-testid="value-input"
            placeholder="Valor da despesa"
            onChange={ ({ target }) => this.handleSpent(target) }
          />
          <input
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            placeholder="descrição"
            onChange={ ({ target }) => this.handleSpent(target) }
          />
          {this.renderSelect()}
          {noEditing ? <button type="submit">Adicionar Despesa</button>
            : <button type="submit">Editar despesa</button>}
          {this.renderTable()}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  addEmail: state.user.email,
  globalCurrencies: state.wallet.currencies,
  userExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  createNewExpense: (expensesUserInput) => dispatch(createExpense(expensesUserInput)),
  loadCurrencies: () => dispatch(requestCurrencies()),
  handleDelete: (e) => dispatch(deleteExpense(e)),
  edit: (payload) => dispatch(saveEditExpense(payload)),
});

Wallet.propTypes = {
  addEmail: PropTypes.string.isRequerid,
  dataWallet: PropTypes.func.isRequerid,
}.isRequerid;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
