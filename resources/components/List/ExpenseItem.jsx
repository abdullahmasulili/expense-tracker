import { useRef } from 'react';
import { Card, IconButton, MD3Colors, Text } from 'react-native-paper';

import { currency, formatDate } from '../../utils/Formatter';

import ExpensesDetail from '../Dialog/ExpensesDetail';

export default function ExpenseItem({ data, onDelete }) {
  const dialogRef = useRef();

  function handleShowDetails() {
    dialogRef.current.open();
  }

  function handleDeletePress() {
    onDelete(data.id);
  }

  return (
    <>
      <ExpensesDetail ref={dialogRef} />
      <Card mode="contained">
        <Card.Title title={formatDate(data.dateTime)} />
        <Card.Content>
          <Text variant="bodyMedium">
            You&apos;ve spent {currency.format(data.amount)}
          </Text>
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
          <IconButton
            mode="contained"
            containerColor={MD3Colors.primary80}
            iconColor={MD3Colors.primary50}
            icon="dots-horizontal-circle-outline"
            size={20}
            onPress={handleShowDetails}
          />
        </Card.Actions>
      </Card>
    </>
  );
}
