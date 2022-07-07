import { RootState } from './../store/slices/index';
import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import { authorize, logout } from 'climbingapp/src/store/slices/auth';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
      webClientId:
        '163596591416-lr6paol0hmspl6ccium1ghs13at5ivuh.apps.googleusercontent.com',
      iosClientId:
        '163596591416-462nelg5u8mnsoiilcktnc2b9tbajiq1.apps.googleusercontent.com',
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
