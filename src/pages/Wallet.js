import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestCurrency } from '../actions/index';
import { requestCurrencyStore } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: '',
    }
    this.saveCurrency = this.saveCurrency.bind(this);
    this.handleSelectPay = this.handleSelectPay.bind(this);
    this.handleSelectTag = this.handleSelectTag.bind(this);
    this.handleSelectCurrency = this.handleSelectCurrency.bind(this);
  }

  componentDidMount() {
    const { requestCurrencyProps } = this.props;
    requestCurrencyProps();
  }

  sendInfos() {
    const { requestNewCurrencyProps } = this.props;
    requestNewCurrencyProps();
  }

  handleSelectCurrency(event) {
    const { target: { value } } = event;
    this.setState({
      currency: value,
    });
  }

  saveCurrency() {
    const { currenciesProps } = this.props;
    const nomesMoedas = Object.keys(currenciesProps);
    const currenciesSelect = nomesMoedas.filter((moeda) => moeda !== 'USDT');
    return (
      <label htmlFor="currency-input">
        Moeda:
        <select onChange={this.handleSelectCurrency} data-testid="currency-input">
          {currenciesSelect.map((moeda, index) => (
            <option value={moeda} data-testid={ moeda } key={ index }>
              {moeda}
            </option>))}
        </select>
      </label>
    );
  }

  handleSelectPay(event) {
    const { target: { value } } = event;
    this.setState({
      method: value,
    });
  }

  selectPay() {
    return (
      <label htmlFor="method-input">
        Modo de Pagamento:
        <select onChange={this.handleSelectPay} data-testid="method-input">
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  handleSelectTag(event) {
    const { target: { value } } = event;
    this.setState({
      tag: value,
    });
  }

  selectTag() {
    return (
      <label htmlFor="tag-input">
        Tag:
        <select onChange={this.handleSelectTag} data-testid="tag-input">
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  render() {
    const { emailStore } = this.props;
    return (
      <div>
        <header>
          <span data-testid="email-field">
            Email:
            { emailStore }
          </span>
          <span style={ { marginLeft: '20px' } } data-testid="total-field">
            Despesa Total: R$ 0
          </span>
          <span data-testid="header-currency-field">
            BRL
          </span>
        </header>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              onChange={ (event) => this.setState({ value: event.target.value }) }
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              onChange={ (event) => this.setState({ description: event.target.value }) }
            />
          </label>
          {this.saveCurrency()}
          {this.selectPay()}
          {this.selectTag()}
          <button type="button" onClick={() => this.sendInfos()}>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  emailStore: state.user.email,
  currenciesProps: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  requestCurrencyProps: () => dispatch(requestCurrency()),
  requestNewCurrencyProps: () => dispatch(requestCurrencyStore()),
});

Wallet.propTypes = {
  emailStore: PropTypes.string.isRequired,
  currenciesProps: PropTypes.arrayOf(Object).isRequired,
  requestCurrencyProps: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
