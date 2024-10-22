import { View } from 'react-native';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

import styles from './styles';

import TotalExpense from '../../components/Cards/TotalExpense';
import CategoryBreakdown from '../../components/Cards/CategoryBreakdown';
import SelectDate from '../../components/Cards/SelectDate';

export default function ExpenseList() {
  const { items: expenses, categories } = useSelector(state => state.expense);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [totalExpense, setTotalExpense] = useState(0);

  const statisticCards = [
    {
      name: 'Select Date',
      Component: SelectDate,
      props: {
        onChange: handleDateChange,
        startDate: start,
        endDate: end,
        onConfirm: resolveTotalExpense,
      },
    },
    {
      name: 'Total Expense',
      Component: TotalExpense,
      props: {
        amount: totalExpense,
      },
    },
    {
      name: 'Expese Category Breakdown',
      Component: CategoryBreakdown,
      props: {
        expenses: expenses,
        categories: categories,
      },
    },
  ];

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
    <FlatList
      data={statisticCards}
      keyExtractor={item => item.name}
      renderItem={({ item }) => {
        const { props, Component } = item;

        return (
          <View style={styles.container}>
            <Component {...props} />
          </View>
        );
      }}
    />
  );
}
