import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, registerExpense } from '../actions';
import { paymentMethods, tagOptions } from '../Components/walletHelpers';
import ExpensesTable from '../Components/tableExpenses';

class Wallet extends React.Component {
  //
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.handleInputs = this.handleInputs.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  componentDidMount() {
    const { dispatchFetchCurrencies } = this.props;
    dispatchFetchCurrencies();
  }

  handleInputs(event) {
    const { value, id } = event.target;
    if (event.target.tagName === 'INPUT') {
      this.setState({ [id]: value });
    } else {
      const { selectedIndex } = event.nativeEvent.target.options;
      const selectedOption = event.nativeEvent.target.options[selectedIndex].innerText;
      this.setState({ [id]: selectedOption });
    }
  }

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
    });
  }
  //

  render() {
    const { email, currencies } = this.props;
    const { value, description } = this.state;
    return (
      <div className="page-wallet">
        Carteira
        <header className="table-header">
          <span data-testid="email-field">
            {email}
          </span>
          <span data-testid="total-field">
            0
          </span>
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
            data-testid="currency-input"
            placeholder="Moeda"
            onChange={ this.handleInputs }
            id="currency"
          >
            <option disabled selected value>  Moeda  </option>
            {currencies.map((currency) => (
              <option
                key={ currency }
                value={ currency }
                data-testid={ currency }
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
            <option disabled selected value>  Tipo de Despesa  </option>
            {tagOptions.map((tag) => (
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
          >
            Adicionar despesa
          </button>
        </form>
        <ExpensesTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  //
  currencies: state.wallet.currencies,
  //
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  //
  dispatchFetchCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchSaveExpense: PropTypes.func.isRequired,
  //
};

//
const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCurrencies: () => dispatch(fetchCurrencies()),
  dispatchSaveExpense: (expenseData) => dispatch(registerExpense(expenseData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

//
// export default connect(mapStateToProps, null)(Wallet);

// export default Wallet;

// class Wallet extends React.Component {
//   render() {
//     const { nomeQueEuQuiser } = this.props;
//     return <div>{ nomeQueEuQuiser }</div>;
//   }
// }

// const mapStateToProps = (state) => ({
//   nomeQueEuQuiser: state.wallet.helloWorld,
// });

// export default connect(
//   mapStateToProps,
// )(Wallet);
