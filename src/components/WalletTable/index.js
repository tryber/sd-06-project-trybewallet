import React from 'react';
// import { connect } from 'react-redux';

import './style.css';

class WalletTable extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="expense">
          Valor:
          <input
            data-testid="value-input"
            id="expense"
            type="number"
            className="expense"
            placeholder="$"
            min="0"
            step="0.01"
          />
        </label>
        <label htmlFor="currency-options">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency-options"
            name="currency-options"
            className="currency-options"
          >
            <option value="1">USD</option>
          </select>
        </label>
        <label htmlFor="payment-method">
          Modo de pagamento:
          <select
            data-testid="method-input"
            id="payment-method"
            name="payment-method"
            className="payment-method"
          >
            <option value="1">USD</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            className="tag"
          >
            <option value="1">USD</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            type="text"
            name="description"
            id="description"
          />
        </label>
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

export default WalletTable;
