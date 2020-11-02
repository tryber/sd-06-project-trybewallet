import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Expenses extends Component {
  render() {
    return (
      <div>
        Expenses
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => {

};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
