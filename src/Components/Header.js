import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../styles/App.css';

class Header extends Component {
  render() {
    const { email, total } = this.props;
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
          <span data-testid="total-field" value="0">{total}</span>
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
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
