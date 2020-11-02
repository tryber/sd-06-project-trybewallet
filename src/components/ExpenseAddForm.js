import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCurrencies } from '../actions';

class ExpenseAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valor: '',
      moeda: '',
      pagamento: '',
      tag: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetchCurrencies();
  }

  handleChange(event, name) {
    this.setState({ [name]: event.target.value });
  }

  handleSubmit(e) {
    // const { saveExpenses } = this.props;
    e.preventDefault();
    // saveExpenses();
  }

  render() {
    const { currencies } = this.props;
    const { valor, moeda, pagamento, tag } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="value-input">
          Valor:
          <input
            data-testid="value-input"
            onChange={ (event) => this.handleChange(event, valor) }
          />
        </label>
        <label htmlFor="currency-input">
          Moeda:
          <select
            data-testid="currency-input"
            onChange={ (event) => this.handleChange(event, moeda) }
          >
            {/* <option>Teste</option> */}
            {currencies.map((element, index) => (
              <option data-testid={ element } value={ element } key={ index }>
                {' '}
                {element}
                {' '}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="method-input">
          Mode de Pagamento:
          <select
            data-testid="method-input"
            onChange={ (event) => this.handleChange(event, pagamento) }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Tag:
          <select
            data-testid="tag-input"
            onChange={ (event) => this.handleChange(event, tag) }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button type="submit">Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

// const mapDispatchToProps = (dispatch) => ({
//   saveExpenses: (e) => dispatch(saveExpenses(e)),
// });
const mapDispatchToProps = (dispatch) => ({
  // login: (e) => dispatch(login(e)),
  fetchCurrencies: () => dispatch(fetchCurrencies()),
  // fetchCurrencies: () => dispatch(fetchCurrencies()),
});

ExpenseAddForm.propTypes = {
  currencies: PropTypes.shape.isRequired,
  // fetchCurrencies: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseAddForm);
