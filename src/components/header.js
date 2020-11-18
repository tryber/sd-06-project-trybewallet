import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'BRL',
      total: 0,
    };
  }

  render() {
    const { emailLogin } = this.props;
    const { currency, total } = this.state;
    return (
      <header>
        <div>
          Login:
          <div data-testid="email-field">{ emailLogin }</div>
        </div>
        <div data-testid="total-field">
          Despesas totais:
          { total }
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
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  emailLogin: PropTypes.string,
  // expenses: PropTypes.number,
};

Header.defaultProps = {
  emailLogin: 'email',
  // expenses: 0,
};

export default connect(mapStateToProps, null)(Header);
