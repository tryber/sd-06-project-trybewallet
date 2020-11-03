import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import '../styles/Wallet/style.css';
import fetchApi from '../services/api';
import InputsSection from '../Components/InputsSection';
import Table from '../Components/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      currency: [''],
    };
  }

  componentDidMount() {
    this.Fetch();
  }

  async Fetch() {
    const api = await fetchApi();
    const array = await Object.keys(api).filter((el) => el !== 'USDT');
    this.setState({ currency: array });
  }

  render() {
    const { currency } = this.state;
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <Header />
        <InputsSection currencies={ currency } tags={ tags } />
        <Table />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
