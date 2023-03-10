import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import AgreeInfoScreen from './screens/auth/AgreeInfoScreen';
import SignUpStepOneScreen from './screens/auth/SignUpStepOneScreen';
import ConnectWithInstagramScreen from './screens/auth/ConnectWithInstagramScreen';
import WelcomeScreen from './screens/auth/WelcomeScreen';
import InstagramAuthWebView from '../component/webview/InstagramAuthWebview';
import Config from 'react-native-config';
import SignUpStepTwoScreen from './screens/auth/SignUpStepTwoScreen';
import HomeScreen from './screens/main/HomeScreen';
import { useAuth } from '../hooks/useAuth';
import { useGetTokenFromStorage } from '../hooks/useGetTokenFromStorage';
import { Back } from '../component/appBar/Back';
const Stack = createNativeStackNavigator();

const LoginNavigator = () => {
  const instagramInitalValue = {
    appId: Config.INSTAGRAM_APP_ID,
    appSecret: Config.INSTAGRAM_APP_SECRET_CODE,
    scpoe: 'user_profile,user_media',
    redirectUrl: Config.REDIRECT_URI,
  };
  const { user } = useAuth();
  const { loading } = useGetTokenFromStorage();

  if (loading) {
    // 추후 스플래시 이미지 추가
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTitle: '',
        headerLeft: () => <Back />,
      }}
      initialRouteName={user?.isCompletedSignUp ? 'home' : 'login'}
    >
      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="register"
        component={RegisterScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="agreeInfo"
        component={AgreeInfoScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="signUpStepOne"
        component={SignUpStepOneScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="signUpStepTwo"
        component={SignUpStepTwoScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ animation: 'simple_push', headerShown: false }}
      />
      <Stack.Screen
        name="connectInsta"
        component={ConnectWithInstagramScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="instagram"
        initialParams={instagramInitalValue}
        component={InstagramAuthWebView}
      />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
