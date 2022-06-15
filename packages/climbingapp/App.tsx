import React from 'react';
import { ThemeProvider } from 'styled-components';
import { light } from './src/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/store';
import { Provider } from 'react-redux';

import MainNavigator from './src/navigation/MainNavigator';
import LoginNavigator from './src/navigation/LoginNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
const isLoggedIn = true;

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider theme={light}>
          <BottomSheetModalProvider>
            <NavigationContainer>
              {isLoggedIn ? <MainNavigator /> : <LoginNavigator />}
            </NavigationContainer>
          </BottomSheetModalProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};


export default App;
