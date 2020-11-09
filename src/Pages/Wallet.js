import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchData } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
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
    const { fetchData } = this.props;
    fetchData();
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { expense } = this.state;
    this.setState({
      expense: {
        ...expense,
        [name]: value,
      },
    });
  }

  render() {
    const { email, expenses, currencies } = this.props;
    const { expense } = this.state;
    const { value, currency, method, tag, description } = expense;

    const expensesSum = expenses
      .reduce(((acc, curr) => acc + parseFloat((curr
        .exchangeRates[curr.currency].ask * curr.value).toFixed(2))), 0);

    return (
      <div>
        <nav className="user-info">
          <div>
            User:
            <span data-testid="email-field">
              {email}
            </span>
          </div>
          <div>
            Despesas: R$
            <span data-testid="total-field">
              {expensesSum}
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </nav>
        <div className="form">
          Valor:
          <input
            type="number"
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
          Moeda:
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            <option>Escolha</option>
            {currencies.map((e) => (
              <option data-testid={ e } key={ e }>{ e }</option>
            ))}
          </select>
          Pagamento:
          <select
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
          >
            <option>Escolha</option>
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
          Tag:
          <select
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option>Escolha</option>
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          Descrição:
          <input
            type="text"
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            // onClick={ this.addExpense }
          >
            Adicionar despesa
          </button>
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
  fetchData: () => dispatch(fetchData()),
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(Object).isRequired,
  fetchData: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
