import { useState } from 'react';
import { View } from 'react-native';
import { Appbar, Button, TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

import styles from './styles';
import Dropdown from '../../components/Inputs/Dropdown';
import { useSelector } from 'react-redux';

export default function ExpenseForm({ navigation, route }) {
  const params = route.params;
  const data = params.expenseData || null;
  const [selectedCategory, setSelectedCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [isPickDate, setIsPickDate] = useState(false);
  const [description, setDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);
  const expenseCategories = useSelector(state => state.expense.categories);

  if (data) {
    setSelectedCategory(data.category);
    setDate(new Date(data.date));
    setDescription(data.description);
    setExpenseAmount(data.expenseAmount);
  }

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  function handleBack() {
    navigation.navigate('UserHome');
  }

  function handleOnDateConfirm(selectedDate) {
    setDate(selectedDate);
    setIsPickDate(false);
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title={params.actionType} />
      </Appbar.Header>
      <View style={styles.container}>
        <Dropdown
          label="Category"
          value={selectedCategory}
          onChange={itemValue => setSelectedCategory(itemValue)}
          items={expenseCategories}
        />
        <TextInput
          mode="outlined"
          label="Amount"
          dense
          value={expenseAmount}
          defaultValue={expenseAmount}
          keyboardType="number-pad"
          inputMode="numeric"
          right={<TextInput.Icon icon="currency-usd" />}
        />
        <TextInput
          mode="outlined"
          label="Date Time"
          dense
          value={formattedDate}
          defaultValue={formattedDate}
          keyboardType="number-pad"
          inputMode="numeric"
          readOnly
          right={
            <TextInput.Icon
              icon="calendar"
              onPress={() => setIsPickDate(true)}
            />
          }
        />
        <TextInput
          mode="outlined"
          label="Description"
          multiline
          numberOfLines={8}
          value={description}
          defaultValue={description}
        />
        <Button mode="contained">Save</Button>
      </View>
      <DatePicker
        modal
        mode="datetime"
        theme="light"
        maximumDate={new Date()}
        open={isPickDate}
        date={date}
        onCancel={() => setIsPickDate(false)}
        onConfirm={handleOnDateConfirm}
      />
    </>
  );
}
