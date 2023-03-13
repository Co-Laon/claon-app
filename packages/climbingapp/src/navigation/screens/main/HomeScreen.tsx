import CustomWebView from 'climbingapp/src/component/webview/CustomWebView';
import React from 'react';
import Config from 'react-native-config';
import { SafeAreaView } from 'react-native-safe-area-context';

function HomeScreen() {
  return <SafeAreaView edges={['right', 'left', 'top']} style={{ flex: 1, backgroundColor: 'white' }}><CustomWebView url={Config.URL} /></SafeAreaView>;
}

export default HomeScreen;
