import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './FormWallet.css';

import { addWalletThunk, editWalletThunk, fetchCurrencies } from '../actions';

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
    this.showEditingValuesInputs = this.showEditingValuesInputs.bind(this);

    this.state = {
      currenciesKeys: [],
      inputEditingOK: false,
      expense: {
        value: '',
        description: '',
        currency: '',
        method: '',
        tag: '',
      },
    };
  }

  componentDidMount() {
    this.callFetchCurrencies();
  }

  async callFetchCurrencies() {
    const { getCurrencies } = this.props;
    const resultApi = await getCurrencies(); // props that Call Api
    const myCurrencies = Object.keys(resultApi.currencies);
    const myCurrenciesWithoutUSDT = myCurrencies.filter((item) => item !== 'USDT');
    this.setState({ currenciesKeys: myCurrenciesWithoutUSDT });
  }

  async clickAddWallet() {
    const { expense } = this.state;
    const { newWallet, idEditing, updateWallet, expenses } = this.props;

    if (idEditing < 0) {
      await newWallet(expense);
    } else {
      await updateWallet(expenses, expense, idEditing);
    }
    this.setState(
      {
        inputEditingOK: false,
        expense: { ...expense,
          value: '',
          description: '',
          currency: '',
          method: '',
          tag: '',
        },
      },
    );
  }

  handleChange({ name, value }) {
    const { expense } = this.state;
    this.setState({ expense: { ...expense, [name]: value } });
  }

  showEditingValuesInputs() {
    const { expense } = this.state;
    const { expenses, idEditing } = this.props;
    const { value, description, currency, method, tag } = expenses[idEditing];
    this.setState({
      inputEditingOK: true,
      expense: { ...expense, value, description, currency, method, tag } });
  }

  // **********************************
  // ******** INPUTS DO FORM **********
  showInputValue({ expense }) {
    return (
      <input
        className="input-form"
        name="value"
        placeholder="Valor"
        type="text"
        value={ expense.value }
        onChange={ (e) => this.handleChange(e.target) }
        data-testid="value-input"
      />
    );
  }

  showInputDescription({ expense }) {
    return (
      <input
        className="input-form"
        name="description"
        placeholder="Descrição"
        type="text"
        value={ expense.description }
        onChange={ (e) => this.handleChange(e.target) }
        data-testid="description-input"
      />
    );
  }

  showInputCurrency({ expense }) {
    const { currenciesKeys } = this.state;
    const { idEditing } = this.props;
    return (
      <select
        className="input-form"
        data-testid="currency-input"
        name="currency"
        id="currency"
        value={ (idEditing < 0 && expense.currency === '')
          ? 'noSelect' : expense.currency }
        // value={ expense.currency }
        onChange={ (e) => this.handleChange(e.target) }
      >
        <option disabled selected value="noSelect">-- Selecione uma Moeda --</option>
        { currenciesKeys.map((item) => (
          <option key={ item } data-testid={ item } value={ item }>
            { item }
          </option>
        ))}
      </select>
    );
  }

  showInputPayment({ expense }) {
    const { idEditing } = this.props;
    return (
      <select
        className="input-form"
        name="method"
        data-testid="method-input"
        value={ (idEditing < 0 && expense.method === '')
          ? 'noSelect' : expense.method }
        // value={ expense.method }
        onChange={ (e) => this.handleChange(e.target) }
      >
        <option disabled selected value="noSelect">-- Selecione um Pagamento --</option>
        <option value="Dinheiro">Dinheiro</option>
        <option value="Cartão de crédito">Cartão de crédito</option>
        <option value="Cartão de débito">Cartão de débito</option>
      </select>
    );
  }

  showInputTag({ expense }) {
    const { idEditing } = this.props;
    return (
      <select
        className="input-form"
        name="tag"
        data-testid="tag-input"
        value={ (idEditing < 0 && expense.tag === '')
          ? 'noSelect' : expense.tag }
        // value={ expense.tag }
        onChange={ (e) => this.handleChange(e.target) }
      >
        <option disabled selected value="noSelect">-- Selecione uma Categoria --</option>
        <option value="Alimentação">Alimentação</option>
        <option value="Lazer">Lazer</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Transporte">Transporte</option>
        <option value="Saúde">Saúde</option>
      </select>
    );
  }

  render() {
    const { isFetching, idEditing } = this.props;
    const { inputEditingOK } = this.state;
    if (idEditing >= 0 && !inputEditingOK) this.showEditingValuesInputs();
    return (
      isFetching ? <p>Loading...</p> : (
        <div
          className="form-Wallet"
          style={ { background: (idEditing < 0) ? 'balck' : 'yellow' } }
        >
          <form>
            { this.showInputValue(this.state) }
            { this.showInputDescription(this.state) }
            { this.showInputCurrency(this.state) }
            { this.showInputPayment(this.state) }
            { this.showInputTag(this.state) }
            <button
              type="button"
              onClick={ () => this.clickAddWallet() }
              className="button-form"
            >
              { (idEditing < 0) ? 'Adicionar despesa' : 'Editar despesa' }
            </button>
          </form>
        </div>
      )
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  {
    newWallet: (expense) => dispatch(addWalletThunk(expense)),
    updateWallet:
      (expenses, expense, id) => dispatch(editWalletThunk(expenses, expense, id)),
    getCurrencies: () => dispatch(fetchCurrencies()),
  }
);

const mapStateToProps = (state) => ({
  isFetching: state.wallet.isFetching,
  idEditing: state.wallet.idEditing,
  expenses: state.wallet.expenses,
});

FormWallet.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  idEditing: PropTypes.bool.isRequired,
  newWallet: PropTypes.func.isRequired,
  updateWallet: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);
