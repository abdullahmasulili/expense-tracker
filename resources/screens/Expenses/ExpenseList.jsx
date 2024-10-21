import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Appbar, Divider, MD3Colors, Text } from 'react-native-paper';

import ExpenseItem from '../../components/List/ExpenseItem';
import styles from './styles';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeExpense } from '../../store/expense/expense-actions';
import Loading from '../../components/Dialog/Loading';
import GlobalStyles from '../../utils/GlobalStyles';

export default function ExpenseList({ navigation }) {
  const dispatch = useDispatch();

  const { items: expenses, isSubmitting } = useSelector(state => state.expense);

  const [date, setDate] = useState(new Date());
  const [isPickDate, setIsPickDate] = useState(false);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  function handleOnDateConfirm(selectedDate) {
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
        data={expenses}
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
      {/* <ScrollView style={styles.container}>
        <List.Section style={styles.list}>
          {DUMMY_DATA.map((data, index) => (
            <ExpenseItem
              key={index}
              title={data.month}
              summary={data.expenseSummary}
            />
          ))}
        </List.Section>
      </ScrollView> */}
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
