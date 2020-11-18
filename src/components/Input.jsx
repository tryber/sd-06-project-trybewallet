import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { testId, name, type, onChange, placeholder } = this.props;
    return (
      <input
        data-testid={ testId }
        type={ type }
        name={ name }
        onChange={ onChange }
        placeholder={ placeholder }
        required
      />
    );
  }
}

Input.propTypes = {
  testId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
