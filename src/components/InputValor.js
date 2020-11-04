import React from 'react';
import PropTypes from 'prop-types';

class InputValor extends React.Component {
  render() {
    return (
      <div>
        <label>Valor :
          <input
            type="text"
            name="value"
            data-testid="value-input"
            value={ this.props.value }
            onChange={ this.props.handleChange }
          />
        </label>
      </div>
    );
  }
}

InputValor.propTypes = {
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
}

export default InputValor;
