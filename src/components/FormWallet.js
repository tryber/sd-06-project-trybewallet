import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExpenseThunk, fetchCurrencies } from '../actions';
import '../css/Wallet.css';

// Esse é o arquivo de formulário em que estão todas as opções de filtro.

class FormWallet extends React.Component {
  constructor() {
    super();

    this.state = {
      expense: {
        id: 0,
        value: '0',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // Faz a requisição da API logo na montagem da página.
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  // Atualiza o ID de cada despesa para cumprir o requisito que auxilia
  // em encontrar cada linha para fazer remoção/edição.
  componentDidUpdate(prevProps) {
    const { expenses } = this.props;
    const { expense } = this.state;
    const updateID = () => {
      this.setState({
        expense: {
          ...expense,
          id: expenses.length,
        },
      });
    };
    if (prevProps.expenses.length !== expenses.length) {
      updateID();
    }
  }

  // Função padrão que está no onChange de cada input para pegar o target
  // de cada elemento digitado/selecionado.
  handleChange(e) {
    const { name, value } = e.target;
    const { expense } = this.state;
    this.setState({
      expense: {
        ...expense,
        [name]: value,
      },
    });
  }

  render() {
    const payMeth = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const expCat = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { currencies } = this.props;
    const { expense } = this.state;
    const { value, description, method, currency, tag } = expense;
    const { addExpense } = this.props;

    return (
      <form className="form">
        <input
          id="value"
          name="value"
          value={ value }
          onChange={ this.handleChange }
          placeholder="Valor"
          data-testid="value-input"
        />
        <input
          id="description"
          name="description"
          value={ description }
          onChange={ this.handleChange }
          placeholder="Descrição"
          data-testid="description-input"
        />
        <select
          id="currency"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
          data-testid="currency-input"
        >
          {currencies
            .map((moeda) => (
              <option data-testid={ moeda } value={ moeda } key={ moeda }>
                { moeda}
              </option>
            ))}
        </select>
        <select
          id="method"
          name="method"
          value={ method }
          onChange={ this.handleChange }
          data-testid="method-input"
        >
          {payMeth
            .map((payMethod) => (
              <option value={ payMethod } key={ payMethod }>
                { payMethod}
              </option>
            ))}
        </select>
        <select
          id="tag"
          name="tag"
          value={ tag }
          onChange={ this.handleChange }
          data-testid="tag-input"
        >
          {expCat.map((category) => (
            <option value={ category } key={ category }>
              { category}
            </option>
          ))}
        </select>
        <button
          className="wallet-button"
          type="button"
          onClick={ () => addExpense(expense) }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  addExpense: (expense) => dispatch(addExpenseThunk(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormWallet);

FormWallet.propTypes = {
  addExpense: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
};
