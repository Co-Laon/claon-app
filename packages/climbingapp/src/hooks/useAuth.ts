import { storeData } from './../utils/storage';
import { RootState } from './../store/slices/index';
import KakaoSDK from '@actbase/react-kakaosdk';
import { authorize, logout } from 'climbingapp/src/store/slices/auth';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import { api } from '../utils/constants';
import axios from 'axios';
import { AccessTokenType } from '@actbase/react-kakaosdk/lib/types';

interface SignInType {
  code: string | AccessTokenType;
  provider: 'KAKAO' | 'GOOGLE' | 'APPLE';
}

const useUser = () => {
  return useSelector((state: RootState) => state.auth.user);
};

const useUserInfo = () => {
  return useSelector((state: RootState) => state.authInfo.userInfo);
};

const useAuthActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ authorize, logout }, dispatch);
};

export const useAuth = () => {
  const user = useUser();
  const auth = useAuthActions();
  const userInfo = useUserInfo();

  const signInWithProvider = async ({ code, provider }: SignInType) => {
    await axios
      .post(api + '/auth/sign-in/' + provider, {
        code,
      })
      .then((res) => res.data)
      .then((res) => {
        auth.authorize(res);
        storeData('access-token', res.accessToken);
        storeData('refresh-token', res.refreshToken);
      })
      .catch((error) => console.log(error));
  };

  const kakaoLogin = async (): Promise<void> => {
    try {
      await KakaoSDK.init(Config.KAKAO_APP_KEY);
      const token = await KakaoSDK.login();
      const code = token?.access_token;
      if (code) {
        signInWithProvider({ code, provider: 'KAKAO' });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const googleLogin = async () => {
    GoogleSignin.configure({
      offlineAccess: true,
      hostedDomain: '',
      webClientId: Config.GOOGLE_WEB_CLIENT_ID,
      iosClientId: Config.GOOGLE_IOS_CLIENT_ID,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken: code } = await GoogleSignin.signIn();
      if (code) {
        signInWithProvider({ code, provider: 'GOOGLE' });
      }
    } catch (err) {
      console.log(err);
    }
  };
  // const AppleLogin = () => {}
  return { user, userInfo, authorize, kakaoLogin, logout, googleLogin };
};
