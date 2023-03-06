import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useState } from 'react';
import store from '../src/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-spring-bottom-sheet/dist/style.css';
import { ToastClient } from 'climbingweb/src/components/common/Toast/ToastClient';
//import axios from 'axios';
//import { useToken } from 'climbingweb/src/hooks/useToken';
//import Login from 'climbingweb/src/components/dev/Login';
//import { isDesktop } from 'react-device-detect';
import NavBarWrapper from 'climbingweb/src/components/common/bottomNav/NavBarWrapper';
import { useAppToken } from 'climbingweb/src/hooks/useAppToken';
import Loading from 'climbingweb/src/components/common/Loading/Loading';
import { AnimatePresence } from 'framer-motion';
function MyApp({ Component, pageProps, router }: AppProps) {
  // const { token: storageToken, isStorageLogin } = useToken();
  // useEffect(() => {
  //   if (isDesktop) {
  //     axios.defaults.headers.common['access-token'] =
  //       '' + process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  //     axios.defaults.headers.common['refresh-token'] =
  //       '' + process.env.NEXT_PUBLIC_REFRESH_TOKEN;
  //   }
  //   if (isStorageLogin()) {
  //     axios.defaults.headers.common['access-token'] = storageToken.accessToken;
  //     axios.defaults.headers.common['refresh-token'] =
  //       storageToken.refreshToken;
  //   }
  //   //eslint-disable-next-line
  // }, []);

  const { token } = useAppToken();

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
  // if (!token && !isDesktop && !isStorageLogin()) {
  //   return (
  //     <section className=" h-screen flex justify-center items-center">
  //       <Login />
  //     </section>
  //   );
  // }

  if (!token) {
    return (
      <section className=" h-screen flex justify-center items-center">
        <Loading />
      </section>
    );
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastClient>
          <AnimatePresence key={router.route} exitBeforeEnter>
            <Component {...pageProps} />
            <NavBarWrapper />
            {/* <NavBar navButtons={navButtons} /> */}
          </AnimatePresence>
        </ToastClient>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
