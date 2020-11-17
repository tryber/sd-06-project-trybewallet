import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="value">
          Valor
          <input
            data-testid="value-input"
            id="value"
            type="number"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            id="description"
            type="text"
          />
        </label>
      </form>
    );
  }
}

export default Form;
