import React from 'react';
import PropTypes from 'prop-types';

class SelectCategoria extends React.Component {
  render() {
    const { handleChange } = this.props;
    return (
      <label htmlFor="tag">
        Metodo de pagamento
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

SelectCategoria.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default SelectCategoria;
