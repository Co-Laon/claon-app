import React from 'react';
import WebView from 'react-native-webview';
import qs from 'querystring';
import axios from 'axios';
import Config from 'react-native-config';

export const InstagramAuthWebView = () => {
    const instagramState = {
        appId: Config.INSTAGRAM_APP_ID,
        appSecret: Config.INSTAGRAM_APP_SECRET_CODE,
        scope: 'user_profile,user_media',
        redirectUrl: Config.REDIRECT_URI
    };
    const { appId, appSecret, scope, redirectUrl } = instagramState;
    console.log(instagramState);
    const url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUrl}&scope=${scope}&response_type=code`;

    const getAccessToken = async (code: string) => {
        let headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        let http = axios.create({
            baseURL: 'https://api.instagram.com/oauth/access_token',
            headers: headers,
        });
        let form = new URLSearchParams();
        form.append('client_id', appId);
        form.append('client_secret', appSecret);
        form.append('grant_type', 'authorization_code');
        form.append('redirect_uri', redirectUrl);
        form.append('code', code);
        let res = await http.post('/', form).catch((error) => {
            console.log(error.response); return false;
        });
        if (res)
            console.log(res);
        else
            console.debug(res);
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
                        .then(res => console.log('access token: ', res))
                        .catch(err => err.response);
                }
            }}
        />
    );
};
export default InstagramAuthWebView;