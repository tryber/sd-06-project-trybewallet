import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, addExpenses } from '../actions/wallet';

import deletar from '../img/deletar.png';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      totalExpense: 0,
      expenses: {
        method: '',
        tag: '',
        description: '',
        currency: '',
        value: '',
        exchangeRates: {},
      },
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { apiFetch } = this.props;
    apiFetch();
  }

  handleChange() {
    const { apiFetch } = this.props;
    apiFetch();
    const { addExp } = this.props;
    addExp(this.state);
  }

  handleInput(event) {
    const { target: { name, value } } = event;
    this.setState((state) => ({ ...state, expenses: { [name]: value } }));
  }

  render() {
    const { _Email, currencies, totalExpense } = this.props;
    console.log('currencies', typeof currencies);
    const filteredCurrencies = Object.keys(currencies).filter((coin) => coin !== 'USDT');
    return (
      <div>
        <div data-testid="email-field">{ _Email }</div>
        <div data-testid="total-field">
          {totalExpense}
        </div>
        <div>
          <select data-testid="header-currency-field">
            <option value="BRL">BRL</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <form>
          <label htmlFor="valor-despesa">
            Valor da Despesa:
            <input
              type="text"
              data-testid="value-input"
              onChange={ this.handleInput }
              name="value"
            />
          </label>
          <div className="separator" />
          <label htmlFor="despesa">
            Descrição da Despesa:
            <input
              type="text"
              data-testid="description-input"
              onChange={ this.handleInput }
              name="description"
            />
          </label>
          <div className="separator" />
          <label htmlFor="registro">
            Registro da Moeda:
            <select
              data-testid="currency-input"
              onChange={ this.handleInput }
              name="currency"
            >
              {filteredCurrencies.map((currency) => (
                <option
                  value={ currency }
                  key={ currency }
                  data-testid={ currency }
                >
                  {currency}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="pagamento">
            Método de pagamento:
            <select
              data-testid="method-input"
              onChange={ this.handleInput }
              name="method"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tipo-despesa">
            Categoria de Despesa:
            <select data-testid="tag-input" onChange={ this.handleInput } name="tag">
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleChange }>Adicionar Despesa</button>
        </form>
        <table className="centered">
          <thead>
            <tr>
              <th data-field="id">Descrição</th>
              <th data-field="name">Tag</th>
              <th data-field="price">Método de Pagamento</th>
              <th data-field="price">Valor</th>
              <th data-field="price">Moeda</th>
              <th data-field="price">Câmbio utilizado</th>
              <th data-field="price">Valor convertido</th>
              <th data-field="price">Moeda de conversão</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alvin</td>
              <td>Eclair</td>
              <td>.87</td>
            </tr>
            <tr>
              <td>Alan</td>
              <td>Jellybean</td>
              <td>.76</td>
            </tr>
            <tr>
              <td>Jonathan</td>
              <td>Lollipop</td>
              <td>.00</td>
            </tr>
          </tbody>
        </table>
        <div>
          <button type="button" data-testid="delete-btn">
            <img
              src={ deletar }
              alt="excluir"
              style={ { width: 40, borderRadius: 50 } }
            />
          </button>
          <button
            type="button"
            data-testid="edit-btn"
            style={ { height: 40, borderRadius: 10 } }
          >
            Editar despesa
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  apiFetch: () => dispatch(fetchAPI()),
  addExp: (expense) => dispatch(addExpenses(expense)),
});

const mapStateToProps = (state) => ({
  _Email: state.user.email,
  currencies: state.wallet.currencies,
  totalExpense: state.wallet.totalExpense,
});

Wallet.propTypes = {
  _Email: PropTypes.string.isRequired,
  currencies: PropTypes.shape.isRequired,
  apiFetch: PropTypes.func.isRequired,
  totalExpense: PropTypes.number.isRequired,
  addExp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
