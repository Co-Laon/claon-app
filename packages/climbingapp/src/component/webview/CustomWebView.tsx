import { useAuth } from 'climbingapp/src/hooks/useAuth';
import { storeData } from 'climbingapp/src/utils/storage';
import React, { useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';

interface WebInfo {
  url: string;
}

export default function CustomWebView({ url }: WebInfo) {
  const webviewRef = useRef<WebView>(null);
  const { user, logout } = useAuth();
  const sendTokenToWebview = () => {
    if (user) {
      const { accessToken, refreshToken } = user;
      const token = {
        'access-token': accessToken,
        'refresh-token': refreshToken,
      };
      const message = {
        type: 'token',
        payload: token,
      };

      webviewRef.current?.postMessage(JSON.stringify(message));
    }
  };
  const handleUpdateToken = async ({ payload }: any) => {
    const { 'access-token': accessToken, 'refresh-token': refreshToken } =
      JSON.parse(payload);
    await storeData('access-token', accessToken);
    await storeData('refresh-token', refreshToken);
  };

  useEffect(() => {
    sendTokenToWebview();
  }, []);

  return (
    <>
      <WebView
        ref={webviewRef}
        onLoad={sendTokenToWebview}
        onMessage={(e) => {
          const data = JSON.parse(e.nativeEvent.data);
          if (data.type === 'updateToken') {
            handleUpdateToken(data);
          }
          if (data.type === 'logout') {
            logout();
          }
        }}
        javaScriptEnabled={true}
        source={{ uri: url }}
        overScrollMode="never"
      />
    </>
  );
}
