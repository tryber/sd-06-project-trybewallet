import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions';
import '../pages/wallet.css';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { selectCurrencies } = this.props;
    selectCurrencies();
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  // handleClick() {
  //   const { addExpense } = this.props;
  //   addExpense(this.state);
  // }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <form className="form">
        <label htmlFor="value">
          Valor
          <input
            type="text"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        Moeda
        <label htmlFor="currency">
          <select
            data-testid="currency-input"
            value={ currency }
            name="currency"
            onChange={ this.handleChange }
          >
            {currencies.map((cur) => (
              <option data-testid={ cur } value={ cur } key={ cur }>
                { cur }
              </option>
            ))}
          </select>
        </label>
        Método de pagamento
        <label htmlFor="method">
          <select
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        Tag
        <label htmlFor="tag">
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <label htmlFor="valor">
          Descrição
          <input
            type="text"
            data-testid="description-input"
            value={ description }
            name="description"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  selectCurrencies: () => dispatch(fetchCurrencies()),
});

Form.propTypes = {
  selectCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
  // addExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
