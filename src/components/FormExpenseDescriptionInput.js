import React, { Component } from 'react';

class FormExpenseDescriptionInput extends Component {
  render() {
    const description = this.state;
    return (
      <div>
        <label htmlFor="description">
          Descrição:
          <input
            name="description"
            value={ description }
            onChange={ (event) => this.handleChange(event) }
            data-testid="description-input"
            type="text"
            id="description"
          />
        </label>
      </div>
    );
  }
}

export default FormExpenseDescriptionInput;
