const formatValue = (value) => `${new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(value)}`;

export default formatValue;
