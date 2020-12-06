import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormExpenseDescriptionInput extends Component {
  render() {
    const description = this.state;
    const { handleChange } = this.props;
    return (
      <div>
        <label htmlFor="description">
          Descrição:
          <input
            name="description"
            value={ description }
            onChange={ handleChange }
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

FormExpenseDescriptionInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
