import React from 'react';
import PropTypes from 'prop-types';

class SelectPagamento extends React.Component {
  render() {
    const { handleChange } = this.props;
    return (
      <label htmlFor="method">
        Metodo de pagamento
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

SelectPagamento.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default SelectPagamento;
