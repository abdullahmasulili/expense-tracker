export const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatDate = date => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
