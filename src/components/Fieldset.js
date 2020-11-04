import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class Fieldset extends Component {
  render() {
    const {
      coins,
      methods,
      allTags,
      value,
      changeValue,
      changeCoin,
      changeMethod,
      changeTag,
      changeDescription,
    } = this.props;
    return (
      <form className="wallet-forms">
        <label htmlFor="quantity">
          Valor:
          <input
            onChange={ changeValue }
            className="quantity"
            id="quantity"
            value={ value }
            type="text"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            onChange={ changeCoin }
            id="currency"
            data-testid="currency-input"
          >
            { coins }
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento:
          <select onChange={ changeMethod } id="method" data-testid="method-input">
            { methods }
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select onChange={ changeTag } id="tag" data-testid="tag-input">
            { allTags }
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            onChange={ changeDescription }
            id="description"
            type="text"
            data-testid="description-input"
          />
        </label>
      </form>
    );
  }
}

Fieldset.propTypes = {
  coins: propTypes.arrayOf(propTypes.shape(), propTypes.func).isRequired,
  methods: propTypes.arrayOf(propTypes.shape(), propTypes.func).isRequired,
  allTags: propTypes.arrayOf(propTypes.shape(), propTypes.func).isRequired,
  changeValue: propTypes.func.isRequired,
  changeCoin: propTypes.func.isRequired,
  changeMethod: propTypes.func.isRequired,
  changeTag: propTypes.func.isRequired,
  changeDescription: propTypes.func.isRequired,
};
