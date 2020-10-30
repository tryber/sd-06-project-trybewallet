import React from 'react';

class Wallet extends React.Component {
  render() {
    const moedas = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC', 'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
    const pagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <header>
          <p data-testid="email-field"></p>
          <p data-testid="total-field"></p>
          <p data-testid="header-currency-field"></p>
        </header>
        <form>
          <label>Valor:
          <input type="number" data-testid="value-input" />
          </label>
          <label>Descrição:
            <input type="text" data-testid="description-input" />
          </label>
          <label>Moeda: {/* buscar atraves da api, Remova das informações trazidas pela API a opção 'USDT' (Dólar Turismo).  */}
            <select data-testid="currency-input">
              {moedas.map((moeda) => <option value={moeda}>{moeda}</option>)}
            </select>
          </label>
          <label>Método de Pagamento:
            <select data-testid="method-input">
              {pagamento.map((pagamento) => <option value={pagamento}>{pagamento}</option>)}
            </select>
          </label>
          <label>Tag:
            <select data-testid="tag-input">
              {tag.map((tag) => <option value={tag}>{tag}</option>)}
            </select>
          </label>
        </form>
      </div>
    )
  }
}

export default Wallet;
