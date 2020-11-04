import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <span
            data-testid="email-field"
            id="email-user"
          >
            {`Email: ${email}  | ` }
          </span>

          <span
            data-testid="total-field"
            id="total-gastos"
          >
            {'0 | '}
          </span>

          <span
            data-testid="header-currency-field"
            id="moeda"
          >
            BRL |
          </span>
        </header>

        <form onSubmit="">
          <label
            htmlFor="email-user"
          >
            Email
            <input
              placeholder="Digite seu email"
              data-testid="email-inpu"
              id="email-user"
              type="text"
              value="email"
            />
          </label>
          <div>
            <label htmlFor="movie_image">
              Senha
              <input
                placeholder="Digite sua senha"
                data-testid="password-inpu"
                id="senha-user"
                type="password"
                value="senha"
              // onChange={ (event) => this.handleUpdateState('senha', event) }
              />
            </label>
          </div>
          <button
            type="button"
          >
            ok
          </button>
        </form>

      </div>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
