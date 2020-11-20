import React, { useDebugValue } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { expensesAdd } from '../../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      expenses: {
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: {},
      },
      total: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.addExpensesToRedux = this.addExpensesToRedux.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.updateAllStates = this.updateAllStates.bind(this);

  }

  // componentDidMount() {
  //   const { getCurrency } = this.props;
  //   getCurrency();
  // }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  handleChangeCurrency(selectCurr) {
    this.setState((prev) => ({ expenses:
    { ...prev.expenses, currency: selectCurr } }));
  }

async aaddExpensesToRedux(e) {
    e.preventDefault();
    const { expenses } = this.props;
    const EXPENSES_LENGTH = Object.key(expenses).length;
    const NEXT_ID = EXPENSES_LENGTH || 0;
    const CURRENCIES = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
    updateAllState(CURRENCIES, NEXT_ID);
  }

  updateAllState(currencies, id) {
    const { expenses } = this.state;
    const { regExpense } = this.props;
    const rate = currencies[expenses.currency].ask;
    this.setState(() => ({
      expenses: {
        ...expenses,
        id,
        exchangeRates: currencies,
      },
      total: rate * expenses.value,
    }), () => {
      regExpense(this.state);
    });
  }

  render() {
    const { expenses } = this.props;
    const { value, description, total } = expenses;
    const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            id="value"
            name="value"
            type="number"
            className="value"
            placeholder="$"
            value={ value }
            min="0"
            step="0.01"
            onChange={ (event) => this.handleChange(event) }
          />
        </label>
        <input
          data-testid="description-input"
          type="text"
          name="description"
          id="description"
          value={ description }
          onChange={ (event) => this.handleChange(event) }
        />
        <label htmlFor="currency">
          <select
            id="currency"
            name="currency"
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            {Object.keys(allCurrencies)
              .filter((currency) => currency !== 'USDT')
              .map((currency) => (
                <option
                  key={ `${currency}` }
                  data-testid={ `${currency}` }
                  value={ `${currency}` }
                >
                  {currency}
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="method">
          <select
            data-testid="method-input"
            id="method"
            name="method"
            className="method"
            onChange={ (event) => this.handleChange(event) }
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="card">Cartão de crédito</option>
            <option value="cardDeb">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            className="tag"
            onChange={ (event) => this.handleChange(event) }
          >
            {categories.map((category) => (
              <option
                value={ category }
                key={ category }
              >
                { category }
              </option>))}
            {/* <option value="alimentacao">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option> */}
          </select>
        </label>
        <button
          onClick={ (e) => this.addExpensesToRedux(e) }
          type="submit"
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (states) => ({
  expenses: states.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  regExpenses: (expense) => dispatch(expensesAdd1(expense)),
});

Form.propTypes = {
  expenses: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    exchangeRates: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  regExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
