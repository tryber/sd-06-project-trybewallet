import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendCurrencyThunk, addExpense } from '../actions/index';
// import walletReducer from '../reducers/walletReducer';

class AddExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      currentQuote: {},
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
      currentQuote,
    } = this.state;
    const id = expenses.length;
    const expense = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      currentQuote,
    };
    sendExpense(expense, total);
  }

  async handleSubmit() {
    const { sendCoins, currencies, total } = this.props;
    const { currency, value } = this.state;
    await sendCoins();
    let ask = 0;
    console.log(`currencies: ${Object.keys(currencies)}`);
    Object.keys(currencies).forEach((item) => {
      if (currency === item) {
        console.log(`currencies[item]: ${currencies[item]}`);
        ask = currencies[item].ask;
      }
    });
    console.log(`ask: ${ask}`);
    console.log(`Total: ${total}`);
    this.setState({ currentQuote: currencies });
    const newTotal = total + (value * ask);
    console.log(`newTotal: ${newTotal}`);
    this.mountForm(newTotal);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { currencies } = this.props;
    const { value, currency, method, tag, description } = this.state;
    // const expense = { value, currency, method, tag, description };
    return (
      <div>
        <form action="">

          <label htmlFor="value-input">
            Valor
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
            Moeda
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

          <label htmlFor="payMethod-input">
            Método de pagamento
            <select
              name="method"
              id="payMethod-input"
              data-testid="payMethod-input"
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
            Descrição
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
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.objectOf(PropTypes.number).isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseForm);
