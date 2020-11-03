import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expensesAction, currenciesAction, currencyAPI } from '../actions';

class ExpensesForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      expenses: '',
      currencies: '',
      descriptionExpenses: '',
      method: '',
      category: '',
    };
  }

  componentDidMount() {
    const { fetchCurrency } = this.props;
    fetchCurrency();
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick() {
    const { userCurrency, userExpenses } = this.props;
    const { expenses, currencies } = this.state;
    userCurrency(currencies);
    userExpenses(expenses);
  }

  render() {
    const { expenses, currencies, descriptionExpenses, method, category } = this.state;
    const { fetchCurrencyAPI } = this.props;
    console.log(fetchCurrencyAPI);
    return (
      <div>
        <form>
          <label htmlFor="expenses">
            Valor da despesa:
            <input
              type="number"
              name="expenses"
              data-testid="value-input"
              value={ expenses }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="descriptionExpenses">
            Descrição da despesa:
            <input
              type="text"
              name="descriptionExpenses"
              data-testid="description-input"
              value={ descriptionExpenses }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda que a despesa foi feita:
            <select
              type="text"
              name="currency"
              data-testid="currency-input"
              value={ currencies }
              onChange={ this.handleChange }
            >
              { fetchCurrencyAPI.map((currency) => (
                <option key={ currency } data-testid={ currency }>{currency}</option>
              )) }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="credito">Cartão de crédito</option>
              <option value="debito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria da despesa:
            <select
              name="category"
              data-testid="tag-input"
              value={ category }
              onChange={ this.handleChange }
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
            </select>
          </label>
          <button type="submit" onClick={ this.handleClick }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  fetchCurrencyAPI: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  userCurrency: (currency) => dispatch(currenciesAction(currency)),
  userExpenses: (expenses) => dispatch(expensesAction(expenses)),
  fetchCurrency: (currency) => dispatch(currencyAPI(currency)),
});

ExpensesForm.propTypes = {
  userCurrency: PropTypes.func.isRequired,
  userExpenses: PropTypes.func.isRequired,
  fetchCurrency: PropTypes.func.isRequired,
  fetchCurrencyAPI: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesForm);
