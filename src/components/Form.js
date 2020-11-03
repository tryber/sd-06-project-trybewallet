import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addExpensesThunk } from '../actions';
// import Table from './Table.js';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleClick() {
    const { addMoney } = this.props;
    addMoney(this.state);
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: '',
      tag: '',
    })
  }

  render() {
    const { currency } = this.props;
    const methods = ["Método de pagamento", "Dinheiro", "Cartão de crédito", "Cartão de débito"];
    const categories = ["Categorias", "Alimentação", "Lazer", "Trabalho", "Transporte", "Saúde"];

    return(
      <div>
        <div>
          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={this.state.value}
            placeholder="Digite sua despesa"
            onChange = {this.handleChange}
          />
          <input
            data-testid="description-input"
            type="text"
            name="description"
            placeholder="Descrição"
            value={this.state.description}
            onChange = {this.handleChange}
          />
          <select
            data-testid="currency-input"
            name="currency"
            onChange = {this.handleChange}
            value={this.state.currency}
          >
            {currency.map(moeda =>
              <option value={ moeda } data-testid={`${moeda}`}>{moeda}</option>
            )}
          </select>
          <select
            data-testid="method-input"
            name="method"
            value={this.state.method}
            onChange = {this.handleChange}
          >
            {methods.map(method =>
              <option>{method}</option>
            )}
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            value={this.state.tag}
            onChange = {this.handleChange}
          >
            {categories.map(category =>
              <option>{category}</option>
            )}
          </select>
          <button
            type='button'
            onClick={ this.handleClick }>
            Adicionar despesa
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currency: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addMoney: (state) => dispatch(addExpensesThunk(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
