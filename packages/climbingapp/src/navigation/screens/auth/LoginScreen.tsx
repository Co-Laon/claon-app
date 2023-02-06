import { useNavigation } from '@react-navigation/native';
import { DefaultButton } from 'climbingapp/src/component/button/Button';
import {
  Kakao,
  Apple,
  Google,
} from 'climbingapp/src/component/button/buttonProps';
import { ScreenView } from 'climbingapp/src/component/view/ScreenView';
import { colorStyles } from 'climbingapp/src/styles';
import React from 'react';
//import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { LoginScreenProp } from './type';
import { useAuth } from 'climbingapp/src/hooks/useAuth';
import { Alert, Platform } from 'react-native';
import { ErrorResponse } from 'climbingapp/src/types/type';
import { User } from 'climbingapp/src/store/slices/auth';

const EmptyConatiner = styled.View`
  flex: 0.5;
  height: 56px;
`;

const TitleContainer = styled.View`
  flex: 0.3;
  justify-content: center;
`;

const Title = styled.Text`
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  color: ${colorStyles.Gray800};
`;

const ButtonContainer = styled.View`
  flex: 0.3;
`;

const KakaoButton = ({ onPress }: { onPress: ({ }: any) => void }) => {
  return <DefaultButton {...Kakao} onPress={onPress} />;
};

const AppleButton = ({ onPress }: { onPress: ({ }: any) => void }) => {
  return <DefaultButton {...Apple} onPress={onPress} />;
};
const GoogleButton = ({ onPress }: { onPress: ({ }: any) => void }) => {
  return <DefaultButton {...Google} onPress={onPress} />;
};
function LoginScreen() {
  const navigation = useNavigation<LoginScreenProp>();

  const { kakaoLogin, googleLogin } = useAuth();

  const handleAfterOAuth = (res: void | User | ErrorResponse) => {
    if (res) {
      if (res.hasOwnProperty('errorCode')) {
        const { errorCode, message } = res as ErrorResponse;
        Alert.alert(errorCode + '', message + '');
        throw new Error(message + '');
      } else {
        const { isCompletedSignUp } = res as User;
        if (isCompletedSignUp) {
          navigation.reset({ routes: [{ name: 'home' }] });
        } else {
          navigation.navigate('register');
        }
      }
    }
  };

  const handleSignApple = () => {
    navigation.navigate('register');
  };

  const handleSignGoogle = async () => {
    await googleLogin().then(handleAfterOAuth);
  };
  const handleSignKakao = async () => {
    await kakaoLogin().then(handleAfterOAuth);
  };


  return (
    <ScreenView color="white">
      <EmptyConatiner />
      <TitleContainer>
        <Title>간편하게 로그인하고</Title>
        <Title>클라온을 시작해 보세요!</Title>
      </TitleContainer>
      <ButtonContainer>
        <KakaoButton onPress={handleSignKakao} />
        {Platform.OS === 'ios' && <AppleButton onPress={handleSignApple} />}
        <GoogleButton onPress={handleSignGoogle} />
      </ButtonContainer>
      <EmptyConatiner />
    </ScreenView>
  );
}

export default LoginScreen;
