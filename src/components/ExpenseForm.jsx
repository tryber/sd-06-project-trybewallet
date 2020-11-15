import React, { Component } from 'react';

class ExpenseForm extends Component {

  render() {
    return(
      <form action="" className="entry">
        <div className="system-information">
          <p className="id-input"> numero da entrada </p>
          <p className="entry-date"> data da entrada </p>
        </div>
        <div className="user-entry">
          <input
            type="number"
            className="valueInput"
            data-testid="value-input"
            placeholder="Valor da Despesa."
          />
          <input
            type="text"
            className="textInput"
            data-testid="description-input"
            placeholder="Descrição da Despesa."
          />
          <input
            type="number"
            className="currencyInput"
            data-testid="currency-input"
            placeholder=""
          />
        </div>
      </form>
    );
  };
}

export default ExpenseForm;
