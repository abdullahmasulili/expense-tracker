import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, List, MD3Colors, Text } from 'react-native-paper';

import ExpenseItem from '../../components/List/ExpenseItem';
import DUMMY_DATA from '../../data';
import styles from './styles';
import DatePicker from 'react-native-date-picker';
import { useState } from 'react';

export default function ExpenseList({ navigation }) {
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
    navigation.navigate('ExpenseForm');
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
      <ScrollView style={styles.container}>
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
    </>
  );
}
