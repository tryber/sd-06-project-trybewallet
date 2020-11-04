import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/Wallet.css';
import logo from '../images/logo.png';
import { addExpenseThunk, fetchCurrencies } from '../actions';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { actionCreators } from '../store/index';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expense: {
        id: 0,
        value: '0',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    const { expense } = this.state;
    const updateID = () => {
      this.setState({
        expense: {
          ...expense,
          id: expenses.length,
        },
      });
    };
    if (prevProps.expenses.length !== expenses.length) {
      updateID();
    }
  }

  calculateTotal() {
    const { expenses } = this.props;
    // modelo de reduce encontrado no seguinte PR: https://github.com/tryber/sd-06-project-trybewallet/blob/marioduartedev/src/pages/Wallet.js
    const total = expenses
      .reduce((accumulator, current) => accumulator + parseFloat((current
        .exchangeRates[current.currency].ask * current.value)), 0);

    return total;
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { expense } = this.state;
    this.setState({
      expense: {
        ...expense,
        [name]: value,
      },
    });
  }

  render() {
    const payMeth = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const expCat = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { email, currencies, expenses } = this.props;
    const { expense } = this.state;
    const { value, description, method, currency, tag } = expense;
    const { addExpense } = this.props;
    return (
      <div>
        <header className="header-wallet">
          <img
            src={ logo }
            alt="Logo"
            className="img-logo-wallet"
          />
          <span
            data-testid="email-field"
          >
            {email}
          </span>
          <span
            data-testid="total-field"
          >
            {this.calculateTotal()}
          </span>
          <span
            data-testid="header-currency-field"
          >
            BRL
          </span>
        </header>
        <form className="form">
          <input
            id="value"
            name="value"
            value={ value }
            onChange={ this.handleChange }
            placeholder="Valor"
            data-testid="value-input"
          />
          <input
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleChange }
            placeholder="Descrição"
            data-testid="description-input"
          />
          <select
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
            data-testid="currency-input"
          >
            {currencies
              .map((moeda) => (
                <option data-testid={ moeda } value={ moeda } key={ moeda }>
                  { moeda }
                </option>
              ))}
          </select>
          <select
            id="method"
            name="method"
            value={ method }
            onChange={ this.handleChange }
            data-testid="method-input"
          >
            {payMeth
              .map((payMethod) => (
                <option value={ payMethod } key={ payMethod }>
                  { payMethod }
                </option>
              ))}
          </select>
          <select
            id="tag"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
            data-testid="tag-input"
          >
            {expCat.map((category) => (
              <option value={ category } key={ category }>
                { category }
              </option>
            ))}
          </select>
          <button
            className="wallet-button"
            type="button"
            onClick={ () => addExpense(expense) }
          >
            Adicionar despesa
          </button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
        </table>
        <table>
          <tbody>
            {expenses.map((exp) => (
              <tr key={ exp.currency }>
                <td>{ exp.description }</td>
                <td>{ exp.tag }</td>
                <td>{ exp.method }</td>
                <td>{ exp.value }</td>
                <td>{ exp.exchangeRates[exp.currency].name }</td>
                <td>{ parseFloat(exp.exchangeRates[exp.currency].ask).toFixed(2) }</td>
                <td>
                  {
                    (exp.exchangeRates[exp.currency].ask * exp.value).toFixed(2)
                  }
                </td>
                <td> Real </td>
                <td>
                  <button type="button">
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  addExpense: (expense) => dispatch(addExpenseThunk(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

// mapStateToProps é equivalente a um getState()
// mapDispatchToProps é equivalente a um setState()

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  addExpense: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};
