import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrency from '../actions';
import { addExpenses } from '../actions/expensesAction';

class Form extends Component {
  constructor() {
    super();

    this.handleForm = this.handleForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleOptions = this.handleOptions.bind(this);

    this.state = {
      total: 0,
      expenses: {
        value: 0,
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: [],
      },
    };
  }

  componentDidMount() {
    const { fetchWallet } = this.props;
    fetchWallet();
  }

  handleInput({ target: { name, value } }) {
    this.setState((previous) => ({
      ...previous,
      expenses: { ...previous.expenses, [name]: value },
    }));
  }

  handleOptions() {
    const { currencies } = this.props;
    const filteredCurrencies = Object.keys(currencies).filter((key) => key !== 'USDT');

    return (
      filteredCurrencies.map((item) => (
        <option key={ item } value={ item } data-testid={ item }>{item}</option>
      ))
    );
  }

  handleForm() {
    const { sendExpense, fetchWallet, currencies } = this.props;
    const { expenses: { value, currency }, total } = this.state;
    const sum = total + parseFloat(value * currencies[currency].ask);

    fetchWallet();
    this.setState((previous) => ({
      ...previous,
      expenses: { ...previous.expenses, exchangeRates: { ...currencies } },
      total: sum,
    }), () => sendExpense(this.state));
  }

  render() {
    const { expenses: { value, description, currency, method, tag } } = this.state;
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

    return (
      <form>
        <fieldset>
          <div>
            <label htmlFor="expense-value">
              Valor da despesa:
              <input
                name="value"
                id="expense-value"
                data-testid="value-input"
                type="number"
                value={ value }
                onChange={ this.handleInput }
              />
            </label>
          </div>
          <div>
            <label htmlFor="expense-description">
              Descrição da despesa:
              <input
                name="description"
                id="expense-description"
                data-testid="description-input"
                type="text"
                value={ description }
                onChange={ this.handleInput }
              />
            </label>
          </div>
          <div>
            <label htmlFor="currency">
              Moeda:
              <select
                name="currency"
                id="currency"
                data-testid="currency-input"
                value={ currency }
                onChange={ this.handleInput }
              >
                { this.handleOptions() }
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="method">
              Método de pagamento:
              <select
                name="method"
                id="method"
                data-testid="method-input"
                type="text"
                value={ method }
                onChange={ this.handleInput }
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="tag">
              Tipo
              <select
                name="tag"
                id="tag"
                data-testid="tag-input"
                type="text"
                value={ tag }
                onChange={ this.handleInput }
              >
                {tags.map((item) => (
                  <option key={ item } value={ item }>
                    { item}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <button
              type="button"
              onClick={ this.handleForm }
            >
              Adicionar despesa
            </button>
          </div>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchWallet: () => dispatch(fetchCurrency()),
  sendExpense: (state) => dispatch(addExpenses(state)),
});

Form.propTypes = {
  fetchWallet: PropTypes.func.isRequired,
  sendExpense: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
