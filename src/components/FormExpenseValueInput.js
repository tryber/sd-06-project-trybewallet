import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormExpenseValueInput extends Component {
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, handleChange } = this.props;
    return (
      <div>
        <label htmlFor={ `value-input-${value}` }>
          Valor:
          <input
            id={ `value-input-${value}` }
            type="text"
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ handleChange }
          />
        </label>
      </div>

    );
  }
}

export default FormExpenseValueInput;

FormExpenseValueInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};
