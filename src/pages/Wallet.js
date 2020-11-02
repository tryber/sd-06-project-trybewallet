import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expenses: 0,
      cambio: 'BRL',
    };
  }

  render() {
    const { expenses, cambio } = this.state;
    const { addEmail } = this.props;
    return (
      <div>
        <header data-testid="email-field">
          <p>{`Usuario: ${addEmail}`}</p>
          <p data-testid="total-field">
            {`Despesa Total: ${expenses}`}
          </p>
          <p data-testid="header-currency-field">
            {`Cambio utilizado: ${cambio}`}
          </p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  addEmail: state.user.email,
});

Wallet.propTypes = {
  password: PropTypes.func.isRequired,
}.isRequired;

export default connect(mapStateToProps, null)(Wallet);
