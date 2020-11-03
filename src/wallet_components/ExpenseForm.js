import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    const { currencyList, isFetching } = this.props;
    if (isFetching) {
      return <h1>LOADING INFORMATION...</h1>;
    }
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
            { currencyList.forEach((currency) => {
              const { code } = currency;
              console.log(currency);
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

ExpenseForm.propTypes = {
  currencyList: PropTypes.arrayOf(PropTypes.shape()),
  isFetching: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  currencyList: state.wallet.currencies,
  isFetching: state.wallet.fetchingList,
});

const mapDispatchToProps = (dispatch) => ({
  expense: (object) => dispatch(addExpense(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
