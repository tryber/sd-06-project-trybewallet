import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchCurrencies as fetchCurrenciesThunk, saveFormExpenses, fetchAPIExpenses } from '../actions';

class ExpenseAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      currency: '',
      method: '',
      tag: '',
      description: '',
      id: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSaveExpenses = this.handleSaveExpenses.bind(this);
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  handleChange(event, name) {
    this.setState({ [name]: event.target.value });
  }

  handleSaveExpenses() {
    const { expenses, fetchAPIExpenses } = this.props;
    // this.setState((previousID) => ({
    //   id: previousID.id + 1 }));
    // expenses(this.state);
    fetchAPIExpenses(this.state);
    this.setState((previousState) => (
      // console.log('teste'),
      { ...previousState,
        id: previousState.id + 1,
        value: 0 }
    ));
  }

  render() {
    const { currencies } = this.props;
    const { currency } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="value-input">
            Valor:
            <input
              id="value-input"
              data-testid="value-input"
              value={this.state.value}
              onChange={ (event) => this.handleChange(event, 'value') }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              id="currency-input"
              data-testid="currency-input"
              defaultValue="Selecione"
              onChange={ (event) => this.handleChange(event, 'currency') }
            >
              <option disabled value="Selecione">Selecione</option>
              {currencies.filter((usdt) => (
                usdt !== 'USDT'))
                .map((moeda, index) => (
                  <option
                    key={ index }
                    data-testid={ moeda }
                    value={ moeda }
                  >
                    {moeda}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="method-input">
            Mode de Pagamento:
            <select
              id="method-input"
              data-testid="method-input"
              defaultValue="Selecione"
              onChange={ (event) => this.handleChange(event, 'method') }
            >
              <option disabled value="Selecione">Selecione</option>
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Tag:
            <select
              id="tag-input"
              data-testid="tag-input"
              defaultValue="Selecione"
              onChange={ (event) => this.handleChange(event, 'tag') }
            >
              <option disabled value="Selecione">Selecione</option>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <input
            data-testid="description-input"
            onChange={ (event) => this.handleChange(event, 'description') }
          />
        </form>
        <div>
          <button
            type="button"
            onClick={ this.handleSaveExpenses }
          >
            Adicionar despesa
          </button>
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesThunk()),
  fetchAPIExpenses: (state) => dispatch(fetchAPIExpenses(state)),
});

ExpenseAddForm.propTypes = {
  currencies: PropTypes.shape.isRequired,
  fetchCurrencies: PropTypes.func.isRequired,
  expenses: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseAddForm);
