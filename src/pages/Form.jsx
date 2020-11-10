import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import CurrencySearcher from '../service/currencyAPI';
import { updateExpenses } from '../actions/actionsCreator';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      description: '',
      method: 'Cartão de crédito',
      currency: 'USD',
      tag: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput({ name, value }) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { sendExpense } = this.props;
    const { value, description, method, tag, currency } = this.state;
    sendExpense({ value, description, method, tag, currency });
    this.setState({
      value: 0,
      description: '',
      method: 'Cartão de crédito',
      currency: 'USD',
      tag: '',
    });
  }

  render() {
    const { value, description, method, tag, currency } = this.state;
    const { expenses } = this.props;

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input
            name="value"
            type="number"
            value={ value }
            placeholder="Individual expense"
            data-testid="value-input"
            onChange={ ({ target }) => this.handleInput(target) }
          />
          <input
            name="description"
            type="text"
            placeholder="Describe your expense"
            data-testid="description-input"
            value={ description }
            onChange={ ({ target }) => this.handleInput(target) }
          />
          <CurrencySearcher name="currency" value={ currency } onChange={ ({ target }) => this.handleInput(target) } />
          <select
            name="method"
            value={ method }
            data-testid="method-input"
            onChange={ ({ target }) => this.handleInput(target) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>

          <select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ ({ target }) => this.handleInput(target) }
          >
            <option value="Alimentacao">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saude">Saúde</option>
          </select>

          <button type="submit">Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendExpense: ({ value, description, method, tag, currency }) => (dispatch(updateExpenses({ value, description, method, tag, currency }))),
    // dispatch envia a action pra store
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
