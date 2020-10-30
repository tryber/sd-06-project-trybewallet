import React from 'react';

class FormularioDespesa extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="value-input">
          Valor:
          <input
            data-testid="value-input"
          />
        </label>
      </div>
    );
  }
}

export default FormularioDespesa;
