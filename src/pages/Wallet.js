import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { currencyThunk, addExpenseThunk } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    }
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { updateExpenses } = this.props;
    updateExpenses(this.state);
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <header>
          <h2 data-testid="email-field">{ email }</h2>
          <p data-testid="total-field">
          {
            expenses.length !== 0 ?
            expenses.reduce((total, currValue) => {
            const { value, currency, exchangeRates } = currValue;
            const currencyPrice = exchangeRates[currency].ask;
            const conversion = value * currencyPrice;
            return total + conversion
            }, 0).toFixed(2)
            : 0.00
          }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form onSubmit={ this.handleSubmit }>
          <fieldset>
            <label>
              Valor:
              <input value={value} name="value" type="number" onChange={ this.handleChange } data-testid="value-input"/>
            </label>
            <br />
            <label>
              Descreva:
              <input value={description} name="description" onChange={ this.handleChange } data-testid="description-input"/>
            </label>
            <br />
            <label>
              Moeda:
              <select value={currency} name="currency" onChange={ this.handleChange } data-testid="currency-input">
                { currencies.map((currency) =>
                <option data-testid={currency} key={currency}>
                  {currency}
                </option> ) }
              </select>
            </label>
            <br />
            <label>
              Forma de Pagamento:
              <select value={method} name="method" onChange={ this.handleChange } data-testid="method-input">
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            </label>
            <br />
            <label>
              Categoria:
              <select value={tag} name="tag" onChange={ this.handleChange }data-testid="tag-input">
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>
              </select>
            </label>
            <br />
            <button type="submit">Adicionar despesa</button>
          </fieldset>
        </form>
        <table border="1">
          <thead>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </thead>
          {expenses.length !== 0 ? 
            expenses.map((expense) => {
              const currencyName = expense.exchangeRates[expense.currency].name;
              const exchange = expense.exchangeRates[expense.currency].ask;
              const conversion = expense.value * exchange;
              return <tbody>
                <td>{ expense.description }</td>
                <td>{ expense.tag }</td>
                <td>{ expense.method }</td>
                <td>{ expense.value }</td>
                <td>{ currencyName }</td>
                <td>{ parseFloat(exchange).toFixed(2) }</td>
                <td>{ parseFloat(conversion).toFixed(2) }</td>
                <td> Real </td>
              </tbody>
            }) : ''
          }
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: () => dispatch(currencyThunk()),
  updateExpenses: (data) => dispatch(addExpenseThunk(data)),
});

Wallet.propTypes = {
  email: propTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
