import { useNavigation } from '@react-navigation/native';
import { AppBar } from 'climbingapp/src/component/appBar/AppBar';
import { NextButton } from 'climbingapp/src/component/button/Button';
import {
  Title,
  TitleContainer,
} from 'climbingapp/src/component/text/AuthTitle';
import { ScreenView } from 'climbingapp/src/component/view/ScreenView';
import { colorStyles } from 'climbingapp/src/styles';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { LoginScreenProp } from './type';
import { Text } from 'react-native';
import { MyTextInput } from 'climbingapp/src/component/text-input/TextInput';
import { ProfileImage } from 'climbingapp/src/component/profile-image/ProfileImage';
import { useDispatch } from 'react-redux';
import { setNickName } from 'climbingapp/src/store/slices/authInfo';
import { debounce } from 'lodash';
import { api } from 'climbingapp/src/utils/constants';

import axios from 'axios';
import { vs } from 'react-native-size-matters';
import { useAuth } from 'climbingapp/src/hooks/useAuth';

const ButtonContainer = styled.View`
  flex: 0.5;
  position: absolute;
  width: 100%;
  bottom: 24px;
  height: ${vs(56)}px;
`;

const ProfileContainer = styled.View`
  flex: 1;
`;

const NickNameContainer = styled.View`
  flex: 2;
`;

const SubText = styled.Text`
  color: ${colorStyles.Black};
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  margin-bottom: ${vs(8)}px;
`;
const ErrorText = styled.Text`
  margin: 5px;
  color: ${colorStyles.Red500};
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;

function SignUpStepOneScreen() {
  const navigation = useNavigation<LoginScreenProp>();
  const { userInfo } = useAuth();
  const { nickname } = userInfo;
  const [isDuplicated, setIsDuplicated] = useState<boolean>(false);
  const [isErrorNickName, setIsErrorNickName] = useState<string>('');
  const isDisabled = nickname === '' || isErrorNickName !== '' || isDuplicated;
  const dispatch = useDispatch();

  const handleCheckDuplicated = debounce(async (nick: string | undefined) => {
    if (nick === '') return;
    await axios
      .get(api + `/auth/nickname/${nick}/duplicate-check`)
      .then((res) => setIsDuplicated(res.data.result));
  }, 800);

  const handleNickNameErrorMessage = debounce(
    (nick: string, duplicated: boolean) => {
      let errorMessage = '';
      if (!/^[0-9a-zA-Z가-힣]{2,20}$/gi.test(nick))
        errorMessage = '닉네임 규칙을 지켜주세요';
      else if (duplicated) {
        errorMessage = '닉네임이 중복되었습니다!';
      }
      setIsErrorNickName(errorMessage);
    },
    800
  );

  useEffect(() => {
    handleCheckDuplicated(nickname);
    handleNickNameErrorMessage(nickname + '', isDuplicated);
  }, [nickname]);


  const handleChangeNickName = (nick: string) => {
    dispatch(setNickName(nick));
  };

  return (
    <ScreenView color={colorStyles.White}>
      <AppBar />
      <TitleContainer>
        <Title>다음 항목을</Title>
        <Title>입력해 주세요</Title>
      </TitleContainer>
      <ProfileContainer>
        <SubText>프로필 사진</SubText>
        <ProfileImage icon="camera" />
      </ProfileContainer>
      <NickNameContainer>
        <SubText>
          닉네임 <Text style={{ color: '#FF0000' }}>*</Text>{' '}
        </SubText>
        <MyTextInput
          value={nickname + ''}
          onChangeText={handleChangeNickName}
          placeholder="한글, 영문, 숫자 포함 2-20자"
        />
        <ErrorText>{isErrorNickName}</ErrorText>
      </NickNameContainer>
      <ButtonContainer>
        <NextButton
          disabled={isDisabled}
          onPress={() => navigation.navigate('signUpStepTwo')}
        />
      </ButtonContainer>
    </ScreenView>
  );
}

export default SignUpStepOneScreen;
