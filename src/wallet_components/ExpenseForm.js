import React from 'react';
import { connect } from 'react-redux';
import getCurrencyList from '../services/currencyAPI';
// import PropTypes from 'prop-types';
import { addExpense, fetchCurrencyList } from '../actions';

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      expense: 0,
      selectedCurrency: 'USD',
      // paymentMethod: 'Dinheiro',
      // tag: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetchCurrencyList();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { expense, description, selectedCurrency } = this.state;
    const currencyList = getCurrencyList('USDT');
    return (
      <form>
        <label htmlFor="expense">
          Valor:
          <input
            name="expense"
            type="number"
            data-testid="value-input"
            value={ expense }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            name="description"
            type="text"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda :
          <select
            name="currency"
            type="select"
            data-testid="currency-input"
            value={ selectedCurrency }
            onChange={ this.handleChange }
          >
            { Object.keys(currencyList).map((currency) => {
              const { code } = currency;
              return (
                <option
                  key={ code }
                  data-testid={ code }
                  value={ code }
                >
                  { `${code}` }
                </option>
              );
            }) }
          </select>
        </label>
      </form>
    );
  }
}

// const mapStateToProps = (state) => ({

// });

const mapDispatchToProps = (dispatch) => ({
  expense: (object) => dispatch(addExpense(object)),
});

export default connect(null, mapDispatchToProps)(ExpenseForm);
