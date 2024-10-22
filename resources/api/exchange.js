import Config from 'react-native-config';

export const fetchExchangeRates = async () => {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/${Config.EXCHANGE_RATE_API_KEY}/latest/USD`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch exchage rates');
  }

  const resData = await response.json();
  console.log(resData);
  return resData;
};
