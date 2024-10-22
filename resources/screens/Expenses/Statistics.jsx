import { View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import DateTimePicker from 'react-native-ui-datepicker';

import styles from './styles';
import { useState } from 'react';
import { currency } from '../../utils/Formatter';
import { useSelector } from 'react-redux';

export default function ExpenseList() {
  const { items: expenses } = useSelector(state => state.expense);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [totalExpense, setTotalExpense] = useState(0);

  function handleDateChange({ startDate, endDate }) {
    setStart(startDate);
    setEnd(endDate);
  }

  function handleResetDate() {
    setStart(new Date());
    setEnd(new Date());
  }

  function resolveTotalExpense() {
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const filteredExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.dateTime);
      console.log(expense);
      return expenseDate >= start;
    });

    const expenseAmount = filteredExpenses.reduce(
      (total, expense) => total + Number(expense.amount),
      0,
    );

    setTotalExpense(expenseAmount);

    return expenseAmount;
  }

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <DateTimePicker
            mode="range"
            maxDate={new Date()}
            startDate={start}
            endDate={end}
            onChange={handleDateChange}
          />
        </Card.Content>
        <Card.Actions>
          <Button mode="outlined" icon="reload" onPress={handleResetDate}>
            Reset
          </Button>
          <Button icon="filter" mode="contained" onPress={resolveTotalExpense}>
            Filter
          </Button>
        </Card.Actions>
      </Card>
      <Card>
        <Card.Title
          title={
            <Text variant="titleMedium">
              Your Total Expense At Selected Date
            </Text>
          }
        />
        <Card.Content>
          <Text variant="headlineMedium">{currency.format(totalExpense)}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}
