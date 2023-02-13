import { useNavigation } from '@react-navigation/native';
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
import React, { useEffect } from 'react';
import { vs } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { LoginScreenProp } from './type';
import { Alert } from 'react-native';
import { Skip } from 'climbingapp/src/component/appBar/Skip';
import {
  signUp,
  uploadProfileImage,
} from 'climbingapp/src/hooks/queries/sign/queries';
import { defaultImage } from 'climbingapp/src/utils/constants';
import { useSelector } from 'react-redux';
import { RootState } from 'climbingapp/src/store/slices';
import { errorMessage } from 'climbingapp/src/utils/errorMessage';

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

  const profileFile = useSelector(
    (state: RootState) => state.s3util.profileImage
  );
  const handleConnectInstagram = () => {
    navigation.navigate('instagram');
  };
  const { userInfo } = useAuth();
  const { instagramOAuthId } = userInfo;

  const handleSignUp = async () => {
    const profileImage = {
      uri: profileFile?.uri,
      type: profileFile?.type,
      name: profileFile?.fileName,
    };
    const formData = new FormData();
    formData.append('image', profileImage);

    let S3ProfilePath = defaultImage;
    if (userInfo.imagePath) {
      await uploadProfileImage(formData)
        .then((res) => {
          S3ProfilePath = res;
        })
        .catch((err) => {
          Alert.alert(
            '에러 ' + err.response.data ? err.response.data?.errorCode : '',
            err.response.data
              ? err.response.data.message
              : errorMessage.IMAGE_UPLOAD_ERROR,
            [
              {
                text: '돌아가기',
                style: 'cancel',
              },
            ]
          );
        });
    }

    await signUp({ ...userInfo, imagePath: S3ProfilePath })
      .then(() => {
        navigation.reset({ routes: [{ name: 'welcome' }] });
      })
      .catch((err) => {
        Alert.alert(
          '에러 ' + err.response.data ? err.response.data?.errorCode : '',
          err.response.data
            ? err.response.data.message
            : errorMessage.SERVER_ERROR,
          [
            {
              text: '돌아가기',
              style: 'cancel',
            },
          ]
        );
      });
  };

  useEffect(() => {
    navigation.setOptions({
      animation: 'slide_from_right',
      headerRight: () => <Skip onPress={handleSignUp} />,
    });
  }, []);

  return (
    <ScreenView color="white">
      <TitleContainer>
        <Title>인스타그램을</Title>
        <Title>연결해 주세요</Title>
        <SubText>다음 버전에 출시될 기능입니다.</SubText>
      </TitleContainer>
      <ProfileContainer>
        <InstaImage />
        <Name></Name>
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
