import React from 'react';
import { connect } from 'react-redux';

export const Page = (props) => {
  return (
    <div>
      <h1>Opa funfo...</h1>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToprops = (dispach) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToprops)(Page);
