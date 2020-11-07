import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCurrencies, addExpenseThunk } from '../actions';

class Form extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      expense: {
        id: 0,
        value: 0,
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
      },
    };
  }

  componentDidMount() {
    const { availableCurrencies } = this.props;
    availableCurrencies();
  }

  // Incremento da propriedade ID baseado projeto de Tiago Berwanger
  componentDidUpdate(previous) {
    const { wallet } = this.props;
    const { expenses } = wallet;
    const { expense } = this.state;
    const IncrementID = () => {
      this.setState({
        expense: {
          ...expense,
          id: expenses.length,
        },
      });
    };
    if (previous.wallet.expenses.length !== expenses.length) {
      IncrementID();
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    const { expense } = this.state;

    this.setState({
      expense: {
        ...expense,
        [name]: value,
      },
    });
  }

  handleClick() {
    const { addExpensesToState } = this.props;
    const { expense } = this.state;
    addExpensesToState(expense);
  }

  render() {
    const { expense } = this.state;
    const { value, method, tag, description } = expense;
    const { wallet } = this.props;
    const { currencies } = wallet;

    return (
      <div>
        <fieldset>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              name="value"
              id="value"
              value={ value }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              name="currency"
              id="currency"
              onChange={ this.handleChange }
            >
              { currencies.map((currency, key) => (
                <option
                  key={ key }
                  value={ currency }
                  data-testid={ currency }
                >
                  { currency }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              id="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            TAG:
            <select
              data-testid="tag-input"
              name="tag"
              id="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              name="description"
              id="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar Despesa
          </button>
        </fieldset>
      </div>
    );
  }
}

Form.propTypes = {
  availableCurrencies: PropTypes.func.isRequired,
  addExpensesToState: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf.isRequired,
    expenses: PropTypes.arrayOf.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

const mapDispatchToProps = (dispatch) => ({
  availableCurrencies: () => dispatch(fetchCurrencies()),
  addExpensesToState: (expense) => dispatch(addExpenseThunk(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
