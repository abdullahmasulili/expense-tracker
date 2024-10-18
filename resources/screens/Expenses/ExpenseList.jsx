import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, List, Text } from 'react-native-paper';

import ExpenseItem from '../../components/List/ExpenseItem';
import DUMMY_DATA from '../../data';
import styles from './styles';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';

export default function ExpenseList() {
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
  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <Text variant="titleLarge">Your Expenses At</Text>
        <Button onPress={() => setIsPickDate(true)}>{formattedDate}</Button>
      </View>
      <List.Section style={styles.list}>
        {DUMMY_DATA.map((data, index) => (
          <ExpenseItem
            key={index}
            title={data.month}
            summary={data.expenseSummary}
          />
        ))}
      </List.Section>
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
    </ScrollView>
  );
}
