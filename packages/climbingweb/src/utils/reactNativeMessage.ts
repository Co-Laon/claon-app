import { isMobile, isAndroid, isIOS } from 'react-device-detect';
import axios from 'axios';

interface Message {
  type: string;
  payload?: any;
}

export const sendReactNativeMessage = ({ type, payload }: Message) => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type, payload }));
  }
};
export const getReactNativeMessage = () => {
  if (!isMobile) {
    return;
  }

  const listener = (event: any) => {
    const parsedData: { type: string; payload: any } = JSON.parse(event.data);
    if (parsedData?.type === 'messageFromApp') {
      axios.defaults.headers.common['access-token'] =
        parsedData.payload?.['access-token'];
      axios.defaults.headers.common['refresh-token'] =
        parsedData.payload?.['refresh-token'];
      sendReactNativeMessage({ type: 'webReceiveTheToken' });
    }
  };
  if (isAndroid) {
    document.addEventListener('message', listener);
  }
  if (isIOS) {
    window.addEventListener('message', listener);
  }
};
