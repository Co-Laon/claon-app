import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useLayoutEffect, useState } from 'react';
import store from '../src/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import 'react-spring-bottom-sheet/dist/style.css';
import { useRNMessage } from 'climbingweb/src/hooks/useRNMessage';
import { ToastClient } from 'climbingweb/src/components/common/Toast/ToastClient';
import { useToken } from 'climbingweb/src/hooks/useToken';
import Login from 'climbingweb/src/components/dev/Login';
import { isDesktop } from 'react-device-detect';
import NavBarWrapper from 'climbingweb/src/components/common/bottomNav/NavBarWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  const { token, sendReactNativeMessage } = useRNMessage();
  const { token: storageToken, isStorageLogin } = useToken();

  useLayoutEffect(() => {
    if (token) {
      axios.defaults.headers.common['access-token'] = token.accessToken;
      axios.defaults.headers.common['refresh-token'] = token.refreshToken;
    }
    if (isDesktop) {
      axios.defaults.headers.common['access-token'] =
        '' + process.env.NEXT_PUBLIC_ACCESS_TOKEN;
      axios.defaults.headers.common['refresh-token'] =
        '' + process.env.NEXT_PUBLIC_REFRESH_TOKEN;
    }
    if (isStorageLogin()) {
      axios.defaults.headers.common['access-token'] = storageToken.accessToken;
      axios.defaults.headers.common['refresh-token'] =
        storageToken.refreshToken;
    }

    axios.defaults.baseURL = '' + process.env.NEXT_PUBLIC_API;
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

    //eslint-disable-next-line
  }, [token]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: false,
          },
        },
      })
  );
  if (!token && !isDesktop && !isStorageLogin()) {
    return (
      <section className=" h-screen flex justify-center items-center">
        <Login />
      </section>
    );
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastClient>
          <Component {...pageProps} />
          <NavBarWrapper />
          {/* <NavBar navButtons={navButtons} /> */}
        </ToastClient>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
