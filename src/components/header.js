import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'BRL',
    };
    this.handleTotal = this.handleTotal.bind(this);
  }

  handleTotal() {
    const { storeExpenses } = this.props;
    const arrayCambioExpenses = [storeExpenses
      .map((expense) => (parseFloat(expense.exchangeRates[expense.currency].ask)
        .toFixed(2)))];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const newTotal = (arrayCambioExpenses.reduce(reducer)).toFixed(2);
    return newTotal;
  }

  render() {
    const { emailLogin, storeTotal } = this.props;
    const { currency } = this.state;
    return (
      <header>
        <div>
          Login:
          <div data-testid="email-field">{ emailLogin }</div>
        </div>
        <div data-testid="total-field">
          Despesas totais:
          { storeTotal || 0 }
        </div>
        <div data-testid="header-currency-field">
          Moeda:
          { currency }
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  emailLogin: state.user.email,
  storeTotal: state.wallet.total,
  storeExpenses: state.wallet.expenses,
});

Header.propTypes = {
  emailLogin: PropTypes.string.isRequired,
  storeTotal: PropTypes.number.isRequired,
  storeExpenses: PropTypes.arrayOf.isRequired,
};

// Header.defaultProps = {
//   emailLogin: 'email',
//   storeTotal: 0,
// };

export default connect(mapStateToProps, null)(Header);
