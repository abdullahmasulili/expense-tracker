import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

import MainStack from './resources/router/Stack';

function App(): React.JSX.Element {
  const theme = {
    ...DefaultTheme,
  };

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <MainStack />
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
