import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAddCurrency, fetchCurrencies } from '../actions';
import './form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
  }

  componentDidMount() {
    const { setCurrencies } = this.props;
    setCurrencies();
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  async saveExpense() {
    const { sendExpense } = this.props;
    sendExpense(this.state);
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form className="form">
        <label htmlFor="value">
          Valor
          <input
            type="text"
            data-testid="value-input"
            id="value"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="valor">
          Descrição
          <input
            type="text"
            data-testid="description-input"
            value={ description }
            id="description"
            name="description"
            onChange={ this.handleChange }
          />
        </label>
        Moeda
        <label htmlFor="currency">
          <select
            data-testid="currency-input"
            value={ currency }
            id="currency"
            name="currency"
            onChange={ this.handleChange }
          >
            {currencies.map((cur) => (
              <option data-testid={ cur } value={ cur } key={ cur }>
                { cur }
              </option>
            ))}
          </select>
        </label>
        Método de pagamento
        <label htmlFor="method">
          <select
            data-testid="method-input"
            id="method"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        Tag
        <label htmlFor="tag">
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.saveExpense }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrencies: () => dispatch(fetchCurrencies()),
  sendExpense: (expenses) => dispatch(fetchAddCurrency(expenses)),
});

Form.propTypes = {
  setCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
  sendExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
