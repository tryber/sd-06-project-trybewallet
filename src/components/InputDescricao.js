import React from 'react';
import PropTypes from 'prop-types';

class InputDescricao extends React.Component {
  render() {
    return (
      <div>
        <label>Descricao :
          <input 
            type="text"
            name="description"
            data-testid="description-input"
            onChange={ this.props.handleChange }
          />
        </label>
    </div>
    );
  }
}

InputDescricao.propTypes = {
  handleChange: PropTypes.func.isRequired,
}

export default InputDescricao;
