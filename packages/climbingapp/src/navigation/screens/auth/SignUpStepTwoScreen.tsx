import { useNavigation } from '@react-navigation/native';
import { AppBar } from 'climbingapp/src/component/appBar/AppBar';
import { NextButton } from 'climbingapp/src/component/button/Button';
import {
  Title,
  TitleContainer,
} from 'climbingapp/src/component/text/AuthTitle';
import { ScreenView } from 'climbingapp/src/component/view/ScreenView';
import { colorStyles } from 'climbingapp/src/styles';
import React from 'react';
import styled from 'styled-components/native';
import { LoginScreenProp } from './type';
import { MyTextInput } from 'climbingapp/src/component/text-input/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'climbingapp/src/store/slices';
import { setArmReach, setHeight } from 'climbingapp/src/store/slices/authInfo';
import { vs } from 'react-native-size-matters';

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 24px;
  width: 100%;
  height: ${vs(56)}px;
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

  const isNumbertype = (nick: string) => /(^\d+$)|(^\d+\.\d{0,2}$)/.test(nick);

  const handleChangeHeight = (nick: string) => {
    if (isNumbertype(nick) || nick === '') dispatch(setHeight(nick));
  };
  const handleChangeArmReach = (nick: string) => {
    if (isNumbertype(nick) || nick === '') dispatch(setArmReach(nick));
  };

  const { armReach, height } = userInfo;
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
          value={height}
          onChangeText={handleChangeHeight}
          placeholder="173.3"
        />
      </InputContainer>
      <InputContainer>
        <SubText>암리치 (Arm reach)</SubText>
        <MyTextInput
          value={armReach}
          onChangeText={handleChangeArmReach}
          placeholder="173.3"
        />
      </InputContainer>
      {height && armReach ? (
        <SubText>
          Ape Index {(parseFloat(armReach) - parseFloat(height)).toFixed(2)} cm
        </SubText>
      ) : null}
      <ButtonContainer>
        <NextButton onPress={() => navigation.navigate('connectInsta')} />
      </ButtonContainer>
    </ScreenView>
  );
}

export default SignUpStepTwoScreen;
