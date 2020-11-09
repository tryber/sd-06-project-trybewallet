import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrency, newCurrency } from '../actions';

class FormWallet extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleNewExpense = this.handleNewExpense.bind(this);

    this.state = {
      expenses: {
        value: 0,
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        description: '',
        id: 0,
      },
    };
  }

  componentDidMount() {
    const { currencyFunction } = this.props;
    currencyFunction();
  }

  handleChange({ target: { name, value } }) {
    this.setState((prevState) => ({
      ...prevState,
      expenses: { ...prevState.expenses, [name]: value },
    }));
  }

  handleNewExpense(event) {
    event.preventDefault();
    const { expenses } = this.state;
    const { addNewExpense } = this.props;
    addNewExpense(expenses);
    this.setState((prevState) => ({
      ...prevState,
      expenses: { ...prevState.expenses,
        value: 0,
        currency: '',
        method: '',
        tag: '',
        description: '',
        id: prevState.expenses.id + 1 },
    }));
  }

  render() {
    const { currencies } = this.props;
    const { expenses } = this.state;
    const { value, currency, method, tag, description } = expenses;
    return (
      <div className="form_container">
        <form>
          <div>
            <label htmlFor="value">
              Valor:
              <input
                type="number"
                id="value"
                data-testid="value-input"
                name="value"
                onChange={ this.handleChange }
                value={ value }
              />
            </label>
          </div>
          <div>
            <label htmlFor="currency">
              Moeda:
              <select
                id="currency"
                data-testid="currency-input"
                name="currency"
                value={ currency }
                onChange={ this.handleChange }
              >
                {currencies && currencies.filter((coin) => coin !== 'USDT')
                  .map((cur) => (
                    <option
                      key={ cur }
                      data-testid={ cur }
                      value={ cur }
                    >
                      { cur }
                    </option>))}
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="method">
              Método de pagamento:
              <select
                id="method"
                data-testid="method-input"
                name="method"
                value={ method }
                onChange={ this.handleChange }
              >
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de crédito">Cartão de crédito</option>
                <option value="Cartão de débito">Cartão de débito</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="tag">
              Tag:
              <select
                id="tag"
                data-testid="tag-input"
                name="tag"
                value={ tag }
                onChange={ this.handleChange }
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Lazer">Lazer</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
              </select>
            </label>
          </div>
          <div>
            <label htmlFor="description">
              Descrição:
              <input
                type="text"
                id="description"
                data-testid="description-input"
                name="description"
                onChange={ this.handleChange }
                value={ description }
              />
            </label>
          </div>
          <div>
            <button
              type="button"
              onClick={ this.handleNewExpense }
            >
              Adicionar Despesa
            </button>
          </div>
        </form>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currencyFunction: () => dispatch(fetchCurrency()),
  addNewExpense: (expense) => dispatch(newCurrency(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
