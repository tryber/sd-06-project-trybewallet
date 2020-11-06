import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencyAPI, getExpensesAPI, delExpenses } from '../actions/index';

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
    const { getCurrency } = this.props;
    getCurrency();
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
    const { userEmail, currencyKey, expensesToSum, expenseDel } = this.props;
    const sumExpenses = expensesToSum
      .reduce(((acc, curr) => acc + parseFloat((curr
        .exchangeRates[curr.currency].ask * curr.value))), 0);
    const tableTags = ['Descrição', 'Tag', 'Método de pagamento', 'Valor',
      'Moeda', 'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão',
      'Editar/Excluir'];
    return (
      <div>
        <header>
          <h2>TrybeWallet</h2>
          <p data-testid="email-field">{`Email: ${userEmail}`}</p>
          <p>
            Despeza Total:
            <span data-testid="total-field">{Math.round((sumExpenses) * 100) / 100}</span>
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <div>
          <label htmlFor="valueinput">
            Valor:
            <input
              name="value"
              onChange={ this.handleChange }
              id="value-input"
              data-testid="value-input"
              type="number"
              min="0.00"
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
              {currencyKey[0] ? Object.keys(currencyKey[0])
                .filter((removeCurrency) => removeCurrency !== 'USDT')
                .map((currency) => (
                  <option key={ currency } data-testid={ currency }>{currency}</option>))
                : console.log('xablau')}
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
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
        </div>
        <table>
          <tr>
            {tableTags.map((tableHeader) => <th key={ tableHeader }>{tableHeader}</th>)}
          </tr>
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
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => expenseDel(expenses.id) }
                >
                  Deletar
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currencyKey: state.wallet.currencies,
  expensesToSum: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(getCurrencyAPI()),
  createExpense: (expense) => dispatch(getExpensesAPI(expense)),
  expenseDel: (expense) => dispatch(delExpenses(expense)),
});

Wallet.propTypes = {
  currencyKey: PropTypes.arrayOf(Object).isRequired,
  expensesToSum: PropTypes.arrayOf(Object).isRequired,
  expenseDel: PropTypes.func.isRequired,
  getCurrency: PropTypes.func.isRequired,
  createExpense: PropTypes.func.isRequired,
  userEmail: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
