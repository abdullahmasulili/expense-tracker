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
    console.log(startDate, endDate);
    setStart(startDate);
    setEnd(endDate);
  }

  function resolveTotalExpense() {
    const startDate = new Date(start).setHours(0, 0, 0, 0);
    const endDate = new Date(end).setHours(23, 59, 59, 999);

    const filteredExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.dateTime);

      return expenseDate >= startDate && expenseDate <= endDate;
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
        <Card.Title title={<Text variant="titleLarge">Select Dates</Text>} />
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
          <Button
            icon="calculator-variant"
            mode="contained"
            onPress={resolveTotalExpense}
            disabled={!start || !end}>
            Confirm
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
