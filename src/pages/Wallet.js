import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchAction } from '../actions';
import fetchApi from '../services/mockAPI';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: undefined,
    };
  }

  componentDidMount() {
    this.handleFetch();
  }

  async handleFetch() {
    const result = await fetchApi();
    this.setState({
      currencies: Object.entries(result),
    });
  }

  render() {
    const { email } = this.props;
    const { currencies } = this.state;
    // if(currencies !== undefined){
    //   console.log(currencies[0][0]);
    // }
    return (
      <div>
        <header>

          <h2 data-testid="email-field">{email}</h2>
          <p data-testid="total-field">0</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <form>
          <fieldset>
            <label htmlFor="valor">
              Valor:
              <input name="valor" data-testid="value-input" />
            </label>
            <label htmlFor="descrição">
              Descrição
              <input name="descrição" data-testid="description-input" />
            </label>
            <label htmlFor="options">
              <select name="options" data-testid="currency-input">
                {currencies !== undefined ? currencies.map((currency) => (
                  <option key={ currency[0] }>{currency[0]}</option>
                )) : <p>não rolou</p>}
              </select>
            </label>
          </fieldset>
        </form>
      </div>

    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrency: (data) => dispatch(fetchAction(data)),
});

Wallet.propTypes = {
  email: propTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
