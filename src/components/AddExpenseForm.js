import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendCurrencyThunk } from '../actions/index';

class AddExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      expenseValue: '',
      currency: '',
      payMethod: '',
      tag: '',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { sendCoins } = this.props;
    sendCoins();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { currencies } = this.props;
    const { expenseValue, currency, payMethod, tag, description } = this.state;
    return (
      <div>
        <form action="">

          <label htmlFor="value-input">
            Valor
            <input
              type="number"
              name="expenseValue"
              id="value-input"
              data-testid="value-input"
              value={ expenseValue }
              onChange={ (event) => this.handleChange(event) }
            />
          </label>

          <label htmlFor="currency-input">
            Moeda
            <select
              name="currency"
              id="currency-input"
              data-testid="currency-input"
              value={ currency }
              onChange={ (event) => this.handleChange(event) }
            >
              {/* <option value="">Selecione</option> */}
              {Object.keys(currencies)
                .filter((coin) => coin !== 'USDT')
                .map((coin, index) => <option key={ index } data-testid={ coin }>{ coin }</option>)}
            </select>
          </label>

          <label htmlFor="payMethod-input">
            Método de pagamento
            <select
              name="payMethod"
              id="payMethod-input"
              data-testid="payMethod-input"
              value={ payMethod }
              onChange={ (event) => this.handleChange(event) }
            >
              {/* <option value="">Selecione</option> */}
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag-input">
            Categoria
            <select
              name="tag"
              id="tag-input"
              data-testid="tag-input"
              value={ tag }
              onChange={ (event) => this.handleChange(event) }
            >
              {/* <option value="">Selecione</option> */}
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="description-input">
            Descrição
            <input
              type="text"
              name="description"
              id="description-input"
              data-testid="description-input"
              value={ description }
              onChange={ (event) => this.handleChange(event) }
            />
          </label>

          <button type="button">Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  sendCoins: () => dispatch(sendCurrencyThunk()),
});

AddExpenseForm.propTypes = {
  sendCoins: PropTypes.func.isRequired,
  currencies: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseForm);
