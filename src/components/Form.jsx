import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesAction,
  fetchExchangeRatesAction, editExpenseAction } from '../actions';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.loadElement = this.loadElement.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  componentDidUpdate(prevProps) {
    const { btnEditState } = this.props;
    if (btnEditState !== prevProps.btnEditState && btnEditState) {
      this.loadElement();
    }
  }

  loadElement() {
    const { elementEditState } = this.props;
    this.setState(elementEditState);
  }

  handleChange(event) {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleClick(event) {
    event.preventDefault();
    const { fetchExchangeRates } = this.props;
    const { id } = this.state;
    const index = id + 1;
    fetchExchangeRates(this.state);
    this.setState({
      id: index,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  handleEdit() {
    const { editExpense } = this.props;
    editExpense(this.state);
    this.setState({
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  render() {
    const { currenciesState, btnEditState } = this.props;
    const { value, description, currency, tag, method } = this.state;
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            data-testid="value-input"
            id="value"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            id="description"
            type="text"
            name="description"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            id="currency"
            type="text"
            name="currency"
            onChange={ this.handleChange }
            value={ currency }
          >
            {currenciesState.map((curr) => (
              <option
                key={ curr }
                value={ curr }
                data-testid={ curr }
              >
                {curr}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento:
          <select
            id="method"
            type="text"
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
            value={ method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria de despesa:
          <select
            id="tag"
            type="text"
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
            value={ tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        {
          (btnEditState)
            ? (
              <button type="button" onClick={ this.handleEdit }>
                Editar despesa
              </button>
            )
            : (
              <button onClick={ this.handleClick } type="button">
                Adicionar despesa
              </button>
            )
        }
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesState: state.wallet.currencies,
  btnEditState: state.wallet.btnEdit,
  elementEditState: state.wallet.elementEdit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesAction()),
  fetchExchangeRates: (objExpenses) => dispatch(fetchExchangeRatesAction(objExpenses)),
  editExpense: (objExpenses) => dispatch(editExpenseAction(objExpenses)),
});

Form.propTypes = {
  currenciesState: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  fetchExchangeRates: PropTypes.func.isRequired,
  btnEditState: PropTypes.bool.isRequired,
  editExpense: PropTypes.func.isRequired,
  elementEditState: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form);
