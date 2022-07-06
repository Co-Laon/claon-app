import { RootState } from './../store/slices/index';
import { KakaoOAuthToken, login } from '@react-native-seoul/kakao-login';
import { authorize, logout } from 'climbingapp/src/store/slices/auth';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

const useUser = () => {
  return useSelector((state: RootState) => state.auth.user);
};

const useAuthActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators({ authorize, logout }, dispatch);
};

const KakaoLogout = async (): Promise<void> => {
  const message = await logout();
  console.log(message);
  logout();
};
// const GoogleLogin = () => {}
// const AppleLogin = () => {}

export const useAuth = () => {
  const user = useUser();
  const auth = useAuthActions();
  const KakaoLogin = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    console.log('token', token);
    auth.authorize({ token: token });
    console.log(user);
  };
  return { user, KakaoLogin, KakaoLogout };
};
