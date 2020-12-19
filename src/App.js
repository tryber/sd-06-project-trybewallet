import React from 'react';
import { connect } from 'react-redux';

const App = () => {
  return (
    <div>
      <h1>Funfo</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

// const mapDispatchToprops = (dispach) => {
//   return {

//   };
// };

export default connect(mapStateToProps)(App);
