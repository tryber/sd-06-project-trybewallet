import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions';

class Wallet extends React.Component {
  handleClick() {

  }
  render() {
    const { nomeQualquer, loginAction } = this.props;
    return <div onClick={ () => loginAction('oi!!!') }>{ nomeQualquer }</div>;
  }
}
//SET-- 
const mapStateToProps = (state) => ({
  nomeQualquer: state.wallet.helloWorld,
});

const mapDispatchToProps = (dispatch) => ({
  loginAction: (email) => dispatch(login(email)),
});
 
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Wallet);
