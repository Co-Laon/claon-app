import { RootState } from './../store/slices/index';
import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import { authorize, logout } from 'climbingapp/src/store/slices/auth';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

const useUser = () => {
  return useSelector((state: RootState) => state.auth.user);
};

const useAuthActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ authorize, logout }, dispatch);
};

export const useAuth = () => {
  const user = useUser();
  const auth = useAuthActions();

  const KakaoLogin = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    console.log('token', token);
    auth.authorize({ platform: 'kakao', token });
    console.log(user);
  };

  const GoogleLogin = async () => {
    GoogleSignin.configure({
      webClientId: Config.GOOGLE_WEB_CLIENT_ID,
      iosClientId: Config.GOOGLE_IOS_CLIENT_ID,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const token = await GoogleSignin.signIn();
      console.log(token);
      auth.authorize({ platform: 'google', token });
    } catch (err) {
      console.log(err);
    }
  };

  const KakaoLogout = async (): Promise<void> => {
    const message = await logout();
    console.log(message);
    logout();
  };

  // const AppleLogin = () => {}
  return { user, KakaoLogin, KakaoLogout, GoogleLogin };
};
