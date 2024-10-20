import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import MainStack from './resources/router/Stack';
import store, { persistor } from './resources/store';

function App(): React.JSX.Element {
  const theme = {
    ...DefaultTheme,
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <PaperProvider theme={theme}>
            <MainStack />
          </PaperProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
