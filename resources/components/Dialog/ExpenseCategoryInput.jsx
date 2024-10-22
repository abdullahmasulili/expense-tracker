import {
  Button,
  Dialog,
  HelperText,
  MD3Colors,
  TextInput,
} from 'react-native-paper';
import uuid from 'react-native-uuid';
import styles from './styles';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

const categorySchema = Yup.object().shape({
  name: Yup.string().required('Name Cannot Be Empty').min(3, 'Too Short!'),
});

export default function ExpenseCategoryInput({
  category,
  onClose,
  onSave,
  onDelete,
}) {
  const initialValues = {
    name: category?.label || '',
  };
  const { currentAccount } = useSelector(state => state.user);

  function handleSave(values) {
    let data = {
      belongsTo: currentAccount.email,
      id: uuid.v4(),
      label: values.name,
      value: values.name.toLowerCase(),
    };

    if (category) {
      data.id = category.id;
    }
    console.log(data);
    onSave(data);
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={categorySchema}
        onSubmit={handleSave}>
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <>
            <Dialog.Content>
              <TextInput
                mode="outlined"
                label="Name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
              />
              {errors.name && touched.name && (
                <HelperText type="error">{errors.name}</HelperText>
              )}
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
                onPress={handleSubmit}
                icon="content-save"
                style={styles.actionButton}>
                Save
              </Button>
            </Dialog.Actions>
          </>
        )}
      </Formik>
    </>
  );
}
