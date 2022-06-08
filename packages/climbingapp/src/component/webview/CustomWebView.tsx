import React from 'react';
import { WebView } from 'react-native-webview';

interface WebInfo {
    url: string;
}

export default function CustomWebView({ url }: WebInfo) {
    return (
        <WebView
            source={{ uri: url }}
        />
    );
}