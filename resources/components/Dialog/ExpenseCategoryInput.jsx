import { useState } from 'react';
import { Button, Dialog, TextInput } from 'react-native-paper';
import uuid from 'react-native-uuid';

export default function ExpenseCategoryInput({ category, onClose, onSave }) {
  const [categoryName, setCategoryName] = useState(category?.label || '');

  function handleSave() {
    let data = {
      id: uuid.v4(),
      label: categoryName,
      value: categoryName.toLowerCase(),
    };

    if (category) {
      data.id = category.id;
    }

    onSave(data);
  }

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
        <Button onPress={onClose}>Cancel</Button>
        <Button onPress={handleSave}>Save</Button>
      </Dialog.Actions>
    </>
  );
}
