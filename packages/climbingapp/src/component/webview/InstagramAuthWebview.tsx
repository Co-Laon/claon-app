import React from 'react';
import WebView from 'react-native-webview';
import qs from 'querystring';
import axios from 'axios';

interface InstaAuthProps {
    appId: string;
    appSecret: string;
    scope: string;
    redirectUrl: string;
}

export function InstagramAuthWebView({ appId, appSecret, scope, redirectUrl }: InstaAuthProps) {
    const url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUrl}&scope=${scope}&response_type=code`;

    const getAccessToken = async (code: string) => {
        const form = new URLSearchParams();
        form.append('client_id', appId);
        form.append('client_secret', appSecret);
        form.append('grant_type', 'authorization_code');
        form.append('code', code);
        form.append('redirect_uri', redirectUrl);
        await axios.post('https://api.instagram.com/oauth/access_token', form);
    };

    return (
        <WebView
            source={{ uri: url }}
            onNavigationStateChange={async e => {
                const match: any = e.url.match(/(#|\?)(.*)/);
                const result: any = qs.parse(match[2]);
                const code = result.code?.slice(0, result.code.length - 2);
                console.log(code);
                if (code) {
                    await getAccessToken(code)
                        .then(res => console.log(res));
                }
            }}
        />
    );
} 