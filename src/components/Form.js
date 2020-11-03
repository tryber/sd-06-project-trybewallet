import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addExpensesThunk } from '../actions';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick() {
    const { addMoney } = this.props;
    addMoney(this.state);
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    });
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const methods = [
      'Método de pagamento',
      'Dinheiro',
      'Cartão de crédito',
      'Cartão de débito',
    ];

    const categories = [
      'Categorias',
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];

    return (
      <div>
        <div>
          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            placeholder="Digite sua despesa"
            onChange={ this.handleChange }
          />
          <input
            data-testid="description-input"
            type="text"
            name="description"
            placeholder="Descrição"
            value={ description }
            onChange={ this.handleChange }
          />
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            {currencies.map((moeda) => (
              <option
                key={ moeda }
                value={ moeda }
                data-testid={ `${moeda}` }
              >
                { moeda }
              </option>
            ))}
          </select>
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            {methods.map((item) => (
              <option key={ item }>
                { item }
              </option>
            ))}
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            {categories.map((category) => (
              <option key={ category }>
                { category }
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addMoney: (state) => dispatch(addExpensesThunk(state)),
});

Form.propTypes = {
  currencies: PropTypes.arrayOf().isRequired,
  addMoney: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
