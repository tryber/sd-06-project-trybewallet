import React from 'react';
import { connect } from 'react-redux';

class Header extends React.Component {
  render() {
    const { email } = this.state;
    return (
      <header>
        {email}
      </header>
    );
  }
}
export default connect(Header);
