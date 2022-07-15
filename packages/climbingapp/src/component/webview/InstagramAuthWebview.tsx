import React from 'react';
import WebView from 'react-native-webview';
import qs from 'querystring';
import axios from 'axios';
import Config from 'react-native-config';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenProp } from 'climbingapp/src/navigation/screens/auth/type';

export const InstagramAuthWebView = () => {
    const instagramState = {
        appId: Config.INSTAGRAM_APP_ID,
        scope: 'user_profile,user_media',
        redirectUrl: Config.REDIRECT_URI
    };
    const { URL } = Config;
    const { appId, scope, redirectUrl } = instagramState;
    const url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUrl}&scope=${scope}&response_type=code`;
    const getAccessToken = async (code: string) => {
        let http = axios.create({
            baseURL: URL,
        });
        await http.post('/', { code }).then(res => res.data).catch(err => console.log(err));
    };
    const navigation = useNavigation<LoginScreenProp>();
    return (
        <WebView
            source={{ uri: url }}
            onNavigationStateChange={async e => {
                const match: any = e.url.match(/(#|\?)(.*)/);
                const result: any = qs.parse(match[2]);
                const code = result.code?.slice(0, result.code.length - 2);
                if (code) {
                    console.log(code);
                    await getAccessToken(code).then(res => console.log(res));
                    navigation.goBack();
                }
            }}
        />
    );
};
export default InstagramAuthWebView;