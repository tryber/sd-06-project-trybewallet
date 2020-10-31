import React from 'react';

function Form() {
  return (
    <div>
      <label for="valor">Valor: </label>
      <input type="number" id="valor" data-testid="value-input" />
    </div>;
  )
}

export default Form;
