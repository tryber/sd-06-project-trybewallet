import React, { Component } from 'react';
import propTypes from 'prop-types';

class Input extends Component {
  render() {
    const { testId, name, id, type, max, min, onChange } = this.props;
    return (
      <input
        data-testid={ testId }
        type={ type }
        name={ name }
        id={ id }
        maxLength={ max }
        minLength={ min }
        onChange={ onChange }
        required
      />
    );
  }
}

Input.defaultProps = {
  max: '40',
  min: '6',
};

Input.propTypes = {
  testId: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  max: propTypes.string,
  min: propTypes.string,
  onChange: propTypes.func.isRequired,
};

export default Input;
