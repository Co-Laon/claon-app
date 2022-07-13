import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import AgreeInfoScreen from './screens/auth/AgreeInfoScreen';
import EssentialInfoScreen from './screens/auth/EssentialInfoScreen';
import OptionalInfoScreen from './screens/auth/OptionalInfoScreen';
import ConnectWithInstagramScreen from './screens/auth/ConnectWithInstagramScreen';
import WelcomeScreen from './screens/auth/WelcomeScreen';
import InstagramAuthWebView from '../component/webview/InstagramAuthWebview';
import Config from 'react-native-config';
const Stack = createNativeStackNavigator();

const LoginNavigator = () => {
    const instagramInitalValue = {
        appId: Config.INSTAGRAM_APP_ID,
        appSecret: Config.INSTAGRAM_APP_SECRET_CODE,
        scpoe: 'user_profile,user_media',
        redirectUrl: Config.REDIRECT_URI
    };

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={RegisterScreen} />
            <Stack.Screen name="agreeInfo" component={AgreeInfoScreen} />
            <Stack.Screen name="essentialInfo" component={EssentialInfoScreen} />
            <Stack.Screen name="optionalInfo" component={OptionalInfoScreen} />
            <Stack.Screen name='connectInsta' component={ConnectWithInstagramScreen} />
            <Stack.Screen name="welcome" component={WelcomeScreen} />
            <Stack.Screen name="instagram" initialParams={instagramInitalValue} component={InstagramAuthWebView} />
        </Stack.Navigator>
    );
};

export default LoginNavigator;
