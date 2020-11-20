import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { currencyThunk, expensesThunk } from '../../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.addExpensesToRedux = this.addExpensesToRedux.bind(this);
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

  addExpensesToRedux(e) {
    e.preventDefault();
    const { getExpenses, getCurrency } = this.props;
    console.log(this.state);
    getCurrency();
    getExpenses(this.state);
  }

  render() {
    const { allCurrencies } = this.props;
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
          type="submit"
          onClick={ this.addExpensesToRedux }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

const mapStateToProps = (states) => ({
  expenses: states.wallet.expenses,
  allCurrencies: states.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getExpenses: () => dispatch(expensesThunk()),
  getCurrency: () => dispatch(currencyThunk()),
});

Form.propTypes = {
  allCurrencies: PropTypes.shape(PropTypes.any.isRequired).isRequired,
  getExpenses: PropTypes.func.isRequired,
  getCurrency: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
