import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import store from '../src/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import NavBar from 'climbingweb/src/components/common/bottomNav/NavBar';
import navButtons from 'climbingweb/src/components/common/bottomNav/button';
import axios from 'axios';
import {
  getReactNativeMessage,
  sendReactNativeMessage,
} from 'climbingweb/src/utils/reactNativeMessage';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    getReactNativeMessage();
    axios.interceptors.response.use(function (response) {
      if (response.headers?.hasOwnProperty('access-token')) {
        sendReactNativeMessage({
          type: 'updateToken',
          payload: JSON.stringify({
            'access-token': response.headers['access-token'],
            'refresh-token': response.headers['refresh-token'],
          }),
        });
      }
      return response;
    });
  });
  const [queryClient] = useState(() => new QueryClient());
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <NavBar navButtons={navButtons} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
