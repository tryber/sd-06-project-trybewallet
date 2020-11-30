import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="dispense">
          Dispresa
          <input
            data-testid="value-input"
            type="number"
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            type="text"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="cambio">
          Cambio
          <select
            data-testid="currency-input"
            name="cambio"
          >
            <option value="usd" data-testid="USD">USD</option>
            <option value="cad" data-testid="CAD">CAD</option>
            <option value="eur" data-testid="EUR">EUR</option>
            <option value="gbp" data-testid="GBP">GBP</option>
            <option value="ars" data-testid="ARS">ARS</option>
            <option value="btc" data-testid="BTC">BTC</option>
            <option value="ltc" data-testid="LTC">LTC</option>
            <option value="jpy" data-testid="JPY">JPY</option>
            <option value="chf" data-testid="CHF">CHF</option>
            <option value="aud" data-testid="AUD">AUD</option>
            <option value="cny" data-testid="CNY">CNY</option>
            <option value="ils" data-testid="ILS">ILS</option>
            <option value="eth" data-testid="ETH">ETH</option>
            <option value="xrp" data-testid="XRP">XRP</option>
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select name="method" data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Categoria para Dispesa
          <select data-testid="tag-input" name="category">
            <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
        <label htmlFor="submit">
          <button type="button">Adicionar Dispesa</button>
        </label>
        <label htmlFor="total-field" data-testid="total-field">Total: 0</label>
      </form>
    )
  }
}

export default Form;
