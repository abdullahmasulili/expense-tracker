import { Appbar } from 'react-native-paper';

export default function ExpenseForm({ navigation }) {
  function handleBack() {
    navigation.navigate('ExpenseList');
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title="New Expense" />
      </Appbar.Header>
    </>
  );
}
