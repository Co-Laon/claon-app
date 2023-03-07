import { storeData } from './../utils/storage';
import { RootState } from './../store/slices/index';
import {
  KakaoOAuthToken,
  login as kakaoSDKLogin,
} from '@react-native-seoul/kakao-login';
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
import { Alert } from 'react-native';
import { ErrorResponse } from '../types/type';

interface SignInType {
  code: string;
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
  const { authorizeAction: authorize, logoutAction: signOut } = auth;
  const userInfo = useUserInfo();

  const logout = async () => {
    await axios
      .post(api + '/auth/sign-out')
      .then(async (res) => {
        if (res.data?.errorCode) {
          const { errorCode, message }: ErrorResponse = res.data;
          Alert.alert('에러' + errorCode, message + '');
        } else {
          signOut();
          await storeData('access-token', '');
          await storeData('refresh-token', '');
          await storeData('isCompletedSignUp', '');
        }
      })
      .catch((error) => {
        console.log(error.response);
        Alert.alert(
          '에러',
          '서버에 문제가 있습니다. 잠시 후 다시 시도해주세요.'
        );
        throw new Error(error);
      });
  };

  const leaveClaon = async () => {
    await axios
      .delete(api + '/users/me')
      .then(async (res) => {
        if (res.data?.errorCode) {
          const { errorCode, message }: ErrorResponse = res.data;
          Alert.alert('에러' + errorCode, message + '');
        } else {
          signOut();
          await storeData('access-token', '');
          await storeData('refresh-token', '');
          await storeData('isCompletedSignUp', '');
        }
      })
      .catch((error) => {
        console.log(error.response);
        Alert.alert(
          '에러',
          '서버에 문제가 있습니다. 잠시 후 다시 시도해주세요.'
        );
        throw new Error(error);
      });
  };

  const signInWithProvider = async ({ code, provider }: SignInType) => {
    const signValue = await axios
      .post(api + '/auth/sign-in/' + provider, {
        code,
      })
      .then((res) => res.data)
      .then(async (res: User) => {
        authorize(res);
        // 토큰 axios 헤더에 저장
        axios.defaults.headers.common['access-token'] = res.accessToken;
        axios.defaults.headers.common['refresh-token'] = res.refreshToken;
        // 토큰 async storage에 저장
        await storeData('access-token', res.accessToken);
        await storeData('refresh-token', res.refreshToken);
        await storeData(
          'isCompletedSignUp',
          JSON.stringify(res.isCompletedSignUp)
        );
        return res;
      })
      .catch((error) => {
        console.log(error.response);
        Alert.alert(
          '에러',
          '서버에 문제가 있습니다. 잠시 후 다시 시도해주세요.'
        );
      });

    return signValue;
  };

  const kakaoLogin = async () => {
    const token: KakaoOAuthToken = await kakaoSDKLogin();
    const code = token.accessToken;
    if (code) {
      return signInWithProvider({ code, provider: 'KAKAO' });
    }
  };

  const googleConfigure = () => {
    GoogleSignin.configure({
      offlineAccess: true,
      hostedDomain: '',
      webClientId: Config.GOOGLE_WEB_CLIENT_ID,
      iosClientId: Config.GOOGLE_IOS_CLIENT_ID,
    });
  };

  const googleLogin = async () => {
    googleConfigure();
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

  // google 로그인 기록 취소 함수
  const googleSignOut = async () => {
    googleConfigure();
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      await GoogleSignin.signOut();
    }
  };
  // const AppleLogin = () => {}
  return {
    user,
    userInfo,
    authorize,
    leaveClaon,
    kakaoLogin,
    logout,
    googleLogin,
    googleSignOut,
  };
};
