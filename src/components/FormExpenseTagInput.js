import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormExpenseTagInput extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <label htmlFor="tag">
        Tag:
        <select id="tag" data-testid="tag-input" name="tag" onChange={ handleChange }>
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </label>
    );
  }
}

export default FormExpenseTagInput;

FormExpenseTagInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
