import { useState } from 'react';
import { View } from 'react-native';
import { Appbar, Button, Text, TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-native-uuid';

import styles from './styles';
import Dropdown from '../../components/Inputs/Dropdown';
import { newExpense } from '../../store/expense/expense-actions';
import Loading from '../../components/Dialog/Loading';

export default function ExpenseForm({ navigation, route }) {
  const dispatch = useDispatch();
  const { currentAccount } = useSelector(state => state.user);
  const { categories: expenseCategories, isSubmitting } = useSelector(
    state => state.expense,
  );

  const params = route.params;
  const data = params.expenseData || null;

  const [selectedCategory, setSelectedCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [isPickDate, setIsPickDate] = useState(false);
  const [description, setDescription] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);

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

  function handleFallbackButtonPress() {
    navigation.navigate('ManageExpenseCategory');
  }

  function handleOnSubmitPress() {
    try {
      const expenseCategory = expenseCategories.find(
        category => category.value === selectedCategory,
      );
      const expenseData = {
        id: uuid.v4(),
        belongsTo: currentAccount.email,
        category: expenseCategory.label,
        amount: expenseAmount,
        dateTime: formattedDate,
        description,
      };

      dispatch(newExpense(expenseData)).then(() =>
        navigation.navigate('ExpenseList'),
      );
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title={params.actionType} />
      </Appbar.Header>
      {expenseCategories.length < 1 && (
        <View style={styles.emptyCategoryContainer}>
          <Text style={styles.emptyCategoryMessage} variant="titleMedium">
            Please add expense category first
          </Text>
          <Button onPress={handleFallbackButtonPress}>
            Manage Expense Category
          </Button>
        </View>
      )}
      {expenseCategories.length > 0 && (
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
            onChangeText={setExpenseAmount}
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
            onChangeText={setDescription}
          />
          <Button mode="contained" onPress={handleOnSubmitPress}>
            Save
          </Button>
        </View>
      )}
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
      <Loading title="Submitting..." visible={isSubmitting} />
    </>
  );
}
