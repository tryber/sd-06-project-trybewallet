import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { paymentMethods, categoryTags } from '../services/data';
import { saveExpense, fetchCurrenciesNames } from '../actions';

/*
Dropdown binding from API inspired by
https://www.carlrippon.com/react-drop-down-data-binding/
*/
const paymentMethods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const categoryTags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class ExpensesForm extends React.Component {
  constructor() {
    super();

    this.setInitialCurrency = this.setInitialCurrency.bind(this);
    this.state = {
      id: 0,
      value: 0,
      method: paymentMethods[0],
      tag: categoryTags[0],
      description: '',
      currency: '',
    };
  }

  componentDidMount() {
    // const { fetchCurrenciesNamesAction } = this.props;
    // fetchCurrenciesNamesAction();
    this.setInitialCurrency();
  }

  componentDidUpdate(previousProps, previousState) {
    console.log('Previous Prop CurrenciesNames', previousProps.currenciesNames);
    console.log('Previous State Id', previousState.id);
    /*
    if (!previousProps.currenciesNames) {
      fazer o fetch?
      chamar setInitialCurrency? Deveria mudar o nome para setCurrencies?
    }
    */
    const { currenciesNames } = this.props;
    console.log('Chamando currenciesNames no DidUpdate', currenciesNames);
  }

  async setInitialCurrency() {
    const { fetchCurrenciesNamesAction } = this.props;
    await fetchCurrenciesNamesAction();
    const { currenciesNames } = this.props;
    this.setState({
      currency: currenciesNames[0],
    });
  }

  async getCurrenciesNames() {
    const requestResponse = await fetch(
      'https://economia.awesomeapi.com.br/json/all',
    );
    const formattedData = await requestResponse.json();
    const currenciesNames = Object.keys(formattedData);
    const withoutUSDTCurrencies = currenciesNames.filter((currency) => (
      currency !== 'USDT'
    ));
    this.setState({
      currenciesNames: withoutUSDTCurrencies,
      currency: withoutUSDTCurrencies[0],
    });
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

const mapDispatchToProps = (dispatch) => ({
  addExpenseAction: (expense) => dispatch(saveExpense(expense)),
  fetchCurrenciesNamesAction: () => dispatch(fetchCurrenciesNames()),
});

const mapStateToProps = (state) => ({
  currenciesNames: state.wallet.currencies,
});

/*
function mapDispatchToProps(dispatch) {
  const mappedProps = {
    addExpenseAction: (expense) => dispatch(saveExpense(expense)),
  };
  return mappedProps;
}
*/

ExpensesForm.propTypes = {
  addExpenseAction: PropTypes.func.isRequired,
  currenciesNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrenciesNamesAction: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
