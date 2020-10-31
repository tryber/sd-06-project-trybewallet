import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { thunkWallet, thunkAddANewCurrency } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
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
    const { currenciesFetch } = this.props;
    currenciesFetch();
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
    const titles = ['Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir'];
    // solução Willian Gomes T06 Slack
    const totalValue = expenses.length ? Math.round(expenses
      .reduce((acc, cur) => acc + cur.value
       * cur.exchangeRates[cur.currency].ask, 0) * 100) / 100 : 0;
    return (
      <div>
        <header>
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{ totalValue }</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form onSubmit={ this.handleNewExpense }>
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
          </label>
          <button
            type="submit"
          >
            Adicionar despesa
          </button>
        </form>
        <table id="tbl" border="1">
          <thead>
            <tr>
              {titles.map((title) => <td key={ title }>{ title }</td>)}
            </tr>
          </thead>
          <tbody>
            {expenses.map((despesa, index) => {
              const exchangeValue = Number(despesa.exchangeRates[despesa.currency].ask);
              const currencyName = despesa.exchangeRates[despesa.currency].name;
              const convertedValue = exchangeValue * despesa.value;
              return (
                <tr key={ index }>
                  <td>{ despesa.description }</td>
                  <td>{ despesa.tag }</td>
                  <td>{ despesa.method }</td>
                  <td>{ despesa.value }</td>
                  <td>{ exchangeValue.toFixed(2) }</td>
                  <td>{ currencyName }</td>
                  <td>{ convertedValue.toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <button type="button" data-testid="edit-btn">Editar</button>
                    <button type="button" data-testid="delete-btn">Excluir</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>
                TOTAL
              </td>
            </tr>
          </tfoot>
        </table>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesFetch: () => dispatch(thunkWallet()),
  saveExpensesInfo: (expense) => dispatch(thunkAddANewCurrency(expense)),
});

Wallet.propTypes = {
  email: propTypes.arrayOf(propTypes.array).isRequired,
  currencies: propTypes.arrayOf(propTypes.array).isRequired,
  currenciesFetch: propTypes.func.isRequired,
  saveExpensesInfo: propTypes.func.isRequired,
  expenses: propTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
