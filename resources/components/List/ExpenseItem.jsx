import { useRef } from 'react';
import { Card, IconButton, MD3Colors } from 'react-native-paper';
import ExpensesDetail from '../Dialog/ExpensesDetail';

export default function ExpenseItem({ title, summary }) {
  const dialogRef = useRef();

  function handleShowDetails() {
    dialogRef.current.open();
  }

  return (
    <>
      <ExpensesDetail ref={dialogRef} />
      <Card mode="contained">
        <Card.Title title={title} subtitle={summary} />
        <Card.Actions>
          <IconButton
            mode="contained"
            containerColor={MD3Colors.error80}
            iconColor={MD3Colors.error50}
            icon="delete"
            size={20}
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
