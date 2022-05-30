import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'next-themes';
import store from '../src/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute='class'>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
