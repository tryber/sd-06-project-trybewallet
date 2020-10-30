import PropTypes from 'prop-types';

export const TransactionShape = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({
      USD: PropTypes.shape({
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        ask: PropTypes.string.isRequired,
      }).isRequired,
    }),
  }),
).isRequired;

export const WalletProps = {
  user: PropTypes.string.isRequired,
  transactions: TransactionShape,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export const HeaderProps = {
  user: PropTypes.string.isRequired,
  transactions: TransactionShape,
};
