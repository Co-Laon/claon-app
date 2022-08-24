import CustomWebView from 'climbingapp/src/component/webview/CustomWebView';
import React from 'react';
import Config from 'react-native-config';

function MyScreen() {
    const SettingPage = '/SettingPage';
    return <CustomWebView url={Config.URL + SettingPage} />;
}

export default MyScreen;