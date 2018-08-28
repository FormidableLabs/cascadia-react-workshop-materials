export const priceInDollars = cents => {
  const dollars = cents / 100;
  return dollars.toLocaleString('en-us', {
    style: 'currency',
    currency: 'USD'
  });
};
