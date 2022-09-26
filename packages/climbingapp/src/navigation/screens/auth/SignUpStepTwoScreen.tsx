import { useNavigation } from '@react-navigation/native';
import { AppBar } from 'climbingapp/src/component/appBar/AppBar';
import { NextButton } from 'climbingapp/src/component/button/Button';
import {
  Title,
  TitleContainer,
} from 'climbingapp/src/component/text/AuthTitle';
import { ScreenView } from 'climbingapp/src/component/view/ScreenView';
import { colorStyles } from 'climbingapp/src/styles';
import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { LoginScreenProp } from './type';
import { MyTextInput } from 'climbingapp/src/component/text-input/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'climbingapp/src/store/slices';
import { setNickName } from 'climbingapp/src/store/slices/authInfo';

const ButtonContainer = styled.View`
  flex: 0.5;
  margin-bottom: 24;
`;

const InputContainer = styled.View`
  flex: 1;
`;

const SubText = styled.Text`
  color: ${colorStyles.Black};
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;
function SignUpStepTwoScreen() {
  const navigation = useNavigation<LoginScreenProp>();
  const userInfo = useSelector((state: RootState) => state.authInfo.userInfo);
  const dispatch = useDispatch();

  const handleChangeNickName = (nick: string) => {
    dispatch(setNickName(nick));
  };

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <ScreenView color={colorStyles.White}>
      <AppBar />
      <TitleContainer>
        <Title>다음 항목을</Title>
        <Title>입력해 주세요</Title>
      </TitleContainer>
      <InputContainer>
        <SubText>신장 (Height)</SubText>
        <MyTextInput
          value={userInfo.nickname}
          onChangeText={handleChangeNickName}
          placeholder="신장을 입력해주세요"
        />
      </InputContainer>
      <InputContainer>
        <SubText>암리치 (Arm reach)</SubText>
        <MyTextInput
          value={userInfo.nickname}
          onChangeText={handleChangeNickName}
          placeholder="암리치를 입력해주세요"
        />
      </InputContainer>
      <SubText>Ape Index {4}</SubText>
      <ButtonContainer>
        <NextButton onPress={() => navigation.navigate('connectInsta')} />
      </ButtonContainer>
    </ScreenView>
  );
}

export default SignUpStepTwoScreen;
