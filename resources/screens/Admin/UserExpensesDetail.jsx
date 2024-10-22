import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Appbar, Text } from 'react-native-paper';
import ExpenseItem from '../../components/List/ExpenseItem';
import { useDispatch, useSelector } from 'react-redux';
import { removeExpense } from '../../store/expense/expense-actions';
import Loading from '../../components/Dialog/Loading';

function HeaderTitle({ userName }) {
  return (
    <View>
      <Text variant="titleMedium">{userName}</Text>
      <Text variant="titleSmall">Expenses Detail</Text>
    </View>
  );
}

export default function UserExpensesDetail({ navigation, route }) {
  const { userEmail, userName } = route.params;
  const { items: expenses, isSubmitting } = useSelector(state => state.expense);
  const userExpenses = expenses.filter(
    expense => expense.belongsTo === userEmail,
  );
  const dispatch = useDispatch();

  function handleDeleteItem(itemId) {
    dispatch(removeExpense(itemId));
  }
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.navigate('AdminHome')} />
        <Appbar.Content title={<HeaderTitle userName={userName} />} />
      </Appbar.Header>
      <FlatList
        data={userExpenses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ExpenseItem data={item} onDelete={handleDeleteItem} />
        )}
      />
      <Loading title="Deleting..." visible={isSubmitting} />
    </>
  );
}
