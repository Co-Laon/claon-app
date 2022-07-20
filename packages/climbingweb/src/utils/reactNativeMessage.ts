import { isMobile, isAndroid, isIOS } from 'react-device-detect';

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
    const parsedData = JSON.parse(event.data);
    if (parsedData?.type === 'messageFromApp') {
      //setMessageFromApp(parsedData?.payload);
      sendReactNativeMessage({ type: 'webReceiveTheToken' });
    }
  };

  if (window.ReactNativeWebView) {
    if (isAndroid) {
      document.addEventListener('message', listener);
    }
    if (isIOS) {
      window.addEventListener('message', listener);
    }
  }
};
