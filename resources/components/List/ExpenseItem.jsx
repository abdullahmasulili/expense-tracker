import { Button, Card } from 'react-native-paper';

export default function ExpenseItem({ title, summary }) {
  return (
    <Card mode="contained">
      <Card.Title title={title} subtitle={summary} />
      <Card.Actions>
        <Button>Delete</Button>
        <Button>Detail</Button>
      </Card.Actions>
    </Card>
  );
}
