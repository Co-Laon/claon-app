import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/store';
import { Provider } from 'react-redux';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { RootNavigator } from './src/navigation';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider theme={theme}>
          <BottomSheetModalProvider>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </BottomSheetModalProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
