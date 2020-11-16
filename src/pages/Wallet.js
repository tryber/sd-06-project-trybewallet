// 2. Crie uma página para sua carteira com as seguintes características:
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, registerExpense } from '../actions';
import { paymentMethods, tagExpenses } from '../Components/fieldFormAndTable';
import ExpensesTable from '../Components/spendTable';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      isDisabled: true,
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.verifyRequiredFields = this.verifyRequiredFields.bind(this);
  }

  // componentDidMount 1ª função a ser renderizada busca as moedas (despacha props para action)
  componentDidMount() {
    const { dispatchFetchCurrencies } = this.props;
    dispatchFetchCurrencies();
  }

  // Verificar e habilita botão "Adicionar despesas"
  verifyRequiredFields() {
    const { value, description, currency, method, tag } = this.state;

    const valueIsValid = value && value.length > 0 && value !== '0';
    const descriptionIsValid = description && description.length > 0;
    const currencyIsValid = currency && currency.length > 0;
    const methodIsValid = method && method.length > 0;
    const tagIsValid = tag && tag.length > 0;

    this.setState({ isDisabled: !(
      valueIsValid && descriptionIsValid && currencyIsValid && methodIsValid && tagIsValid
    ) });
  }

  // Seta as informações
  // Callback utilizada para atualizar estado imediatmente no inputs
  handleInputs(event) {
    const { value, id } = event.target;
    if (event.target.tagName === 'INPUT') {
      // Segundo paremetro setState espera uma Callback
      this.setState({ [id]: value }, () => {
        this.verifyRequiredFields();
      });
    } else {
      const { selectedIndex } = event.target.options;
      const selectedOption = event.target.options[selectedIndex].innerText;
      this.setState({ [id]: selectedOption }, () => {
        this.verifyRequiredFields();
      });
    }
  }

  // Adiciona despesas e desabilita botão "Adicionar despesas"
  handleButtonClick() {
    const { dispatchSaveExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const payload = { value, description, currency, method, tag };
    dispatchSaveExpense(payload);
    this.setState({
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    }, () => {
      this.verifyRequiredFields();
    });
  }

  render() {
    const { email, currencies } = this.props;
    const { value, description, isDisabled } = this.state;
    return (
      <section>
        Carteira
        <header>
          <span data-testid="email-field">
            {email}
          </span>
          <br />
          <span data-testid="total-field">
            0
          </span>
          <br />
          <span data-testid="header-currency-field">
            BRL
          </span>
        </header>
        <form>
          <br />
          <input
            data-testid="value-input"
            placeholder="Valor da despesa"
            onChange={ this.handleInputs }
            id="value"
            value={ value }
          />
          <br />
          <input
            data-testid="description-input"
            placeholder="Descrição da despesa"
            onChange={ this.handleInputs }
            id="description"
            value={ description }
          />
          <br />
          <select
            placeholder="Moeda"
            onChange={ this.handleInputs }
            id="currency"
            // data-testid="currency-input"
          >
            <option>  Selecione a Moeda  </option>
            {currencies.map((currency) => (
              <option
                key={ currency }
                value={ currency }
                data-testid="currency-input"

              >
                {currency !== 'USDT' ? currency : null}
              </option>))}
          </select>
          <br />
          <select
            data-testid="method-input"
            onChange={ this.handleInputs }
            id="method"
          >
            <option disabled selected value>  Forma de Pagamento  </option>
            {paymentMethods.map((method) => (
              <option
                key={ method }
                value={ method }
                data-testid={ method }
              >
                {method}
              </option>
            ))}
          </select>
          <br />
          <select
            data-testid="tag-input"
            onChange={ this.handleInputs }
            id="tag"
          >
            <option>  Tipo de Despesa  </option>
            {tagExpenses.map((tag) => (
              <option
                key={ tag }
                value={ tag }
                data-testid={ tag }
              >
                {tag}
              </option>
            ))}
          </select>
          <br />
          <button
            type="button"
            onClick={ this.handleButtonClick }
            disabled={ isDisabled }
          >
            Adicionar despesa
          </button>
        </form>
        <ExpensesTable />
      </section>
    );
  }
}

// mapStateToProps = mapeia as entidades armazenadas nos estados para props
const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  dispatchFetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchSaveExpense: PropTypes.func.isRequired,
};

// mapDispatchToProps = dispacha ação para o reducer através da action
const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCurrencies: () => dispatch(fetchCurrencies()),
  dispatchSaveExpense: (expenseData) => dispatch(registerExpense(expenseData)),
});

// connect = acessa store do Redux
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
