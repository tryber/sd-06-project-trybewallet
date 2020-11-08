import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletForms from '../components/WalletForms';
import Table from '../components/Table';

class Wallet extends React.Component {
  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  render() {
    const { email, totalValue } = this.props;

    return (
      <div>
        <p data-testid="email-field">
          {email}
        </p>
        <p data-testid="total-field">
          {totalValue.toFixed(2)}
          {' '}
        </p>
        <select
          data-testid="header-currency-field"
          name="currency"
          defaultValue="BRL"
          onChange={ this.handleChange }
        >
          <option>BRL</option>
        </select>
        <WalletForms />
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalValue: state.wallet.total,
  edit: state.wallet.edit,

});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string,
  totalValue: PropTypes.number,
};

Wallet.defaultProps = {
  email: '',
  totalValue: 0,
};
