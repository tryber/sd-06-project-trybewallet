import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendCurrencyThunk, addExpense } from '../actions/index';
// import walletReducer from '../reducers/walletReducer';

class AddExpenseForm extends Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      exchangeRates: {},
      // addButton: false,
      // editButton: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { sendCoins } = this.props;
    sendCoins();
  }

  mountForm(total) {
    const { sendExpense, expenses } = this.props;
    const {
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    } = this.state;
    const id = expenses.length;
    const expense = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };
    sendExpense(expense, total);
  }

  async handleSubmit() {
    const { sendCoins, currencies, total } = this.props;
    const { currency, value } = this.state;
    await sendCoins();
    let ask = 0;
    Object.keys(currencies).forEach((item) => {
      if (currency === item) {
        ask = currencies[item].ask;
      }
    });
    // const filteredCurrencies = Object.entries(currencies)
    //   .filter(([key]) => key !== 'USDT');
    this.setState({ exchangeRates: currencies });
    const newTotal = total + (value * ask);
    this.mountForm(newTotal);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { currencies } = this.props;
    const { value, currency, method, tag, description } = this.state;
    return (
      <div>
        <form action="">

          <label htmlFor="value-input">
            Valore
            <input
              type="number"
              name="value"
              id="value-input"
              data-testid="value-input"
              value={ value }
              onChange={ (event) => this.handleChange(event) }
            />
          </label>

          <label htmlFor="currency-input">
            Moedo
            <select
              name="currency"
              id="currency-input"
              data-testid="currency-input"
              value={ currency }
              onChange={ (event) => this.handleChange(event) }
            >
              <option value="">Selecione</option>
              {Object.keys(currencies)
                .filter((coin) => coin !== 'USDT')
                .map((coin, index) => (
                  <option key={ index } data-testid={ coin }>{ coin }</option>
                ))}
            </select>
          </label>

          <label htmlFor="method-input">
            Metodo de pagamento
            <select
              name="method"
              id="method-input"
              data-testid="method-input"
              value={ method }
              onChange={ (event) => this.handleChange(event) }
            >
              <option value="">Selecione</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag-input">
            Categoria
            <select
              name="tag"
              id="tag-input"
              data-testid="tag-input"
              value={ tag }
              onChange={ (event) => this.handleChange(event) }
            >
              <option value="">Selecione</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="description-input">
            Descricão da despesa
            <input
              type="text"
              name="description"
              id="description-input"
              data-testid="description-input"
              value={ description }
              onChange={ (event) => this.handleChange(event) }
            />
          </label>

          <button
            type="button"
            onClick={ () => this.handleSubmit() }
          >
            Adicionar despesa
          </button>

          <button
            type="button"
            data-testid="delete-btn"
          >
            Editar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  total: state.wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  sendCoins: () => dispatch(sendCurrencyThunk()),
  sendExpense: (expense, total) => dispatch(addExpense(expense, total)),
});

AddExpenseForm.propTypes = {
  sendCoins: PropTypes.func.isRequired,
  sendExpense: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.objectOf()).isRequired,
  expenses: PropTypes.objectOf(PropTypes.number).isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseForm);
