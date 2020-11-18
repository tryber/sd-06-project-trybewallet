import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currenciesThunk, fetchExchangeRates } from '../actions';

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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  componentDidMount() {
    const { currencyFetch } = this.props;
    currencyFetch();
  }

  calculateTotal() {
    const { expenses } = this.props;
    // the following reducer's source is: https://github.com/tryber/sd-06-project-trybewallet/blob/marioduartedev/src/pages/Wallet.js
    const total = expenses
      .reduce((accumulator, current) => accumulator + parseFloat((current
        .exchangeRates[current.currency].ask * current.value)), 0);

    return total;
  }

  handleChange({ target }) {
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleClick(event) {
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
    expensesAction(expense);
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value } = this.state;
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
          <button type="submit" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
        <hr />
        <table>
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
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencyFetch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)).isRequired,
  expensesAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
