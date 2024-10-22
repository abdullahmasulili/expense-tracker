import { Card, Text } from 'react-native-paper';
import { currency } from '../../utils/Formatter';

export default function TotalExpense({
  amount,
  title = 'Your Total Expense At Selected Date',
  actions,
}) {
  return (
    <Card>
      <Card.Title title={<Text variant="titleMedium">{title}</Text>} />
      <Card.Content>
        <Text variant="headlineMedium">{currency.format(amount)}</Text>
      </Card.Content>
      <Card.Actions>{actions}</Card.Actions>
    </Card>
  );
}
