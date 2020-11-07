import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchApi, expenseAction } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);
    this.currOptions = this.currOptions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,
      exchangeRates: [],
    };
  }

  componentDidMount() {
    const { api } = this.props;
    api();
  }

  handleState({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit(event) {
    const { currencies, newExpense, api, expenses } = this.props;
    event.preventDefault();
    api();
    this.setState({
      exchangeRates: { ...currencies },
      id: expenses.length,
    }, () => newExpense(this.state));
  }

  currOptions() {
    const { currencies } = this.props;
    return (
      Object.keys(currencies).filter((key) => key !== 'USDT')
        .map((curr) => (
          <option key={ curr } value={ curr } data-testid={ curr }>{ curr }</option>)));
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value, description, method, tag, currency } = this.state;
    const curExchange = 'BRL';
    const total = expenses.length ? Math.round(expenses
      .reduce((acc, crr) => acc + crr.value * crr.exchangeRates[crr.currency].ask, 0)
      * 100) / 100 : 0;
    const tableFields = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda',
      'Câmbio utilizado', 'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];
    return (
      <div>
        TrybeWallet
        <div>
          <p data-testid="email-field">{ `Seu email é: ${email}` }</p>
          <p data-testid="total-field">{ `Despesa total: ${total}` }</p>
          <p data-testid="header-currency-field">{ curExchange }</p>
        </div>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              name="value"
              id="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleState }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              name="description"
              id="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleState }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleState }
            >
              {(currencies) ? this.currOptions() : <option>Loading...</option>}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleState }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleState }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <div>
            <button type="submit">Adicionar despesa</button>
          </div>
        </form>
        <div>
          <table>
            <thead>
              <tr>
                {tableFields.map((title) => <th key={ title }>{ title }</th>)}
              </tr>
            </thead>
            <tbody>
              {expenses.map((item) => {
                const crrExchange = item.exchangeRates[item.currency];
                const expenseValue = Number(crrExchange.ask);
                const crrName = crrExchange.name;
                const convertedValue = expenseValue * item.value;
                return (
                  <tr key={ item.id }>
                    <td>{ item.description }</td>
                    <td>{ item.tag }</td>
                    <td>{ item.method }</td>
                    <td>{ item.value }</td>
                    <td>{ expenseValue.toFixed(2) }</td>
                    <td>{ crrName }</td>
                    <td>{ convertedValue.toFixed(2) }</td>
                    <td>Real</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  api: () => dispatch(fetchApi()),
  newExpense: (state) => dispatch(expenseAction(state)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  api: PropTypes.func.isRequired,
  newExpense: PropTypes.func.isRequired,
  currencies: PropTypes.objectOf(PropTypes.object).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
