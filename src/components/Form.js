import React from 'react';
import { connect } from 'react-redux';

function Form() {
  const moedas = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC',
    'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
  return (
    <div className="formComponent">
      <label htmlFor="valor">
        Valor:
        <input type="number" id="valor" data-testid="value-input" />
      </label>
      <label htmlFor="moeda">
        Moeda:
        <select id="moeda" data-testid="currency-input">
          { moedas.map((moeda, index) => <option
            key={ index }
            data-testid={ moeda }
            value={ moeda }>
            { moeda }
          </option>) }
        </select>
      </label>
      <label htmlFor="descricao">
        Descrição:
        <input type="text" id="descricao" data-testid="description-input" />
      </label>
    </div>
  );
}

export default Form;
