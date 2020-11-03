import React from 'react';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { addExpense, updateExchangeInfo } from '../../actions';
import AddButton from './AddButton';

import fetchApi from '../../services/api';

const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class FormularioDespesa extends React.Component {
  constructor() {
    super();
    this.submitForm = this.submitForm.bind(this);
  }

  generateOptions(values) {
    return values
      .map((val) => (
        <option
          key={ val }
          data-testid={ val }
          value={ val }
        >
          { val }
        </option>
      ));
  }

  submitForm() {
    const { updateExchangeInfo, addExpense } = this.props;

    fetchApi().then((exchangeRates) => {
      updateExchangeInfo(exchangeRates);
      addExpense({ ...this.state, exchangeRates });
    });
  }

  handleChange(name, { target }) {
    this.setState({
      [name]: target.value,
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state || {};

    return (
      <div>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            data-testid="value-input"
            onChange={ (e) => this.handleChange('value', e) }
            value={ value }
          />
        </label>

        <label htmlFor="description-input">
          Descrição:
        </label>
        <input
          id="description-input"
          data-testid="description-input"
          onChange={ (e) => this.handleChange('description', e) }
          value={ description }
        />

        <label htmlFor="currency-input">
          Moeda:
        </label>
        <select
          id="currency-input"
          name="currency-input"
          data-testid="currency-input"
          onChange={ (e) => this.handleChange('currency', e) }
          value={ currency }
        >
          {this.generateOptions(currencies)}
        </select>

        <label htmlFor="method-input">
          Forma de pagamento:
        </label>
        <select
          id="method-input"
          data-testid="method-input"
          onChange={ (e) => this.handleChange('method', e) }
          value={ method }
        >
          {this.generateOptions(paymentMethods)}
        </select>

        <label htmlFor="tag-input">
          Categoria:
        </label>
        <select
          id="tag-input"
          data-testid="tag-input"
          onChange={ (e) => this.handleChange('tag', e) }
          value={ tag }
        >
          {this.generateOptions(tagOptions)}
        </select>

        <AddButton onClick={ this.submitForm } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { wallet } = state;
  return { currencies: wallet.currencies };
}

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpense(expense)),
  updateExchangeInfo: (exchangeInfo) => dispatch(updateExchangeInfo(exchangeInfo)),
});

FormularioDespesa.propTypes = {
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.string.isRequired,
  updateExchangeInfo: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormularioDespesa);
