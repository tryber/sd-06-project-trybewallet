import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
  render() {
    const { currencyList, expenses, saveToState, saveExpensesToStore } = this.props;
    return (
      <form className="form">
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            name="value"
            onChange={ (e) => saveToState(e.target) }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            onChange={ (e) => saveToState(e.target) }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ (e) => saveToState(e.target) }
          >
            <option disabled selected value> -- Selecione uma opção -- </option>
            {currencyList.map((currency) => {
              if (currency === 'USDT') return;
              return (
                <option
                  data-testid={ currency }
                  key={ currency }
                  value={ currency }
                >
                  {currency}
                </option>);
            })}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            name="method"
            onChange={ (e) => saveToState(e.target) }
          >
            <option disabled selected value> -- Selecione uma opção -- </option>
            <option value="money">Dinheiro</option>
            <option value="credit">Cartão de crédito</option>
            <option value="debit">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria:
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ (e) => saveToState(e.target) }
          >
            <option disabled selected value> -- Selecione uma opção -- </option>
            <option value="food">Alimentação</option>
            <option value="recreation">Lazer</option>
            <option value="job">Trabalho</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ () => saveExpensesToStore(expenses) }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  currencyList: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.shape.isRequired,
  saveToState: PropTypes.func.isRequired,
  saveExpensesToStore: PropTypes.func.isRequired,
};
