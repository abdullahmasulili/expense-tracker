import { Picker } from '@react-native-picker/picker';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import styles from './styles';

export default function Dropdown({
  label,
  items,
  onChange,
  value,
  containerStyle,
}) {
  return (
    <View style={containerStyle}>
      <Text variant="labelMedium">{label}</Text>
      <Picker
        style={styles.input}
        dropdownIconColor="#000"
        mode="dropdown"
        selectedValue={value}
        onValueChange={onChange}>
        {items?.map(item => (
          <Picker.Item key={item.name} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
}
