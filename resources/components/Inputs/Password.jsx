import { useState } from 'react';
import { TextInput } from 'react-native-paper';

export default function PasswordInput({ ...props }, label = 'Password') {
  const [isSecureText, setIsSecureText] = useState(true);

  let icon = 'eye-off';

  if (isSecureText) {
    icon = 'eye';
  }

  return (
    <TextInput
      label={label}
      secureTextEntry={isSecureText}
      right={
        <TextInput.Icon
          icon={icon}
          onPress={() => setIsSecureText(oldState => !oldState)}
        />
      }
      {...props}
    />
  );
}
