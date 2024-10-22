import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import {
  Appbar,
  Button,
  Dialog,
  Divider,
  MD3Colors,
  Text,
} from 'react-native-paper';
import DateTimePicker from 'react-native-ui-datepicker';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import GlobalStyles from '../../utils/GlobalStyles';
import { removeExpense } from '../../store/expense/expense-actions';

import ExpenseItem from '../../components/List/ExpenseItem';
import Loading from '../../components/Dialog/Loading';
import DialogContainer from '../../components/Dialog/Container';

export default function ExpenseList({ navigation }) {
  const dispatch = useDispatch();
  const dateDialogRef = useRef();

  const { items: expenses, isSubmitting } = useSelector(state => state.expense);

  const [date, setDate] = useState(new Date());
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [isFiltering, setIsFiltering] = useState(false);

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const resolveExpenseByDate = useCallback(
    function resolveExpenseByDate() {
      setIsFiltering(true);
      try {
        const result = expenses.filter(expense => {
          const startTime = new Date(date).setHours(0, 0, 0, 0);
          const endTime = new Date(date).setHours(23, 59, 59, 599);

          const expenseDateTime = new Date(expense.dateTime);

          return expenseDateTime >= startTime && expenseDateTime <= endTime;
        });
        setIsFiltering(false);
        return result;
      } catch (err) {
        console.error(err);
        setIsFiltering(false);
      }
    },
    [date, expenses],
  );

  function handleStartPickDate() {
    dateDialogRef.current.open();
  }

  function handleOnDateConfirm() {
    dateDialogRef.current.close();
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
          onPress={handleStartPickDate}
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
          <Text variant="titleMedium" style={GlobalStyles.textCenter}>
            You were saving this day!
          </Text>
        }
      />
      <DialogContainer
        ref={dateDialogRef}
        title="Select Date"
        dismissable={false}>
        <Dialog.Content>
          <DateTimePicker
            dayContainerStyle={{ borderRadius: 10 }}
            calendarTextStyle={{ color: MD3Colors.primary40 }}
            headerTextStyle={{ color: MD3Colors.primary40 }}
            weekDaysTextStyle={{ color: MD3Colors.primary40 }}
            selectedItemColor={MD3Colors.primary20}
            initialView="day"
            date={date}
            maxDate={new Date()}
            onChange={({ date: pickerDate }) => setDate(new Date(pickerDate))}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleOnDateConfirm}>Confirm</Button>
        </Dialog.Actions>
      </DialogContainer>
      <Loading visible={isFiltering || isSubmitting} title="Loading..." />
    </>
  );
}
