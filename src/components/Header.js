import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../imgs/trybe.png';
import './Header.css';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    let total = 0;
    if (expenses.length !== 0) {
      total = expenses.reduce((acc, item) => {
        const totalItem = parseFloat(item.value * item.exchangeRates[item.currency].ask);
        return acc + totalItem;
      }, 0);
    }
    return (
      <div className="header">
        <div className="logo-container">
          <img src={ logo } alt="Logo Trybe" className="logo" />
        </div>
        <div className="info-container">
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{`Despesa Total: R$ ${total.toFixed(2)}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.shape.isRequired,
};

export default connect(mapStateToProps)(Header);
