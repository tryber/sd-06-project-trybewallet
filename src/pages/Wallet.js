import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: 0,
      cambio: 'BRL',
    };
  }

  render() {
    const { email } = this.props;
    const { cambio, expenses } = this.state;
    console.log(email);
    return (
      <div>
        <h1>TrybeWallet</h1>
        <header>
          <div data-testid="email-field">
            <h5>{ email }</h5>
          </div>
          <div data-testid="total-field">
            <h5>{ expenses }</h5>
          </div>
          <div data-testid="header-currency-field">
            <h5>{ cambio }</h5>
          </div>
        </header>

        <fieldset>
          <div>
            <input data-testid="value-input" type="text" placeholder="Valor" />
          </div>

          <div>
            <input data-testid="description-input" type="text" placeholder="Despesa" />
          </div>

          <div>
            Moeda:
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              className="custom-select"
              style={ { width: 'auto' } }
            >
              <option value="USD">USD</option>
              <option value="CAD">CAD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <div>
            <input type="submit" value="Adicionar despesa" />
          </div>

        </fieldset>
      </div>
    );
  }
}

Wallet.propTypes = {
  password: PropTypes.func.isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps, null)(Wallet);
