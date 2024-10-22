import { Card, Text } from 'react-native-paper';
import { currency } from '../../utils/Formatter';

export default function TotalExpense({ amount }) {
  return (
    <Card>
      <Card.Title
        title={
          <Text variant="titleMedium">Your Total Expense At Selected Date</Text>
        }
      />
      <Card.Content>
        <Text variant="headlineMedium">{currency.format(amount)}</Text>
      </Card.Content>
    </Card>
  );
}
