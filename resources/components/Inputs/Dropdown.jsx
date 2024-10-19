import { Picker } from '@react-native-picker/picker';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export default function Dropdown({ label, items, onChange, value }) {
  return (
    <View>
      <Text variant="labelMedium">{label}</Text>
      <Picker
        style={{ color: '#000' }}
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
