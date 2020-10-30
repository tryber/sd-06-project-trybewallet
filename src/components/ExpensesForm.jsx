import React from 'react';

class ExpensesForm extends React.Component {
  render() {
    return(
      <form className="expenses">
        <fieldset>
          <legend>Adicionar desespesas:</legend>
          <label htmlFor="value-input">
            Valor:
            <input
              name="expense-value"
              type="number"
              data-testid="value-input"
            />
          </label>

          <label htmlFor="description-input">
            Descrição:
            <input
              name="expense-description"
              type="text"
              data-testid="description-input"
            />
          </label>

          <label htmlFor="method-input">
            Moeda:
            <select name="currency" data-testid="currency-input">
              <option value="USD" data-testid="USD">USD</option>
            </select>
          </label>

          <label htmlFor="method-input">
            Pagamento:
            <select name="method" data-testid="method-input">
              <option value="dinheiro">Dinheiro</option>
              <option value="credito">Cartão de crédito</option>
              <option value="debito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag-input">
            Tag:
            <select name="tag" data-testid="tag-input">
              <option value="food">Alimentação</option>
              <option value="hobbie">Lazer</option>
              <option value="work">Trabalho</option>
              <option value="transport">Transporte</option>
              <option value="health">Saúde</option>
            </select>
          </label>
          <button onClick={console.log('HandleButton')} type="submit">Adicionar despesa</button>

        </fieldset>
      </form>
    );
  }
}

export default ExpensesForm;
