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
    const { updateExchangeInfo0, addExpense0 } = this.props;

    fetchApi().then((exchangeRates) => {
      updateExchangeInfo0(exchangeRates);
      addExpense0({ ...this.state, exchangeRates });
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
          <input
            id="description-input"
            data-testid="description-input"
            onChange={ (e) => this.handleChange('description', e) }
            value={ description }
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          <select
            id="currency-input"
            name="currency-input"
            data-testid="currency-input"
            onChange={ (e) => this.handleChange('currency', e) }
            value={ currency }
          >
            <option value="">Selecionar</option>
            {this.generateOptions(currencies)}
          </select>
        </label>

        <label htmlFor="method-input">
          Forma de pagamento:
          <select
            id="method-input"
            data-testid="method-input"
            onChange={ (e) => this.handleChange('method', e) }
            value={ method }
          >
            <option value="">Selecionar</option>
            {this.generateOptions(paymentMethods)}
          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria:
          <select
            id="tag-input"
            data-testid="tag-input"
            onChange={ (e) => this.handleChange('tag', e) }
            value={ tag }
          >
            <option value="">Selecionar</option>
            {this.generateOptions(tagOptions)}
          </select>
        </label>

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
  addExpense0: (expense) => dispatch(addExpense(expense)),
  updateExchangeInfo0: (exchangeInfo) => dispatch(updateExchangeInfo(exchangeInfo)),
});

FormularioDespesa.propTypes = {
  addExpense0: PropTypes.func.isRequired,
  currencies: PropTypes.string.isRequired,
  updateExchangeInfo0: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormularioDespesa);
