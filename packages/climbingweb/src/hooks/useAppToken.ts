import axios from 'axios';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';
import { useRNMessage } from './useRNMessage';

export const useAppToken = () => {
  const { token, sendReactNativeMessage } = useRNMessage();

  useIsomorphicLayoutEffect(() => {
    if (token) {
      axios.defaults.headers.common['access-token'] = token.accessToken;
      axios.defaults.headers.common['refresh-token'] = token.refreshToken;
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
  }, [token]);

  return {
    token,
  };
};
