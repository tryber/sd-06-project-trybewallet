import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, fetchRates } from '../actions';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChanges = this.handleChanges.bind(this);

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { currencyAPI } = this.props;
    currencyAPI();
  }

  handleChanges({ target }) {
    const { id, value } = target;

    if (target.tagName === 'INPUT') {
      this.setState({ [id]: value });
    } else {
      const getSelect = document.querySelector(`#${id}`);
      this.setState({
        [id]: getSelect.options[getSelect.selectedIndex].value,
      });
    }
  }

  handleClick() {
    const { id, value, description, currency, method, tag } = this.state;
    const { saveExpenses } = this.props;
    const expense = { id, value, description, currency, method, tag };

    this.setState((prevState) => ({ id: prevState.id + 1 }));
    saveExpenses(expense);
  }

  render() {
    const { currencies } = this.props;
    const { value } = this.state;
    return (
      <form>
        <fieldset>
          <label htmlFor="value">
            Valor da despesa:
            <input
              name="value"
              id="value"
              type="number"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChanges }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              name="description"
              id="description"
              type="text"
              data-testid="description-input"
              onChange={ this.handleChanges }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChanges }
            >
              {currencies.map((currency) => (
                <option
                  key={ currency }
                  data-testid={ currency }
                  value={ currency }
                >
                  {currency !== 'USDT' ? currency : null}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              defaultValue="default"
              onChange={ this.handleChanges }
            >
              <option value="default">Escolha uma opção</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              defaultValue="default"
              onChange={ this.handleChanges }
            >
              <option value="default">Escolha uma opção</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.handleClick }>Adicionar despesa</button>
        </fieldset>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currencyAPI: () => dispatch(fetchApi()),
  saveExpenses: (expenses) => dispatch(fetchRates(expenses)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);

ExpenseForm.propTypes = {
  saveExpenses: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape(PropTypes.string)).isRequired,
  currencyAPI: PropTypes.func.isRequired,
};
