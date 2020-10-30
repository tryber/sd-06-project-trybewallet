import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { userEmail } = this.props;
    return (
      <div>
        <header>
          <div className="header-info">
            <p data-testid="email-field">
              Email: 
              {userEmail.email}
            </p>
            <p data-testid="total-field">0</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user,
});

Wallet.propTypes = {
  userEmail: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Wallet);
