import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { FiUser } from 'react-icons/fi';

import formatValue from '../../utils/formatValue';

import logo from '../../assets/logo.png';

import { HeaderProps } from '../../types/appTypes';

import './styles.css';

const Header = ({ user, transactions }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const currentTotal = transactions.reduce((acc, transaction) => {
      const { currency, exchangeRates, value } = transaction;

      const exchangeRate = exchangeRates[currency].ask;

      const transactionCostInBRL = exchangeRate * value;

      return acc + transactionCostInBRL;
    }, 0);

    setTotal(currentTotal);
  }, [transactions]);

  return (
    <header className="app-header">
      <img src={ logo } alt="application logo" />
      <div className="header-info">
        <span data-testid="total-field">
          TOTAL
          {' '}
          {formatValue(total)}
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
      <div className="user-container">
        <FiUser size={ 20 } />
        <span data-testid="email-field">{user}</span>
      </div>
    </header>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user.email,
    transactions: state.wallet.expenses,
  };
}

Header.propTypes = HeaderProps;

export default connect(mapStateToProps, null)(Header);
