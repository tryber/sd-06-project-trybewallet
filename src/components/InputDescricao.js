import React from 'react';
import PropTypes from 'prop-types';

class InputDescricao extends React.Component {
  render() {
    const { handleChange } = this.props;
    return (
      <div>
        <label htmlFor="description">
          Descricao :
          <input
            id="description"
            type="text"
            name="description"
            data-testid="description-input"
            onChange={ handleChange }
          />
        </label>
      </div>
    );
  }
}

InputDescricao.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default InputDescricao;
