import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TrybeLogo from '../img/trybe-logo.png';
import trashcan from '../img/trashcan.png';
import { fetchCurrency, newCurrency, deleteExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleNewExpense = this.handleNewExpense.bind(this);
    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { currencyFunction } = this.props;
    currencyFunction();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleNewExpense(event) {
    event.preventDefault();
    const { newApiFunction } = this.props;
    const { ...expense } = this.state;
    event.preventDefault();
    newApiFunction(expense);
  }

  render() {
    const { user, currencies, expenses, deleteExp } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const totalValue = expenses.length ? Math.round(expenses
      .reduce((acc, cur) => acc + cur.value
      * cur.exchangeRates[cur.currency].ask, 0) * 100) / 100 : 0;
    const fields = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];
    return (
      <div className="wallet-container" onSubmit={ this.handleNewExpense }>
        <header>
          <div className="wallet-image-div">
            <img src={ TrybeLogo } width="150" alt="logo-trybe" />
          </div>
          <div className="wallet-info-div">
            <p data-testid="email-field">
              Email:
              { user }
            </p>
            <div className="despesa-total">
              <p>Despesa Total:</p>
              <p className="despesa-total-2" data-testid="total-field">
                { totalValue }
                <p className="currency" data-testid="header-currency-field">BRL</p>
              </p>
            </div>
          </div>
        </header>
        <form className="despesas-container">
          <label htmlFor="value">
            Valor:
            <input
              name="value"
              id="value"
              value={ value }
              required="required"
              type="number"
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
            >
              <option selected="selected">Selecione</option>
              {currencies.filter((cur) => cur !== 'USDT')
                .map((curr) => (
                  <option key={ curr } data-testid={ curr }>{ curr }</option>))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              data-testid="method-input"
              name="method"
              id="method"
              value={ method }
              required="required"
              onChange={ this.handleChange }
            >
              <option selected="selected">Selecione</option>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              name="tag"
              id="tag"
              value={ tag }
              required="required"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option selected="selected">Selecione</option>
              <option name="alimentacao">Alimentação</option>
              <option name="lazer">Lazer</option>
              <option name="trabalho">Trabalho</option>
              <option name="transporte">Transporte</option>
              <option name="saude">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descricão
            <input
              required="required"
              name="description"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <button type="submit" className="submit-button">Adicionar Despesa</button>
        </form>
        <table cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              {fields.map((element) => <th scope="col" key={ element }>{element}</th>)}
            </tr>
          </thead>
          <tbody>
            {expenses.map((element, index) => {
              const askValue = Number(element.exchangeRates[element.currency].ask);
              return (
                <tr key={ element.id } id={ element.id }>
                  <td>{ element.description }</td>
                  <td>{ element.tag }</td>
                  <td>{ element.method }</td>
                  <td>{ element.value }</td>
                  <td>{ element.exchangeRates[element.currency].name }</td>
                  <td>{ askValue.toFixed(2) }</td>
                  <td>{(element.value * askValue).toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <button
                      onClick={ () => deleteExp(index) }
                      type="button"
                      data-testid="delete-btn"
                      className="trashcan"
                    >
                      <img
                        src={ trashcan }
                        width="27"
                        alt="trashcan"
                      />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currencyFunction: () => dispatch(fetchCurrency()),
  newApiFunction: (expense) => dispatch(newCurrency(expense)),
  deleteExp: (id) => dispatch(deleteExpense(id)),
});

const mapStateToProps = (state) => ({
  user: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
  newApiFunction: PropTypes.func.isRequired,
  currencyFunction: PropTypes.func.isRequired,
  deleteExp: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
