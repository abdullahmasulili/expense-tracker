import { TextInput } from 'react-native';

import styles from './styles';

export default function TextInputField({ ...props }) {
  return <TextInput style={styles.input} {...props} />;
}
