import { storeData } from './../utils/storage';
import { RootState } from './../store/slices/index';
import KakaoSDK from '@actbase/react-kakaosdk';
import {
  authorizeAction,
  logoutAction,
  User,
} from 'climbingapp/src/store/slices/auth';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import { api } from '../utils/constants';
import axios from 'axios';
import { AccessTokenType } from '@actbase/react-kakaosdk/lib/types';
import { Alert } from 'react-native';

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
  return bindActionCreators({ authorizeAction, logoutAction }, dispatch);
};

export const useAuth = () => {
  const user = useUser();
  const auth = useAuthActions();
  const { authorizeAction: authorize, logoutAction: logout } = auth;
  const userInfo = useUserInfo();

  const signInWithProvider = async ({ code, provider }: SignInType) => {
    const signValue = await axios
      .post(api + '/auth/sign-in/' + provider, {
        code,
      })
      .then((res) => res.data)
      .then(async (res: User) => {
        authorize(res);
        console.log(res);
        await storeData('access-token', res.accessToken);
        await storeData('refresh-token', res.refreshToken);
        await storeData(
          'isCompletedSignUp',
          JSON.stringify(res.isCompletedSignUp)
        );
        return res;
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          '에러',
          '서버에 문제가 있습니다. 잠시 후 다시 시도해주세요.'
        );
      });

    return signValue;
  };

  const kakaoLogin = async () => {
    await KakaoSDK.init(Config.KAKAO_APP_KEY);
    const token = await KakaoSDK.login();
    const code = token?.access_token;
    if (code) {
      return signInWithProvider({ code, provider: 'KAKAO' });
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
        return await signInWithProvider({ code, provider: 'GOOGLE' });
      }
    } catch (err) {
      console.log(err);
    }
  };
  // const AppleLogin = () => {}
  return { user, userInfo, authorize, kakaoLogin, logout, googleLogin };
};
