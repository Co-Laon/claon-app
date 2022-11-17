import { isAndroid, isIOS } from 'react-device-detect';
import { useEffect, useState } from 'react';

interface Message {
  type: string;
  payload?: any;
}

interface Token {
  accessToken: string | number | boolean;
  refreshToken: string | number | boolean;
}

export const useRNMessage = () => {
  const [message, setMessage] = useState(null);
  const [token, setToken] = useState<Token>();

  const sendReactNativeMessage = ({ type, payload }: Message) => {
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type, payload }));
    }
  };

  useEffect(() => {
    const listener = (event: any) => {
      const parsedData: { type: string; payload: any } = JSON.parse(event.data);
      if (parsedData?.type === 'messageFromApp') {
        setMessage(parsedData.payload);
      }
      if (parsedData?.type === 'token') {
        setToken({
          accessToken: parsedData.payload['access-token'],
          refreshToken: parsedData.payload['refresh-token'],
        });
        sendReactNativeMessage({ type: 'webReceiveTheToken' });
      }
    };
    if (isAndroid) {
      document.addEventListener('message', listener);
    }
    if (isIOS) {
      window.addEventListener('message', listener);
    }
    //eslint-disable-next-line
  }, []);

  return {
    message,
    sendReactNativeMessage,
    token,
  };
};
