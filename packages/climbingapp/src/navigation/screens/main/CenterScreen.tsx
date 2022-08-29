import CustomWebView from 'climbingapp/src/component/webview/CustomWebView';
import React from 'react';
import Config from 'react-native-config';

function MapScreen() {
    const CenterPage = '/CenterPage';
    return <CustomWebView url={Config.URL + CenterPage} />;
}

export default MapScreen;