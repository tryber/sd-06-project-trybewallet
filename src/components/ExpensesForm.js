import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { paymentMethods, categoryTags } from '../services/data';
import { saveExpense, fetchCurrenciesNames } from '../actions';

/*
Dropdown binding from API inspired by
https://www.carlrippon.com/react-drop-down-data-binding/
*/

class ExpensesForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      value: 0,
      method: paymentMethods[0],
      tag: categoryTags[0],
      description: '',
      currency: 'USD',
    };
  }

  componentDidMount() {
    const { fetchCurrenciesNamesAction } = this.props;
    fetchCurrenciesNamesAction();
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  addExpense(event) {
    const { addExpenseAction } = this.props;
    event.preventDefault();
    addExpenseAction(this.state);
    this.setState((previousState) => ({
      id: previousState.id + 1,
      value: 0,
    }
    ));
  }

  render() {
    const {
      value,
      method,
      tag,
      description,
      currency,
    } = this.state;

    const { currenciesNames } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          <input
            type="number"
            name="value"
            id="value-input"
            data-testid="value-input"
            value={ value }
            onChange={ (event) => this.handleInputChange(event) }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            id="currency-input"
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ (event) => this.handleInputChange(event) }
          >
            { currenciesNames.map((currencyName, index) => (
              <option
                key={ index }
                value={ currencyName }
                data-testid={ currencyName }
              >
                { currencyName }
              </option>
            )) }
          </select>
        </label>
        <label htmlFor="method-input">
          Método:
          <select
            id="method-input"
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ (event) => this.handleInputChange(event) }
          >
            { paymentMethods.map((paymentMethod, index) => (
              <option key={ index } value={ paymentMethod }>
                { paymentMethod }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="tag-input">
          Tag:
          <select
            id="tag-input"
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ (event) => this.handleInputChange(event) }
          >
            { categoryTags.map((category, index) => (
              <option key={ index } value={ category }>
                { category }
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="description-input">
          Descrição:
          <input
            type="text"
            name="description"
            id="description-input"
            data-testid="description-input"
            value={ description }
            onChange={ (event) => this.handleInputChange(event) }
          />
        </label>
        <button
          type="button"
          onClick={ (event) => this.addExpense(event) }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    currenciesNames: state.wallet.currencies,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addExpenseAction: (expense) => dispatch(saveExpense(expense)),
    fetchCurrenciesNamesAction: () => dispatch(fetchCurrenciesNames()),
  };
}

ExpensesForm.propTypes = {
  addExpenseAction: PropTypes.func.isRequired,
  currenciesNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrenciesNamesAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
