import { Card, IconButton, MD3Colors } from 'react-native-paper';

export default function ExpenseItem({ title, summary }) {
  return (
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
        />
      </Card.Actions>
    </Card>
  );
}
