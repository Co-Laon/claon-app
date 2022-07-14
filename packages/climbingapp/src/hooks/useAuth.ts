import { RootState } from './../store/slices/index';
import KakaoSDK from '@actbase/react-kakaosdk';
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
    await KakaoSDK.init(Config.KAKAO_APP_KEY);
    const token = await KakaoSDK.login();
    console.log('token', token);
    auth.authorize({ platform: 'kakao', token });
    console.log(user);
    const profile = await KakaoSDK.getProfile();
    console.log(profile);
  };

  const GoogleLogin = async () => {
    GoogleSignin.configure({
      offlineAccess: true,
      hostedDomain: '',
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
