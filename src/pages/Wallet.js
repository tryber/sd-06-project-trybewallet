import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiMoney, newFetch, deleteExpenses } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
  }

  componentDidMount() {
    const { myMoney, currencies } = this.props;
    myMoney(currencies);
  }

  onSubmit(event) {
    event.preventDefault();
    const { value, description, currency, method, tag, id } = this.state;
    const stateTotal = { value, description, currency, method, tag, id };
    const { myNewFetch } = this.props;
    this.setState((Previous) => ({ id: Previous.id + 1 }));
    myNewFetch(stateTotal);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  deleteButton() {
    /* const { myDeleteExpenses } = this.props;
    myDeleteExpenses() */
  }

  render() {
    const { email, currencies, expensesValue } = this.props;
    const pagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tag = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const tableHeaders = [
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
    /* totalValue feito com a ajuda do colega William pelo SLACK */
    const totalValue = expensesValue.length ? Math.round(expensesValue
      .reduce((acc, cur) => acc + cur.value * cur.exchangeRates[cur.currency]
        .ask, 0) * 100) / 100 : 0;
    return (
      <div>
        <header>
          <p data-testid="email-field">
            Email:
            { email }
          </p>
          <p data-testid="total-field">
            Despesas totais: R$
            { `${totalValue}` }
          </p>
          <p data-testid="header-currency-field">Câmbio: BRL</p>
        </header>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              id="value"
              name="value"
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              id="description"
              name="description"
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select
              data-testid="currency-input"
              id="moeda"
              name="currency"
              onChange={ this.handleChange }
            >
              <option value="" key="selecione" selected>Selecione</option>
              { currencies.map((m) => (
                <option key={ m } value={ m } data-testid={ m }>{ m }</option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de Pagamento:
            <select
              data-testid="method-input"
              id="method"
              name="method"
              onChange={ this.handleChange }
            >
              <option value="" key="selecione" selected>Selecione</option>
              { pagamento.map((p) => (
                <option key={ p } value={ p }>{ p }</option>
              ))}
            </select>
          </label>
          <label htmlFor="tag">
            Tag:
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              onChange={ this.handleChange }
            >
              <option value="" key="selecione" selected>Selecione</option>
              { tag.map((t) => (
                <option key={ t } value={ t }>{ t }</option>
              ))}
            </select>
          </label>
          <button type="submit" onClick={ this.onSubmit }>Adicionar despesa</button>
        </form>
        <table>
          <thead>
            <tr>
              {tableHeaders.map((el) => <th key={ el }>{ el }</th>)}
            </tr>
          </thead>
          <tbody>
            {expensesValue.map((e) => (
              <tr key={ e }>
                <td>{e.description}</td>
                <td>{e.tag}</td>
                <td>{e.method}</td>
                <td>{e.value}</td>
                <td>{parseFloat(e.exchangeRates[e.currency].ask).toFixed(2)}</td>
                <td>{e.exchangeRates[e.currency].name}</td>
                <td>{(e.value * e.exchangeRates[e.currency].ask).toFixed(2)}</td>
                <td>Real</td>
                <td>{e.id}</td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ this.deleteButton }
                >
                  Deletar
                </button>
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
  currencies: state.wallet.currencies,
  expensesValue: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  myMoney: (cotacaoMoeda) => dispatch(apiMoney(cotacaoMoeda)),
  myNewFetch: (allState) => dispatch(newFetch(allState)),
  myDeleteExpenses: (despesa) => dispatch(deleteExpenses(despesa)),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
  expensesValue: PropTypes.arrayOf(Object).isRequired,
  myMoney: PropTypes.func.isRequired,
  myNewFetch: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
