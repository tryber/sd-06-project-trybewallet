import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/App.css';
import { addTotal } from '../actions/index';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const valueTotalNumber = expenses.reduce((result, expense) => (
      result + (parseFloat(expense.exchangeRates[expense.currency].ask * expense.value))
    ), 0);

    return (
      <header>
        <div className="container">
          <div className="col-md-6">
            <img src="trybeLOgo.png" className="img-responsive" alt="Imagem Responsiva" />
          </div>
          <div className="name-login">
            Email:
          </div>
          <span data-testid="email-field">{email}</span>
          <br />
          <div>Despesa Total: </div>
          <span data-testid="total-field" value="0">{valueTotalNumber}</span>
          <br />
          <span data-testid="header-currency-field"> BRL</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  sendAddTotal: (total) => dispatch(addTotal(total)),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
