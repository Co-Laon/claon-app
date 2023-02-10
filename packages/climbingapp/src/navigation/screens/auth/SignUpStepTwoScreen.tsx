import { useNavigation } from '@react-navigation/native';
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
import { MyTextInput } from 'climbingapp/src/component/text-input/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'climbingapp/src/store/slices';
import { setArmReach, setHeight } from 'climbingapp/src/store/slices/authInfo';
import { vs } from 'react-native-size-matters';
import { Skip } from 'climbingapp/src/component/appBar/Skip';

const ButtonContainer = styled.View`
  bottom: 24px;
  width: 100%;
  height: ${vs(56)}px;
  position: absolute;
`;

const InputContainer = styled.View`
  flex: 2.5;
`;

const SubText = styled.Text`
  color: ${colorStyles.Black};
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  margin-top: ${vs(24)}px;
`;

function SignUpStepTwoScreen() {
  const navigation = useNavigation<LoginScreenProp>();
  const userInfo = useSelector((state: RootState) => state.authInfo.userInfo);
  const [disabled, setDisabled] = useState<boolean>(true);
  const { armReach, height } = userInfo;
  const dispatch = useDispatch();

  const isNumbertype = (nick: string) => /(^\d+$)|(^\d+\.\d{0,2}$)/.test(nick);

  const handleChangeHeight = (nick: string) => {
    if (isNumbertype(nick) || nick === '') dispatch(setHeight(nick));
  };
  const handleChangeArmReach = (nick: string) => {
    if (isNumbertype(nick) || nick === '') dispatch(setArmReach(nick));
  };
  const handleGoToNext = () => {
    navigation.navigate('connectInsta');
  };

  useEffect(() => {
    setDisabled(!(height && armReach));
  }, [height, armReach]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Skip onPress={handleGoToNext} />,
    });
  }, []);

  return (
    <ScreenView color={colorStyles.White}>
      <TitleContainer>
        <Title>다음 항목을</Title>
        <Title>입력해 주세요</Title>
      </TitleContainer>
      <InputContainer>
        <SubText>신장 (Height)</SubText>
        <MyTextInput
          value={height + ''}
          onChangeText={handleChangeHeight}
          placeholder="173.3"
          keyboardType="numeric"
        />
        <SubText>암리치 (Arm reach)</SubText>
        <MyTextInput
          value={armReach + ''}
          onChangeText={handleChangeArmReach}
          placeholder="173.3"
          keyboardType="numeric"
        />
        <SubText>
          Ape Index{' '}
          {armReach &&
            height &&
            (parseFloat(armReach) - parseFloat(height)).toFixed(1)}
        </SubText>
      </InputContainer>
      <ButtonContainer>
        <NextButton
          onPress={() => navigation.navigate('connectInsta')}
          disabled={disabled}
        />
      </ButtonContainer>
    </ScreenView>
  );
}

export default SignUpStepTwoScreen;
