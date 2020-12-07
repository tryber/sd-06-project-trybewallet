import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormExpenseMethodInput extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <label htmlFor="method">
        Método de pagamento:
        <select
          id="method"
          name="method"
          data-testid="method-input"
          onChange={ handleChange }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }
}

export default FormExpenseMethodInput;

FormExpenseMethodInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
