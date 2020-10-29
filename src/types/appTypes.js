import PropTypes from 'prop-types';

export const TransactionShape = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({
      [PropTypes.string]: PropTypes.shape({
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        ask: PropTypes.number.isRequired,
      }).isRequired,
    }),
  }),
).isRequired;

export const WalletProps = {
  user: PropTypes.string.isRequired,
  transactions: TransactionShape,
};
