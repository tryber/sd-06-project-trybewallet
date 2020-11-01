import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fetchCurrency } from '../services/API'
import { connect } from 'react-redux';
import { wallet } from '../actions';

class Form extends Component {
  constructor() {
    super();

    this.pickUpCoins = this.pickUpCoins.bind(this);
    this.savingFormEntries = this.savingFormEntries.bind(this);

    this.state = {
      coins: [],
    };
  }

  componentDidMount() {
    this.pickUpCoins()
  }

  async pickUpCoins() {
    const res = await fetchCurrency();
    const coins = await Object.keys(res).filter(coin => coin !== 'USDT');
    this.setState({
      coins: coins,
    });
  }

  savingFormEntries({ target }) {
    console.log(target.name)
    this.setState({
      [target.name]: target.value,
    }); 
  }

  render() {
    const { formAction } = this.props;
    const { coins } = this.state;
    const { state } = this;

    return (
      <div>
        <form>
          <label htmlFor="input-value">
            Valor:
            <input
              name="value"
              onChange={ this.savingFormEntries }
              id="input-value"
              type="text"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              name="description"
              onChange={ this.savingFormEntries }
              id="description-input"
              type="text"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              name="currency"
              onChange={ this.savingFormEntries }
              id="currency-input"
              type="text"
              data-testid="currency-input"
            >
              { coins.map(coin =>
                <option
                  data-testid={ coin }
                  key={ coin }
            >
              { coin }
              </option>) }
          </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento:
            <select
              name="method"
              onChange={ this.savingFormEntries }
              id="method-input"
              type="text"
              data-testid="method-input"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Tag:
            <select
              name="tag"
              onChange={ this.savingFormEntries }
              id="tag-input"
              type="text"
              data-testid="tag-input"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
        <button onClick={ () => formAction([state]) } type="submit">Adicionar despesa</button>
      </div>
    );
  }
}

Form.propTypes = {
  formAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  formAction: (state) => dispatch(wallet(state)),
});

export default connect(null, mapDispatchToProps)(Form);
