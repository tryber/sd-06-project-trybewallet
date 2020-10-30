import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <div>
        <form>
          <input data-testid="value-input" type="number" />
          <input data-testid="description-input" type="text" />
          <select data-testid="currency-input">
            <option>USD</option>
          </select>
          <select data-testid="method-input">
            <option>Dinheiro</option>
          </select>
          <select data-testid="tag-input">
            <option>Lazer</option>
          </select>
          <button type="button">Adicionar Despesa</button>
        </form>
      </div>
    );
  }
}

export default Form;
