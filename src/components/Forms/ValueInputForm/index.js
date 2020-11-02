import React from 'react';

import './style.css';

class ValueInputForm extends React.Component {
  render() {
    const { genericHandleChange } = this.props;
    return (
      <label htmlFor="value">
        Valor:
        <input
          data-testid="value-input"
          id="value"
          name="value"
          type="number"
          className="value"
          placeholder="$"
          min="0"
          step="0.01"
          onChange={ (event) => genericHandleChange(event) }
        />
      </label>
    );
  }
}

export default ValueInputForm;
