import React from 'react';

import './style.css';

class ValueInputForm extends React.Component {
  render() {
    const { valueBRLOnChange } = this.props;
    return (
      <label htmlFor="expense">
        Valor:
        <input
          data-testid="value-input"
          id="expense"
          type="number"
          className="expense"
          placeholder="$"
          min="0"
          step="0.01"
          onChange={ ({ target }) => valueBRLOnChange(target.value) }
        />
      </label>
    );
  }
}

export default ValueInputForm;
