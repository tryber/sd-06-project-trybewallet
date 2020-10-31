import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import { login } from '../actions';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'BRL',
      totalExpenses: 0,
    };
  }

  // handleClick() {
  //   const { loginAction } = this.props;
  //   loginAction('jc@gmail.com');
  // }

  render() {
    const { username } = this.props;
    const { currency, totalExpenses } = this.state;

    // const { myComponentProps } = this.props;
    // return <div onClick = { () => loginAction('jc@gmail.com') }>{ myComponentProps }</div>;
    return (
      <div>
        <header>
          <img
            src="logo.png"
            alt="TrybeImage"
          />
          <p data-testid="email-field">
            { username }
          </p>
          <p data-testid="total-field">
            { `Despesa Total: ${totalExpenses}`}
          </p>
          <p data-testid="header-currency-field">
            { currency }
          </p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // myComponentProps: state.wallet.hellworld,
  username: state.user.email,
});

// const mapDispatcToProps = (dispatch) => ({
//   loginAction: (email) => dispatch(login(email)),
// });

// Wallet.propTypes = {
// //   loginAction: PropTypes.func.isRequired,
//   username: PropTypes.arrayOf(
//     PropTypes.shape(
//       {
//         email: PropTypes.string,
//       },
//     ),
//   ).isRequired,
// };

Wallet.propTypes = {
  //   loginAction: PropTypes.func.isRequired,
  username: PropTypes.arrayOf().isRequired,
};

export default connect(
  mapStateToProps,
  // mapDispatcToProps,
)(Wallet);
