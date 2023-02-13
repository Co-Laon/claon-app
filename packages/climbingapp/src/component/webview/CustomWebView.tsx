import { useNavigation } from '@react-navigation/native';
import { useAuth } from 'climbingapp/src/hooks/useAuth';
import { LoginScreenProp } from 'climbingapp/src/navigation/screens/auth/type';
import { injectedScriptForWebViewBackButton } from 'climbingapp/src/utils/constants';
import { storeData } from 'climbingapp/src/utils/storage';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Platform, ToastAndroid } from 'react-native';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { isJsonString } from 'climbingapp/src/utils/isJsonString';
interface WebInfo {
  url: string;
}

export default function CustomWebView({ url }: WebInfo) {
  const webviewRef = useRef<WebView>(null);
  const { user, logout, leaveClaon } = useAuth();
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

  const onMessageHandler = async ({ nativeEvent: state }: WebViewMessageEvent) => {
    console.log(state.data);
    if (isJsonString(state.data)) {
      const data = JSON.parse(state.data);
      if (data.type === 'updateToken') {
        handleUpdateToken(data);
      } else if (data.type === 'logout') {
        console.log('sdsdfsd');
        await logout()
          .then(() => {
            if (Platform.OS === 'android') {
              ToastAndroid.show('로그아웃 되었습니다', 3);
            }
          })
          .then(() => navigation.reset({ routes: [{ name: 'login' }] }));
      } else if (data.type === 'leave') {
        await leaveClaon()
          .then(() => {
            if (Platform.OS === 'android') {
              ToastAndroid.show('회원탈퇴 되었습니다', 3);
            }
          })
          .then(() => navigation.reset({ routes: [{ name: 'login' }] }));
      }
    } else if (state.data === 'navigationStateChange') {
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
        setBuiltInZoomControls={false}
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
