import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'BRL',
    };
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
          { storeTotal }
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
  storeTotal: state.total.total,
});

Header.propTypes = {
  emailLogin: PropTypes.string.isRequired,
  storeTotal: PropTypes.number.isRequired,
};

// Header.defaultProps = {
//   emailLogin: 'email',
//   storeTotal: 0,
// };

export default connect(mapStateToProps, null)(Header);
