import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useLayoutEffect, useState } from 'react';
import store from '../src/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import NavBar from 'climbingweb/src/components/common/bottomNav/NavBar';
import navButtons from 'climbingweb/src/components/common/bottomNav/button';
import axios from 'axios';
import { isDesktop } from 'react-device-detect';
import 'react-spring-bottom-sheet/dist/style.css';
import { useRNMessage } from 'climbingweb/src/hooks/useRNMessage';
import Loading from 'climbingweb/src/components/common/Loading/Loading';

function MyApp({ Component, pageProps }: AppProps) {
  const { token, sendReactNativeMessage } = useRNMessage();
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
  if (!token && !isDesktop) {
    return (
      <section className=" h-screen flex justify-center items-center">
        <Loading />
      </section>
    );
  }

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
