import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { addExpense } from '../actions';

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = {
      expense: 0,
      // currency: 'BRL',
      // paymentMethod: 'Dinheiro',
      // tag: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { expense, description } = this.state;
    return (
      <form>
        <label htmlFor="expense">
          Valor:
          <input
            name="expense"
            type="number"
            data-testid="value-input"
            value={ expense }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Valor:
          <input
            name="description"
            type="text"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  expense: (object) => dispatch(addExpense(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
