import CustomWebView from 'climbingapp/src/component/webview/CustomWebView';
import React from 'react';
import Config from 'react-native-config';

function HomeScreen() {
  return <CustomWebView url={Config.URL} />;
}

export default HomeScreen;
