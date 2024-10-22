import { useState } from 'react';
import { View } from 'react-native';
import {
  Appbar,
  Button,
  HelperText,
  Text,
  TextInput,
} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-native-uuid';
import { Formik } from 'formik';
import * as Yup from 'yup';

import styles from './styles';
import { formatDate } from '../../utils/Formatter';

import Dropdown from '../../components/Inputs/Dropdown';
import { newExpense } from '../../store/expense/expense-actions';
import Loading from '../../components/Dialog/Loading';

const initialValues = {
  category: '',
  amount: 0,
  dateTime: new Date(),
  description: '',
};
const expenseScheme = Yup.object().shape({
  category: Yup.string().required('Category Required'),
  amount: Yup.number()
    .positive()
    .moreThan(0, 'Should more than 0')
    .integer()
    .required('Amount required!'),
  dateTime: Yup.string().required('Date Time Required'),
  description: Yup.string().required('Description Required'),
});

export default function ExpenseForm({ navigation, route }) {
  const dispatch = useDispatch();
  const { currentAccount } = useSelector(state => state.user);
  const { categories: expenseCategories, isSubmitting } = useSelector(
    state => state.expense,
  );

  const params = route.params;

  const [pickerDate, setPikcerDate] = useState(new Date());
  const [isPickDate, setIsPickDate] = useState(false);

  function handleBack() {
    navigation.navigate('UserHome');
  }

  function handleOnDateConfirm(selectedDate) {
    setPikcerDate(selectedDate);
    setIsPickDate(false);
  }

  function handleFallbackButtonPress() {
    navigation.navigate('ManageExpenseCategory');
  }

  function handleOnSubmitPress(values) {
    try {
      const expenseCategory = expenseCategories.find(
        category => category.value === values.category,
      );
      const expenseData = {
        id: uuid.v4(),
        belongsTo: currentAccount.email,
        category: expenseCategory.label,
        amount: values.amount,
        dateTime: values.dateTime.toISOString(),
        description: values.description,
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
        <Formik
          initialValues={initialValues}
          validationSchema={expenseScheme}
          onSubmit={handleOnSubmitPress}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              <Dropdown
                label="Category"
                value={values.category}
                onChange={itemValue => setFieldValue('category', itemValue)}
                items={expenseCategories}
              />
              {errors.category && (
                <HelperText type="error" visible={errors.category}>
                  {errors.category}
                </HelperText>
              )}
              <TextInput
                style={styles.formSpacing}
                mode="outlined"
                label="Amount"
                dense
                value={values.amount}
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                keyboardType="number-pad"
                inputMode="numeric"
                right={<TextInput.Icon icon="currency-usd" />}
              />
              {errors.amount && (
                <HelperText type="error" visible={errors.amount}>
                  {errors.amount}
                </HelperText>
              )}

              <TextInput
                style={styles.formSpacing}
                mode="outlined"
                label="Date Time"
                dense
                value={formatDate(pickerDate)}
                onChange={handleChange('dateTime')}
                onBlur={handleBlur('dateTime')}
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
              {errors.dateTime && (
                <HelperText type="error" visible={errors.dateTime}>
                  {errors.dateTime}
                </HelperText>
              )}

              <TextInput
                style={styles.formSpacing}
                mode="outlined"
                label="Description"
                multiline
                numberOfLines={8}
                value={values.description}
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
              />
              {errors.description && (
                <HelperText type="error" visible={errors.description}>
                  {errors.description}
                </HelperText>
              )}

              <Button
                style={styles.formSpacing}
                mode="contained"
                onPress={handleSubmit}>
                Save
              </Button>
              <DatePicker
                modal
                mode="datetime"
                theme="light"
                maximumDate={new Date()}
                open={isPickDate}
                date={pickerDate}
                onCancel={() => setIsPickDate(false)}
                onConfirm={handleOnDateConfirm}
              />
            </View>
          )}
        </Formik>
      )}
      <Loading title="Submitting..." visible={isSubmitting} />
    </>
  );
}
