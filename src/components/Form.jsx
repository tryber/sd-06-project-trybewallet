import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import PropTypes from 'prop-types';

export default class Form extends Component {
  render() {
    const { currencies, expenses, handleSaveExpenses, handleChange } = this.props;
    return (
      <div>
        <form className="form">
          <label htmlFor="value-input">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              id="value-input"
              name="value"
              value={ expenses.value }
              onChange={ (e) => handleChange(e.target) }
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              data-testid="description-input"
              id="description-input"
              type="text"
              name="description"
              value={ expenses.description }
              onChange={ (e) => handleChange(e.target) }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              data-testid="currency-input"
              id="currency-input"
              name="currency"
              value={ expenses.currency }
              onChange={ (e) => handleChange(e.target) }
            >
              {currencies.map((currency, index) => (
                <option
                  data-testid={ currency }
                  value={ currency }
                  key={ index }
                >
                  {currency}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              id="method-input"
              value={ expenses.method }
              onChange={ (e) => handleChange(e.target) }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria:
            <select
              data-testid="tag-input"
              name="tag"
              id="tag-input"
              value={ expenses.tag }
              onChange={ (e) => handleChange(e.target) }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ handleSaveExpenses }>
            Adicionar Despesas
          </button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func.isRequired,
  }).isRequired,
  expenses: PropTypes.shape({
    currency: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSaveExpenses: PropTypes.func.isRequired,
};
