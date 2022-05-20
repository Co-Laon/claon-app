import React from 'react';
import { ThemeProvider } from 'styled-components';
import { light } from './src/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/store';
import { Provider } from 'react-redux';

import MainNavigator from './src/navigation/MainNavigator';
import LoginNavigator from './src/navigation/LoginNavigator';

const isLoggedIn = true;

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider theme={light}>
          <NavigationContainer>
            {isLoggedIn ? <MainNavigator /> : <LoginNavigator />}
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};


export default App;
