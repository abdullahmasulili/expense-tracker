import { Card, IconButton, MD3Colors, Text } from 'react-native-paper';

import { currency, formatDate } from '../../utils/Formatter';

import styles from './styles';

export default function ExpenseItem({ data, onDelete }) {
  function handleDeletePress() {
    onDelete(data.id);
  }

  return (
    <>
      <Card mode="contained" style={styles.expenseCard}>
        <Card.Title title={formatDate(data.dateTime)} />
        <Card.Content style={styles.cardContent}>
          <Text variant="titleMedium">Summary</Text>
          <Text variant="bodyMedium">
            You&apos;ve spent {currency.format(data.amount)}
          </Text>
          <Text variant="titleMedium">Description</Text>
          <Text variant="bodyMedium">{data.description}</Text>
        </Card.Content>
        <Card.Actions>
          <IconButton
            mode="contained"
            containerColor={MD3Colors.error80}
            iconColor={MD3Colors.error50}
            icon="delete"
            size={20}
            onPress={handleDeletePress}
          />
        </Card.Actions>
      </Card>
    </>
  );
}
