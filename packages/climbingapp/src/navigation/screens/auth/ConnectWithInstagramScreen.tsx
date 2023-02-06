import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AppBar } from 'climbingapp/src/component/appBar/AppBar';
import {
  DefaultButton,
  NextButton,
} from 'climbingapp/src/component/button/Button';
import { Instagram } from 'climbingapp/src/component/button/buttonProps';
import { InstaImage } from 'climbingapp/src/component/profile-image/InstaImage';
import {
  Title,
  TitleContainer,
} from 'climbingapp/src/component/text/AuthTitle';
import { ScreenView } from 'climbingapp/src/component/view/ScreenView';
import { useAuth } from 'climbingapp/src/hooks/useAuth';
import { colorStyles } from 'climbingapp/src/styles';
import { api } from 'climbingapp/src/utils/constants';
import React from 'react';
import { vs } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { LoginScreenProp } from './type';
import { Alert } from 'react-native';
import { Skip } from 'climbingapp/src/component/appBar/Skip';

const ButtonContainer = styled.View`
  height: ${vs(56)}px;
  width: 100%;
  margin-bottom: 24px;
`;
const SubText = styled.Text`
  font-size: 14px;
  color: ${colorStyles.Gray600};
  line-height: 20px;
  margin-top: 16px;
`;

const Name = styled.Text`
  color: ${colorStyles.Black};
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  margin-bottom: ${vs(8)}px;
`;

const ProfileContainer = styled.View`
  flex: 1.5;
  align-items: center;
  margin-bottom: 100px;
`;

const InstagramButton = ({ onPress }: { onPress: ({}: any) => void }) => {
  return <DefaultButton {...Instagram} onPress={onPress} disabled={true} />;
};

function ConnectWithInstagramScreen() {
  const navigation = useNavigation<LoginScreenProp>();
  const handleConnectInstagram = () => {
    navigation.navigate('instagram');
  };
  const { user, userInfo } = useAuth();
  const { instagramOAuthId } = userInfo;
  const handleSignUp = async () => {
    await axios
      .post(api + '/auth/sign-up', userInfo, {
        headers: {
          'access-token': user?.accessToken + '',
          'refresh-token': user?.refreshToken + '',
        },
      })
      .then(() => {
        navigation.reset({ routes: [{ name: 'welcome' }] });
      })
      .catch((err) => {
        Alert.alert(
          '에러' + err.response.data ? err.response.data?.errorCode : '',
          err.response.data
            ? err.response.data.message
            : '서버에 문제가 있습니다. 잠시 후 다시 시도해주세요.',
          [
            {
              text: '돌아가기',
              style: 'cancel',
            },
          ]
        );
      });
  };

  return (
    <ScreenView color="white">
      <AppBar rightNode={<Skip onPress={handleSignUp} />} />
      <TitleContainer>
        <Title>인스타그램을</Title>
        <Title>연결해 주세요</Title>
        <SubText>다음 버전에 출시될 기능입니다.</SubText>
      </TitleContainer>
      <ProfileContainer>
        <InstaImage />
        <Name>asdf</Name>
        <ButtonContainer>
          <InstagramButton onPress={handleConnectInstagram} />
        </ButtonContainer>
      </ProfileContainer>
      <ButtonContainer>
        <NextButton
          onPress={handleSignUp}
          text="완료"
          disabled={!instagramOAuthId}
        />
      </ButtonContainer>
    </ScreenView>
  );
}

export default ConnectWithInstagramScreen;
