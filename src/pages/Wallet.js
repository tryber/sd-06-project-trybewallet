import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import AddExpense from '../components/AddExpense';
import { response as mockResponse } from '../tests/mockData';
import { storeCurrencies } from '../actions';

import '../css/Wallet.css';
import trybeLogo from '../imgs/trybe-logo.png';

window.fetch = async () => ({ json: () => Promise.resolve(mockResponse) });

function fetchApi() {
  const endpoint = 'https://economia.awesomeapi.com.br/json/all';
  return fetch(endpoint)
    .then((response) => response.json());
}

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    const { user: email } = this.props;

    this.state = {
      email,
    };
  }

  async componentDidMount() {
    const { dispatchCurrencies } = this.props;
    const currencies = await fetchApi();
    const currenciesArray = Object.keys(currencies)
      .filter((currency) => currency !== 'USDT');
    dispatchCurrencies(currenciesArray);
  }

  render() {
    const { email } = this.state;
    return (
      <div>
        <header>
          <section className="header">
            <img src={ trybeLogo } alt="Trybe logo" className="trybe-logo" />
            <section className="header-right">
              <div>
                Câmbio:
                <span data-testid="header-currency-field">
                  {' BRL' }
                </span>
              </div>
              <div>
                Total:
                <span data-testid="total-field">
                  { ' 0' }
                </span>
              </div>
              <h2 data-testid="email-field">{ email }</h2>
            </section>
          </section>
          <section className="header-form">
            <AddExpense />
          </section>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrencies: (currencies) => dispatch(storeCurrencies(currencies)),
});

Wallet.propTypes = {
  dispatchCurrencies: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
