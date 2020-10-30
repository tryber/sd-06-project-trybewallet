import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import '../css/AddExpense.css';

class AddExpense extends React.Component {
  render() {
    const { currencies } = this.props;

    return (
      <form className="expense-form">
        <label htmlFor="expense-value">
          $
          <input
            type="number"
            min="0.00"
            step="0.01"
            placeholder="0.00"
            id="expense-value"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="expense-txt">
          Gasto
          <input
            type="text"
            placeholder="Descreva seu gasto."
            id="expense-txt"
            data-testid="description-input"
          />
        </label>

        <select id="expense-cur" data-testid="currency-input">
          {
            currencies.map((currency) => (
              <option
                value={ currency }
                key={ currency }
                data-testid={ currency }
              >
                { currency }
              </option>
            ))
          }
        </select>

        <select id="payment-method" data-testid="method-input">
          <option value="cash">Dinheiro</option>
          <option value="credit">Cartão de crédito</option>
          <option value="debit">Cartão de débito</option>
        </select>

        <select id="expense-tag" data-testid="tag-input" placeholder="oi">
          <option value="food">Alimentação</option>
          <option value="leisure">Lazer</option>
          <option value="work">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="health">Saúde</option>
        </select>
        <button type="button">Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

AddExpense.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
};

AddExpense.defaultProps = {
  currencies: [],
};

export default connect(mapStateToProps)(AddExpense);
