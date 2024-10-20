import { useState } from 'react';
import { Button, Dialog, MD3Colors, TextInput } from 'react-native-paper';
import uuid from 'react-native-uuid';
import styles from './styles';

export default function ExpenseCategoryInput({
  category,
  onClose,
  onSave,
  onDelete,
}) {
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
        {category && (
          <Button
            mode="outlined"
            onPress={onDelete}
            textColor={MD3Colors.error50}
            icon="trash-can"
            style={styles.actionButton}>
            Delete
          </Button>
        )}
        <Button
          mode="contained"
          onPress={handleSave}
          icon="content-save"
          style={styles.actionButton}>
          Save
        </Button>
      </Dialog.Actions>
    </>
  );
}
