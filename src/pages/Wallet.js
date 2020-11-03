import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { thunkCurrencyAPI, thunkExpenses } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      value: '',
      description: '',
      currency: 'USD',
      payment: 'Dinheiro',
      category: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { addExpUser } = this.props;
    addExpUser(this.state);
  }

  render() {
    const { email, currencies, expenses } = this.props;
    return (
      <div>
        <header>
          <h2 data-testid="email-field">{email}</h2>
          <h3 data-testid="total-field">
            { expenses.length !== 0 ?
            expenses.reduce((sum, expense) => expense.value + sum) :
            <p data-testid="total-field">0</p> }
            { console.log(expenses) }
          </h3>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form onSubmit={ this.handleSubmit }>
          <fieldset>
            <label htmlFor="value">
              Valor:
              <input onChange={ this.handleChange } name="value" data-testid="value-input" />
            </label>
            <label htmlFor="description">
              Descrição
              <input onChange={ this.handleChange } name="description" data-testid="description-input" />
            </label>
            <label htmlFor="currency">
              Moedas
              <select onChange={ this.handleChange } name="currency" data-testid="currency-input">
                {currencies !== undefined ? currencies.map((currency) => (
                  <option data-testid={ currency } key={ currency }>{currency}</option>
                )) : <p>Error</p>}
              </select>
            </label>
            <label htmlFor="payment">
              Pagamento
              <select onChange={ this.handleChange } name="payment" data-testid="method-input">
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            </label>
            <label htmlFor="category">
              Categoria
              <select onChange={ this.handleChange } name="category" data-testid="tag-input">
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>
              </select>
            </label>
            <button type="submit">Adicionar despesa</button>
          </fieldset>
        </form>
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
  fetchCurrency: () => dispatch(thunkCurrencyAPI()),
  addExpUser: (expenses) => dispatch(thunkExpenses(expenses)),
});

Wallet.propTypes = {
  fetchCurrency: propTypes.func.isRequired,
  addExpUser: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
