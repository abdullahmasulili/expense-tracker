import { useState } from 'react';
import { Button, Dialog, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { expenseActions } from '../../store/expense';
import uuid from 'react-native-uuid';

export default function ExpenseCategoryInput({ category, onClose }) {
  const [categoryName, setCategoryName] = useState(category.label || '');
  const dispatch = useDispatch();

  function handleOnClose() {
    setCategoryName('');
    onClose();
  }

  function handleSave() {
    let data = {
      id: uuid.v4(),
      label: categoryName,
      value: categoryName.toLowerCase(),
    };

    if (category) {
      data = {
        id: category.id,
        ...data,
      };
    }
    console.log(data);
    dispatch(expenseActions.addCategory(data));
    handleOnClose();
  }
  console.log(category, categoryName);
  return (
    <>
      <Dialog.Content>
        <TextInput
          mode="outlined"
          label="Name"
          value={categoryName}
          onChangeText={setCategoryName}
        />
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={handleOnClose}>Cancel</Button>
        <Button onPress={handleSave}>Save</Button>
      </Dialog.Actions>
    </>
  );
}
