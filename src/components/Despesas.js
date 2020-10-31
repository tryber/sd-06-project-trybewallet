import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { expenses, fetchCurrency } from '../actions';

class Despesas extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: '',
      currency: '',
      payment: '',
      tag: '',
      description: '',
    };
  }

  componentDidMount() {
    const { currency } = this.props;
    currency();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { currencies, expenses } = this.props;
    return(
      <section className="despesas-container">
        <label >
          Valor:
          <input name="value" required="required" type="number" data-testid="value-input" onChange={ this.handleChange }/>
        </label>
        <label>
          Moeda:
          <select name="currency" data-testid="currency-input" onChange={ this.handleChange }>
            <option selected="selected">Selecione</option>
            {currencies.filter((cur) => cur !== 'USDT')
              .map(curr => (<option key={curr} data-testid={curr}>{curr}</option>))}
          </select>
        </label>
        <label>
          Método de pagamento:
          <select data-testid="method-input" name="payment" required="required" onChange={ this.handleChange }>
            <option selected="selected">Selecione</option>
            <option >Dinheiro</option>
            <option >Cartão de crédito</option>
            <option >Cartão de débito</option>
          </select>
        </label>
        <label>
          Tag:
          <select name="tag" required="required" data-testid="tag-input" onChange={ this.handleChange }>
            <option selected="selected">Selecione</option>
            <option name="alimentacao">Alimentação</option>
            <option name="lazer">Lazer</option>
            <option name="trabalho">Trabalho</option>
            <option name="transporte">Transporte</option>
            <option name="saude">Saúde</option>
          </select>
        </label>
        <label>
          Descrição
          <input required="required" name="description" data-testid="description-input" onChange={ this.handleChange }/>
        </label>
        <button onClick={ () => expenses(this.state) }>Adicionar Despesa</button>
      </section>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  currency: () => dispatch(fetchCurrency()),
  expenses: (expense) => dispatch(expenses(expense))
})

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

Despesas.propTypes = { 
  currency: PropTypes.func.isRequired,
  currencies: PropTypes.array.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Despesas) 
