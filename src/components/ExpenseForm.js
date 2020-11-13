import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAwesomeAPI, saveExpense } from '../actions';

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      id: 0,
      value: 0,
      currency: '',
      method: '',
      description: '',
      tag: '',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    // Traz a lista de moedas da requisição
    const { fetchAPI } = this.props;
    fetchAPI();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { fetchAPI, save } = this.props;
    const { id } = this.state;
    const exchangeRatesFromAPI = await fetchAPI();

    this.setState({ exchangeRates: exchangeRatesFromAPI.currencies });
    save(this.state);

    const nextId = id + 1;
    this.setState({
      id: nextId,
      value: 0,
      currency: '',
      method: '',
      description: '',
      tag: '',
      exchangeRates: {},
    });
  }

  render() {
    const { handleChange, props, state } = this;
    const { currencies } = props;
    const { value, currency, method, description, tag } = state;

    const currenciesDropdownList = [(
      <option
        key={ currencies.length + 1 }
        value=""
        disabled
      >
        Escolha uma opção
      </option>
    )];

    currenciesDropdownList.push(currencies.map((currencyFetched, index) => (
      <option
        key={ index }
        data-testid={ currencyFetched }
        value={ currencyFetched }
      >
        { currencyFetched }
      </option>
    )));

    return (
      <form onSubmit={ this.handleSubmit } className="expense-form">
        {'Valor: '}
        <input
          data-testid="value-input"
          type="number"
          min={ 0 }
          name="value"
          value={ value }
          onChange={ handleChange }
        />

        {'Moeda: '}
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ handleChange }
        >
          {currenciesDropdownList}
        </select>

        {' Método de pagamento: '}
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ handleChange }
        >
          <option value="" disabled>Escolha uma opção</option>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        {'Tag: '}
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ handleChange }
        >
          <option value="" disabled>Escolha uma opção</option>
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        {' Descrição: '}
        <input
          data-testid="description-input"
          type="text"
          name="description"
          value={ description }
          onChange={ handleChange }
        />

        <button
          type="submit"
          disabled={
            !value || !currency || !method || !tag || !description ? 'disabled' : false
          }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: () => dispatch(fetchAwesomeAPI()),
  save: (e) => dispatch(saveExpense(e)),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(ExpenseForm);

ExpenseForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchAPI: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
};
