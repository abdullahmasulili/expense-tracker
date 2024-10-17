import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';

import MainStack from './resources/router/Stack';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <PaperProvider>
        <MainStack />
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
