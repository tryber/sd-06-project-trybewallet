import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveExpense, fetchData } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.addExpense = this.addExpense.bind(this);
    this.state = {
      total: 0,
      value: 0,
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentação',
      description: '',
    };
  }

  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  addExpense() {
    const { fetch, dataFetch, globalExpenses, expenseToGlobal } = this.props;
    fetch();
    const {
      total,
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    const newExpense = {
      id: globalExpenses.length,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates: { ...dataFetch },
    };

    expenseToGlobal(newExpense);

    const totValue = total + (Number(value) * Number(dataFetch[currency].ask));

    this.setState({
      total: totValue,
      value: 0,
      currency: 'USD',
      method: 'dinheiro',
      tag: 'alimentação',
      description: '',
    });
  }

  render() {
    const { total, value } = this.state;
    const { user, dataFetch } = this.props;
    const currencies = (dataFetch)
      ? Object.keys(dataFetch).filter((curr) => curr !== 'USDT')
      : ['USD'];
    return (
      <div>
        <header>
          <span data-testid="email-field">{ user }</span>
          <input
            type="text"
            value={ total }
            data-testid="total-field"
          />
          <select data-testid="header-currency-field">
            <option value="BRL">BRL</option>
          </select>
        </header>
        <form>
          <input
            name="value"
            value={ value }
            type="text"
            data-testid="value-input"
            onChange={ (e) => this.handleChange(e) }
          />
          <input
            name="description"
            type="text"
            data-testid="description-input"
            onChange={ (e) => this.handleChange(e) }
          />
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ (e) => this.handleChange(e) }
          >
            { currencies.map((curr) => (
              <option
                key={ curr }
                data-testid={ curr }
                value={ curr }
              >
                { curr }
              </option>
            )) }
          </select>
          <select
            data-testid="method-input"
            name="method"
            onChange={ (e) => this.handleChange(e) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ (e) => this.handleChange(e) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
          <button onClick={ this.addExpense } type="button">Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  loading: state.wallet.loading,
  globalExpenses: state.wallet.expenses,
  dataFetch: state.wallet.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetch: () => dispatch(fetchData),
  expenseToGlobal: (expenses) => dispatch(saveExpense(expenses)),
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired,
  dataFetch: PropTypes.objectOf(String).isRequired,
  globalExpenses: PropTypes.arrayOf(Object).isRequired,
  expenseToGlobal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
