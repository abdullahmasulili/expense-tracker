import { View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import DateTimePicker from 'react-native-ui-datepicker';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import styles from './styles';

import TotalExpense from '../../components/Cards/TotalExpense';
import CategoryBreakdown from '../../components/Cards/CategoryBreakdown';

export default function ExpenseList() {
  const { items: expenses, categories } = useSelector(state => state.expense);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [totalExpense, setTotalExpense] = useState(0);

  function handleDateChange({ startDate, endDate }) {
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
      <TotalExpense amount={totalExpense} />
      <CategoryBreakdown expenses={expenses} categories={categories} />
    </View>
  );
}
