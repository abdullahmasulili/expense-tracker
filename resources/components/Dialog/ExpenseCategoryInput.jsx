import { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { expenseActions } from '../../store/expense';
import uuid from 'react-native-uuid';

const ExpenseCategoryInput = forwardRef(function ExpenseCategoryInput(
  { title, category },
  ref,
) {
  const [isVisible, setIsVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const dispatch = useDispatch();

  function handleOpenDialog() {
    setIsVisible(true);
  }

  function handleCloseDialog() {
    setIsVisible(false);
  }

  function handleSave() {
    const data = {
      id: uuid.v4(),
      label: categoryName,
      value: categoryName.toLowerCase(),
    };

    dispatch(expenseActions.addCategory(data));
    handleCloseDialog();
  }

  useImperativeHandle(ref, () => {
    return {
      open() {
        handleOpenDialog();
      },
      close() {
        handleCloseDialog();
      },
    };
  });

  return (
    <Portal>
      <Dialog visible={isVisible} onDismiss={handleCloseDialog}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <TextInput
            mode="outlined"
            label="Name"
            value={categoryName}
            onChangeText={setCategoryName}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleCloseDialog}>Cancel</Button>
          <Button onPress={handleSave}>Save</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
});

export default ExpenseCategoryInput;
