import React from 'react';

function Form() {
  return (
    <div className="formComponent">
      <label htmlFor="valor">Valor: </label>
      <input type="number" id="valor" data-testid="value-input" />
    </div>
  );
}

export default Form;
