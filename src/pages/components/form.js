import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Currencies from './currencies';
import { expensesAdd } from '../../actions';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.addExpensesToRedux = this.addExpensesToRedux.bind(this);
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
    this.updateAllState = this.updateAllState.bind(this);

    this.state = {
      expenses: {
        value: '',
        description: '',
        currency: 'USD',
        method: '',
        tag: '',
        exchangeRates: [],
      },
      total: 0,
    };
  }

  handleChange({ target, nativeEvent }) {
    const { name, value } = target;
    console.log(name);
    if (name === 'method' || name === 'tag') {
      const { options, options: { selectedIndex } } = nativeEvent.target;
      console.log(options[selectedIndex].innerHTML);
      this.setState((prev) => ({
        ...prev,
        expenses: {
          ...prev.expenses,
          [name]: options[selectedIndex].innerHTML,
        },
      }));
    } else {
      this.setState((prev) => ({
        ...prev,
        expenses: {
          ...prev.expenses,
          [name]: value,
        },
      }));
    }
  }

  handleChangeCurrency(selectCurr) {
    this.setState((prev) => ({ expenses:
    { ...prev.expenses, currency: selectCurr } }));
  }

  async addExpensesToRedux(e) {
    e.preventDefault();
    const { expenses } = this.props;
    const EXPENSES_LENGTH = Object.keys(expenses).length;
    const NEXT_ID = EXPENSES_LENGTH || 0;
    const CURRENCIES = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
    this.updateAllState(CURRENCIES, NEXT_ID);
  }

  updateAllState(currencies, id) {
    const { expenses } = this.state;
    const { regExpenses } = this.props;
    const rate = currencies[expenses.currency].ask;
    this.setState((prev) => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        id,
        exchangeRates: currencies,
      },
      total: rate * expenses.value,
    }), () => {
      regExpenses(this.state);
    });
  }

  render() {
    const { expenses } = this.props;
    const { value, description, total } = expenses;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <label htmlFor="value">
          Valor:
          { total }
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
        <Currencies handleChangeCurrency={ this.handleChangeCurrency } />
        <label htmlFor="method">
          <select
            data-testid="method-input"
            id="method"
            name="method"
            className="method"
            onChange={ (event) => this.handleChange(event) }
          >
            {methods.map((method) => (
              <option
                value={ method }
                key={ method }
              >
                { method }
              </option>))}
            {/* <option value="dinheiro">Dinheiro</option>
            <option value="card">Cartão de crédito</option>
            <option value="cardDeb">Cartão de débito</option> */}
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
  regExpenses: (expense) => dispatch(expensesAdd(expense)),
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
  regExpenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
