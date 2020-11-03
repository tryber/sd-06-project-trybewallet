import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, addExpense, updateTotal } from '../actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      total: 0,
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleSubmit() {
    const { getCurrencies, sendExpense, sendTotal } = this.props;
    const { value } = document.getElementById('value-input');
    const { value: currency } = document.getElementById('currency-input');
    const { value: method } = document.getElementById('method-input');
    const { value: tag } = document.getElementById('tag-input');
    const { value: description } = document.getElementById('description-input');

    getCurrencies();

    const { total } = this.state;
    const { data } = this.props;
    const currencyRate = data[currency].ask;
    const sum = total + parseFloat(value * currencyRate);

    const expense = {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    };

    sendExpense(expense);
    sendTotal(sum);
  }

  render() {
    const { currencies } = this.props;
    return (
      <form>

        <label htmlFor="value-input">
          Valor:
          <input
            name="value"
            type="number"
            data-testid="value-input"
            id="value-input"
            defaultValue="0"
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency-input"
          >
            {
              currencies.map((currency) => (
                <option data-testid={ currency } key={ currency }>
                  { currency }
                </option>
              ))
            }
          </select>
        </label>

        <label htmlFor="method-input">
          Método de pagamento:
          <select
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
            data-testid="tag-input"
            id="tag-input"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <label htmlFor="description-input">
          Descrição:
          <input
            name="description"
            type="text"
            data-testid="description-input"
            id="description-input"
          />
        </label>

        <button
          type="button"
          onClick={ this.handleSubmit }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  data: state.wallet.data,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchAPI()),
  sendExpense: (data) => dispatch(addExpense(data)),
  sendTotal: (total) => dispatch(updateTotal(total)),
});

WalletForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  sendExpense: PropTypes.func.isRequired,
  sendTotal: PropTypes.func.isRequired,
  data: PropTypes.objectOf().isRequired,
  currencies: PropTypes.objectOf().isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
