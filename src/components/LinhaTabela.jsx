import React from 'react';
import PropTypes from 'prop-types';

const LinhaTabela = (props) => {
  const { currency, description, method, value, tag, exchangeRates } = props.expense;
  const cambio = parseFloat(exchangeRates[currency].ask);
  const decimalValue = parseFloat(value);
  const totalGasto = cambio * decimalValue;
    return (
      <tr>
        <td>{ description }</td>
        <td>{ tag }</td>
        <td>{ method }</td>
        <td>{ `${ decimalValue }` }</td>
        <td>{ exchangeRates[currency].name }</td>
        <td>{ `${ cambio.toFixed(2) }` }</td>
        <td>{ `${ totalGasto.toFixed(2) }` }</td>
        <td>Real</td>
      </tr>
    );
}

LinhaTabela.propTypes = {
  planeta: PropTypes.shape({
    created: PropTypes.string,
    edited: PropTypes.string,
    url: PropTypes.string,
    films: PropTypes.instanceOf(Array),
    climate: PropTypes.string,
    diameter: PropTypes.string,
    gravity: PropTypes.string,
    name: PropTypes.string,
    orbital_period: PropTypes.string,
    population: PropTypes.string,
    surface_water: PropTypes.string,
    terrain: PropTypes.string,
    rotation_period: PropTypes.string,
  }).isRequired,
};

export default LinhaTabela;