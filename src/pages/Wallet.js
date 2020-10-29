import React from 'react';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <header>
          <p data-testid="email-field">Email:</p>
          <p data-testid="total-field">Despesas:</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <label htmlFor="expense-value">
            Valor:
            <input
              id="expense-value"
              value=""
              data-testid="value-input"
            />
          </label>
          <label htmlFor="expense-description">
            Valor:
            <input
              id="expense-description"
              value=""
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              namme="currency"
              id="currency"
              data-testid="currency-input"
            >
              <option value="">Requisicao</option>
            </select>
          </label>
          <label htmlFor="payment">
            Pagamento:
            <select
              name="payment"
              id="payment"
              data-testid="method-input"
            >
              <option value="cash">Dinheiro</option>
              <option value="debit">Cartão de débito</option>
              <option value="credit">Cartão de crédito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
            >
              <option value="meal">Alimentação</option>
              <option value="leisure">Lazer</option>
              <option value="work">Trabalho</option>
              <option value="transport">Transporte</option>
              <option value="health">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ () => console.log('click') }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

export default Wallet;
