import { useState } from 'react';
import { TextInput } from 'react-native-paper';

export default function PasswordInput({ ...props }, label = 'Password') {
  const [isSecureText, setIsSecureText] = useState(true);

  return (
    <TextInput
      label={label}
      secureTextEntry={isSecureText}
      right={
        <TextInput.Icon
          icon="eye"
          onPress={() => setIsSecureText(oldState => !oldState)}
        />
      }
      {...props}
    />
  );
}
