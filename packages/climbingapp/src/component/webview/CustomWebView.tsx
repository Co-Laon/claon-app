import { useNavigation } from '@react-navigation/native';
import { useAuth } from 'climbingapp/src/hooks/useAuth';
import { LoginScreenProp } from 'climbingapp/src/navigation/screens/auth/type';
import { injectedScriptForWebViewBackButton } from 'climbingapp/src/utils/constants';
import { storeData } from 'climbingapp/src/utils/storage';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';

interface WebInfo {
  url: string;
}

export default function CustomWebView({ url }: WebInfo) {
  const webviewRef = useRef<WebView>(null);
  const { user, logout } = useAuth();
  const navigation = useNavigation<LoginScreenProp>();

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

  const [isCanGoBack, setIsCanGoBack] = useState(false);
  const onPressHardwareBackButton = () => {
    if (webviewRef.current && isCanGoBack) {
      webviewRef.current.goBack();
      return true;
    } else {
      return false;
    }
  };

  const onMessageHandler = ({ nativeEvent: state }: WebViewMessageEvent) => {
    if (state.data === typeof JSON) {
      const data = JSON.parse(state.data);
      if (data.type === 'updateToken') {
        handleUpdateToken(data);
      }
      if (data.type === 'logout') {
        logout();
        navigation.reset({ routes: [{ name: 'login' }] });
      }
    }
    if (state.data === 'navigationStateChange') {
      setIsCanGoBack(state.canGoBack);
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onPressHardwareBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onPressHardwareBackButton);
    };
  }, [isCanGoBack]);

  return (
    <>
      <WebView
        ref={webviewRef}
        onLoad={sendTokenToWebview}
        onMessage={onMessageHandler}
        javaScriptEnabled={true}
        source={{ uri: url }}
        overScrollMode="never"
        injectedJavaScript={injectedScriptForWebViewBackButton}
      />
    </>
  );
}
