import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApiCurrencies, getExpensesAPI } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { moedas } = this.props;
    moedas();
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { value, description, currency, method, tag, id } = this.state;
    const userExpense = { value, description, currency, method, tag, id };
    const { createExpense } = this.props;
    this.setState((Previous) => ({ id: Previous.id + 1 }));
    createExpense(userExpense);
  }

  render() {
    const { userEmail, currencyKey, expensesToSum } = this.props;
    const sumExpenses = expensesToSum
      .reduce(((acc, curr) => acc + parseFloat((curr
        .exchangeRates[curr.currency].ask * curr.value))), 0);
    const tableTags = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
      'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
      'Editar/Excluir'];
    const totalEx = Math.round((sumExpenses) * 100) / 100;
    return (
      <div>
        <div>
          <header>
            <h2>TrybeWallet</h2>
            <p data-testid="email-field">{`Email: ${userEmail}`}</p>
            <p>
              Despeza Total:
              <span data-testid="total-field">{totalEx}</span>
            </p>
            <p data-testid="header-currency-field">BRL</p>
          </header>
          <div>
            <label htmlFor="value-input">
              Valor:
              <input
                name="value"
                onChange={ this.handleChange }
                id="value-input"
                data-testid="value-input"
                type="number"
                min="0.00"
                max="10000.00"
                step="0.01"
              />
            </label>
            <label htmlFor="description-input">
              Descrição:
              <input
                onChange={ this.handleChange }
                name="description"
                id="description-input"
                data-testid="description-input"
                type="text"
              />
            </label>
            <label htmlFor="select-input">
              Moeda:
              <select
                name="currency"
                onChange={ this.handleChange }
                id="select-input"
                data-testid="currency-input"
              >
                {currencyKey
                  .map((currency) => (
                    <option
                      key={ currency }
                      data-testid={ currency }
                    >
                      {currency}
                    </option>))}

              </select>
            </label>
            <label htmlFor="method-input">
              Método de Pagamento:
              <select
                name="method"
                onChange={ this.handleChange }
                data-testid="method-input"
                id="method-input"
              >
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="tag-input">
              Tag:
              <select
                onChange={ this.handleChange }
                id="tag-input"
                name="tag"
                data-testid="tag-input"
              >
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>
              </select>
            </label>
            <button type="submit" onClick={ this.handleClick }>Adicionar despesa</button>
          </div>
          <table>
            <thead>
              <tr>
                {tableTags.map((title) => <td key={ title }>{title}</td>)}
              </tr>
            </thead>
            <tbody>
              { expensesToSum.map((expenses) => (
                <tr key={ expenses.id }>
                  <td>{ expenses.description }</td>
                  <td>{ expenses.tag }</td>
                  <td>{ expenses.method }</td>
                  <td>{ expenses.value }</td>
                  <td>{ expenses.exchangeRates[expenses.currency].name }</td>
                  <td>
                    { (Math.round(parseFloat(expenses.exchangeRates[expenses.currency]
                      .ask) * 100) / 100) }
                  </td>
                  <td>
                    { ((Math.round((expenses.exchangeRates[expenses.currency]
                      .ask * expenses.value) * 100) / 100)) }
                  </td>
                  <td>Real</td>
                  <td>
                    <button type="button" data-testid="edit-btn">Editar</button>
                    <button type="button" data-testid="delete-btn">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot />
          </table>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  moedas: () => dispatch(fetchApiCurrencies()),
  createExpense: (expense) => dispatch(getExpensesAPI(expense)),
});
const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencyKey: state.wallet.currencies,
  expensesToSum: state.wallet.expenses,
});

Wallet.propTypes = {
  currencyKey: PropTypes.arrayOf(Object).isRequired,
  expensesToSum: PropTypes.arrayOf(Object).isRequired,
  createExpense: PropTypes.func.isRequired,
  moedas: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
