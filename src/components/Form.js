import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import awesomeAPI from '../services/awesomeAPI';
import { fetchExchangeRatesAndStoreExpenses } from '../actions';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      currencyList: [],
      expenses: {
        id: 0,
        value: 0,
        description: '',
        currency: '',
        method: '',
        tag: '',
      },
    };

    this.getCurrencies = this.getCurrencies.bind(this);
    this.saveToState = this.saveToState.bind(this);
    this.saveExpensesToStore = this.saveExpensesToStore.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  async getCurrencies() {
    const data = await awesomeAPI();
    const currencyList = Object.keys(data);
    const { expenses } = this.state;
    this.setState({
      currencyList,
      expenses: { ...expenses } });
  }

  saveToState(target) {
    const { expenses } = this.state;
    this.setState({
      expenses: { ...expenses, [target.name]: target.value },
    });
  }

  saveExpensesToStore(data) {
    const { saveExpenses } = this.props;
    saveExpenses(data);
    this.setState((prevState) => ({
      expenses: {
        ...prevState.expenses,
        id: prevState.expenses.id + 1,
        value: 0,
      },
    }));
  }

  render() {
    const { currencyList, expenses } = this.state;
    return (
      <form className="form">
        <label htmlFor="value-input">
          Valor:
          <input
            data-testid="value-input"
            type="number"
            id="value-input"
            value={ expenses.value }
            name="value"
            onChange={ (e) => this.saveToState(e.target) }
          />
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            data-testid="description-input"
            id="description-input"
            type="text"
            name="description"
            onChange={ (e) => this.saveToState(e.target) }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency-input"
            name="currency"
            onChange={ (e) => this.saveToState(e.target) }
            defaultValue="DEFAULT"
          >
            <option disabled value="DEFAULT"> -- Selecione uma opção -- </option>
            {currencyList.map((currency) => {
              if (currency === 'USDT') return;
              return (
                <option
                  data-testid={ currency }
                  key={ currency }
                  value={ currency }
                >
                  {currency}
                </option>);
            })}
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento:
          <select
            data-testid="method-input"
            name="method"
            defaultValue="DEFAULT"
            id="method-input"
            onChange={ (e) => this.saveToState(e.target) }
          >
            <option disabled value="DEFAULT"> -- Selecione uma opção -- </option>
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria:
          <select
            data-testid="tag-input"
            name="tag"
            defaultValue="DEFAULT"
            id="tag-input"
            onChange={ (e) => this.saveToState(e.target) }
          >
            <option disabled value="DEFAULT"> -- Selecione uma opção -- </option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button type="button" onClick={ () => this.saveExpensesToStore(expenses) }>
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveExpenses: (expenses) => dispatch(fetchExchangeRatesAndStoreExpenses(expenses)) });

export default connect(null, mapDispatchToProps)(Form);

Form.propTypes = { saveExpenses: PropTypes.func.isRequired };
