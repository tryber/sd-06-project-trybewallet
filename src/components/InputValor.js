import React from 'react';
import PropTypes from 'prop-types';

class InputValor extends React.Component {
  render() {
    const { value, handleChange } = this.props;
    return (
      <div>
        <label>
          Valor :
          <input
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

InputValor.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};

export default InputValor;
