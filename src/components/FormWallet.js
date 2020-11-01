import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './FormWallet.css';

import { addWallet, fetchCurrencies } from '../actions';

class FormWallet extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.callFetchCurrencies = this.callFetchCurrencies.bind(this);
    this.showInputValue = this.showInputValue.bind(this);
    this.showInputDescription = this.showInputDescription.bind(this);
    this.showInputCurrency = this.showInputCurrency.bind(this);
    this.showInputPayment = this.showInputPayment.bind(this);
    this.showInputTag = this.showInputTag.bind(this);
    this.clickAddWallet = this.clickAddWallet.bind(this);

    this.state = {
      currenciesKeys: [],
      expense: {
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
        exchangeRates: {},
      },
    };
  }

  componentDidMount() {
    this.callFetchCurrencies();
  }

  async callFetchCurrencies() {
    const { expense } = this.state; // Local state
    const { getCurrencies } = this.props;
    const result = await getCurrencies();
    const myCurrencies = Object.keys(result.currencies);
    const currenciesWithoutUSDT = myCurrencies.filter((item) => item !== 'USDT');
    this.setState(
      {
        currenciesKeys: currenciesWithoutUSDT,
        expense: { ...expense, exchangeRates: result.currencies },
      },
    );
  }

  handleChange({ name, value }) {
    const { expense } = this.state;
    this.setState({ expense: { ...expense, [name]: value } });
  }

  showInputValue({ value }) {
    return (
      <label htmlFor="value">
        Valor
        <input
          name="value"
          type="text"
          value={ value }
          onChange={ (e) => this.handleChange(e.target) }
          data-testid="value-input"
        />
      </label>
    );
  }

  showInputDescription({ description }) {
    return (
      <label htmlFor="description">
        Descrição
        <input
          name="description"
          type="text"
          value={ description }
          onChange={ (e) => this.handleChange(e.target) }
          data-testid="description-input"
        />
      </label>
    );
  }

  showInputCurrency({ currency }) {
    const { currenciesKeys } = this.state;
    return (
      // <label htmlFor="currency">
      // Moeda do pagamento
      <select
        data-testid="currency-input"
        name="currency"
        id="currency"
        value={ currency }
        onChange={ (e) => this.handleChange(e.target) }
      >
        <option disabled selected value> -- Selecione uma Moeda -- </option>
        { currenciesKeys.map((item) => (
          <option key={ item } data-testid={ item } value={ item }>
            { item }
          </option>
        ))}
      </select>
      // </label>
    );
  }

  showInputPayment({ method }) {
    return (
      // <label htmlFor="method">
      //   Moeda do pagamento
      <select
        name="method"
        data-testid="method-input"
        value={ method }
        onChange={ (e) => this.handleChange(e.target) }
      >
        <option disabled selected value> -- Selecione um Pagamento -- </option>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
      // </label>
    );
  }

  showInputTag({ tag }) {
    return (
      // <label htmlFor="tag">
      //   Categoria
      <select
        name="tag"
        data-testid="tag-input"
        value={ tag }
        onChange={ (e) => this.handleChange(e.target) }
      >
        <option disabled selected value> -- Selecione uma Categoria -- </option>
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
      // </label>
    );
  }

  clickAddWallet() {
    const { expense } = this.state;
    const { newWallet } = this.props;

    this.callFetchCurrencies();
    newWallet(expense);
  }

  render() {
    const { isFetching } = this.props;
    return (
      isFetching ? <p>Loading...</p> : (
        <div className="form-Wallet">
          <form>
            { this.showInputValue(this.state) }
            { this.showInputDescription(this.state) }
            { this.showInputCurrency(this.state) }
            { this.showInputPayment(this.state) }
            { this.showInputTag(this.state) }
            <button
              type="button"
              onClick={ () => this.clickAddWallet() }
            >
              Adicionar despesa
            </button>
          </form>
        </div>
      )
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    newWallet: (expense) => dispatch(addWallet(expense)),
    getCurrencies: () => dispatch(fetchCurrencies()),
  }
);

const mapStateToProps = (state) => ({
  isFetching: state.wallet.isFetching,
  idEditing: state.wallet.idEditing,
});

FormWallet.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  // idEditing: PropTypes.bool.isRequired,
  newWallet: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
