import React from 'react';
import { connect } from 'react-redux';
import { apiCurrencies, apiExpense } from '../actions';
import { paymentOpt, categoryOpt } from '../services/helper';

class WalletForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.handleInputs = this.handleInputs.bind(this);
    this.handleOptions = this.handleOptions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const { dispatchGetAll } = this.props;
    dispatchGetAll();
  }

  handleInputs(event) {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  }

  handleOptions(value, id) {
    this.setState({ [id]: value });
  }

  handleSubmit() {
    const { dispatchExchange } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const state = { value, description, currency, method, tag };
    dispatchExchange(state);
  }

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    if (currencies) {
      return (
        <form className="wallet-page">
          <input
            data-testid="value-input"
            type="number"
            placeholder="Valor da despesa"
            id="value"
            onChange={ this.handleInputs }
            value={ value }
          />
          <input
            type="text"
            data-testid="description-input"
            placeholder="Descrição da despesa"
            id="description"
            onChange={ this.handleInputs }
          />

          <select data-testid="currency-input" id="currency" onChange={ (e) => this.handleOptions(e.target.value, e.target.id) }>
            <option disabled selected>Moeda</option>
            {currencies.map((item) => (
              <option key={ item } data-testid={ item } value={ item }>
                { item }
              </option>
            ))}
          </select>
          <select data-testid="method-input" id="method" onChange={ (e) => this.handleOptions(e.target.value, e.target.id) }>
            <option disabled selected>Método de pagamento</option>
            {paymentOpt.map((item) => (
              <option key={ item } data-testid={ item } value={ item }>
                { item }
              </option>
            ))}
          </select>
          <select data-testid="tag-input" id="tag" onChange={ (e) => this.handleOptions(e.target.value, e.target.id) }>
            <option disabled selected>Categoria</option>
            {categoryOpt.map((item) => (
              <option key={ item } data-testid={ item } value={ item }>
                { item }
              </option>
            ))}
          </select>
          <button type="button" onClick={ this.handleSubmit }>Adicionar despesa</button>
        </form>
      );
    }
    if (!currencies) {
      return <div>Oi</div>;
    }
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetAll: () => dispatch(apiCurrencies()),
  dispatchExchange: (expensesForm) => dispatch(apiExpense(expensesForm)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
