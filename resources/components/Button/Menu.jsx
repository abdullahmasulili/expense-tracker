import { View } from 'react-native';
import { Icon, MD3Colors, Text, TouchableRipple } from 'react-native-paper';

import styles from './styles';

export default function MenuButton({ label, onPress, icon, to }) {
  return (
    <TouchableRipple
      style={styles.button}
      rippleColor={MD3Colors.neutral90}
      onPress={() => onPress(to)}>
      <View style={styles.buttonContent}>
        <Icon source={icon} size={16} />
        <Text variant="bodyLarge">{label}</Text>
      </View>
    </TouchableRipple>
  );
}
