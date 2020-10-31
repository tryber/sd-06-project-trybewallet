import React from 'react';

function Form() {
  return (
    <div className="formComponent">
      <label htmlFor="valor">Valor: 
        <input type="number" id="valor" data-testid="value-input" />
      </label>
    </div>
  );
}

export default Form;
