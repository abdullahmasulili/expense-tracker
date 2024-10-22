import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Appbar, Divider, MD3Colors, Text } from 'react-native-paper';

import ExpenseItem from '../../components/List/ExpenseItem';
import styles from './styles';
import DatePicker from 'react-native-date-picker';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeExpense } from '../../store/expense/expense-actions';
import Loading from '../../components/Dialog/Loading';
import GlobalStyles from '../../utils/GlobalStyles';

export default function ExpenseList({ navigation }) {
  const dispatch = useDispatch();

  const { items: expenses, isSubmitting } = useSelector(state => state.expense);

  const [date, setDate] = useState(new Date());
  const [isPickDate, setIsPickDate] = useState(false);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const resolveExpenseByDate = useCallback(
    function resolveExpenseByDate() {
      return expenses.filter(expense => {
        const startTime = new Date(date).setHours(0, 0, 0, 0);
        const endTime = new Date(date).setHours(23, 59, 59, 599);

        const expenseDateTime = new Date(expense.dateTime);

        return expenseDateTime >= startTime && expenseDateTime <= endTime;
      });
    },
    [date, expenses],
  );

  function handleOnDateConfirm(selectedDate) {
    console.log(selectedDate.toString());
    setDate(selectedDate);
    setIsPickDate(false);
  }

  function headerContent() {
    return (
      <View style={styles.heading}>
        <Text variant="titleMedium">Your Expenses At</Text>
        <Text variant="labelMedium">{formattedDate}</Text>
      </View>
    );
  }

  function handleNewItem() {
    navigation.navigate('ExpenseForm', {
      actionType: 'New Expense',
    });
  }

  function handleDeleteItem(itemId) {
    dispatch(removeExpense(itemId));
  }

  useEffect(() => {
    setFilteredExpenses(resolveExpenseByDate());
  }, [date, resolveExpenseByDate]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={headerContent()} />
        <Appbar.Action
          icon="calendar"
          iconColor={MD3Colors.primary40}
          onPress={() => setIsPickDate(true)}
        />
        <Appbar.Action
          icon="plus"
          iconColor={MD3Colors.primary40}
          onPress={handleNewItem}
        />
      </Appbar.Header>
      <FlatList
        style={styles.container}
        data={filteredExpenses}
        renderItem={({ item }) => (
          <ExpenseItem data={item} onDelete={handleDeleteItem} />
        )}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={<Divider />}
        ListEmptyComponent={
          <Text variant="headlineMedium" style={GlobalStyles.textCenter}>
            No Expense Today!
          </Text>
        }
      />
      <DatePicker
        modal
        mode="date"
        theme="light"
        maximumDate={new Date()}
        open={isPickDate}
        date={date}
        onCancel={() => setIsPickDate(false)}
        onConfirm={handleOnDateConfirm}
      />
      <Loading visible={isSubmitting} title="Deleting Item..." />
    </>
  );
}
