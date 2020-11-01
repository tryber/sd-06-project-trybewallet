import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../imgs/trybe.png';
import './Header.css';

class Header extends React.Component {
  render() {
    const { email, totalExpense } = this.props;
    let total = 0;
    if (totalExpense) total = totalExpense;
    return (
      <div className="header">
        <div className="logo-container">
          <img src={ logo } alt="Logo Trybe" className="logo" />
        </div>
        <div className="info-container">
          <p data-testid="email-field">{ email }</p>
          <p data-testid="total-field">{`Despesa Total: R$ ${total.toFixed(2)}`}</p>
          {/* <p data-testid="total-field">Despesa Total: R$ 0</p> */}
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpense: state.wallet.totalExpense,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpense: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
