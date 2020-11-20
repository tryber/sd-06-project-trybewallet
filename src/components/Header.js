import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleSun = this.handleSun.bind(this);
  }

  handleSun() {
    const { expenses } = this.props;
    const askedValue = Math.round(expenses
      .reduce((acc, cur) => Number(acc) + Number(cur.value)
       * Number(cur.exchangeRates[cur.currency].ask), 0) * 100) / 100;
    return (askedValue).toFixed(2);
  }

  render() {
    const { userEmail } = this.props;
    return (
      <nav className="header-nav">
        <Link className="header-link" to="/"><h3>WALLET</h3></Link>
        <section className="header-email-expenses">
          <section data-testid="email-field">{ userEmail }</section>
          <section className="header-expenses">
            <section data-testid="total-field">
              {`${'Despesa Total: R$ '}
              ${this.handleSun()}`}
            </section>
            <section data-testid="header-currency-field">{`${'BRL'}`}</section>
          </section>
        </section>
      </nav>
    );
  }
}

Header.propTypes = {
  userEmail: propTypes.string.isRequired,
  expenses: propTypes.arrayOf(propTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
