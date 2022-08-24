import CustomWebView from 'climbingapp/src/component/webview/CustomWebView';
import React from 'react';
import Config from 'react-native-config';

function BoardScreen() {
    const SearchPage = '/SearchPage';
    return <CustomWebView url={Config.URL + SearchPage} />;
}

export default BoardScreen;