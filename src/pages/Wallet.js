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
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  handleChange({ target }) {
    this.setState({ [target.id]: target.value });
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
            { expenses.length !== 0
              ? (Math.round(expenses.reduce((sum, expense) => (
                Number(sum) + (Number(expense.value)
                  * (Object.values(expense.exchangeRates)
                    .find((accCurrency) => accCurrency.code === expense.currency)
                    .ask))
              ), 0) * 100) / 100).toFixed(2) : 0.00 }
          </h3>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form onSubmit={ this.handleSubmit }>
          <fieldset>
            {/* <label htmlFor="value">Valor</label> */}
              <input
                onChange={ this.handleChange }
                id="value" name="value"
                data-testid="value-input"
              />
            {/* <label htmlFor="description">Descrição</label> */}
              <input onChange={ this.handleChange } id="description" name="description" data-testid="description-input" />
            {/* <label htmlFor="currency">Moedas</label> */}
              <select onChange={ this.handleChange } id="currency" name="currency" data-testid="currency-input">
                {currencies !== undefined ? currencies.map((currency) => (
                  <option data-testid={ currency } key={ currency }>{currency}</option>
                )) : <p>Error</p>}
              </select>
            {/* <label htmlFor="method">Pagamento</label> */}
              <select onChange={ this.handleChange } id="method" name="method" data-testid="method-input">
                <option>Dinheiro</option>
                <option>Cartão de crédito</option>
                <option>Cartão de débito</option>
              </select>
            {/* <label htmlFor="tag">Categoria</label> */}
              <select onChange={ this.handleChange } id="tag" name="tag" data-testid="tag-input">
                <option>Alimentação</option>
                <option>Lazer</option>
                <option>Trabalho</option>
                <option>Transporte</option>
                <option>Saúde</option>
              </select>
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
  email: propTypes.string.isRequired,
  currencies: propTypes.array.isRequired,
  expenses: propTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
