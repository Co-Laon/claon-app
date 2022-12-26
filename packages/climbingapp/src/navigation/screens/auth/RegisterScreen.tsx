import { AppBar } from 'climbingapp/src/component/appBar/AppBar';
import { ScreenView } from 'climbingapp/src/component/view/ScreenView';
import { colorStyles } from 'climbingapp/src/styles';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import ArrowRightIcon from 'climbingapp/src/assets/icon/ic_24_arrow_right_gray800.svg';
import { TouchableHighlight, View } from 'react-native';
import { CheckBox } from 'climbingapp/src/component/checkbox/Checkbox';
import { useNavigation } from '@react-navigation/native';
import { LoginScreenProp } from './type';
import {
  Title,
  TitleContainer,
} from 'climbingapp/src/component/text/AuthTitle';
import { NextButton } from 'climbingapp/src/component/button/Button';
import { vs } from 'react-native-size-matters';

const CheckListItem = styled.View`
  flex-direction: row;
  align-items: center;
  height: 45px;
  margin-bottom: ${vs(8)}px;
`;

const CheckListContainer = styled.View`
  flex: 3;
`;

const ButtonContainer = styled.View`
  flex: 0.5;
  position: absolute;
  width: 100%;
  bottom: 24px;
  height: ${vs(56)}px;
`;

const InnerText = styled.Text`
  font-size: 14px;
  color: ${colorStyles.Gray800};
`;

const Divider = styled.View`
  background-color: ${colorStyles.Gray300};
  height: 1px;
  margin-bottom: ${vs(8)}px;
`;

const CheckHeader = ({
  checked,
  onPress,
}: {
  checked: boolean | (({ }: any) => boolean);
  onPress: ({ }: any) => void;
}) => {
  return (
    <CheckListItem>
      <CheckBox checkIcon="face" checked={checked} onPress={onPress} />
      <InnerText style={{ fontWeight: 'bold', marginLeft: 8 }}>
        모두 동의
      </InnerText>
    </CheckListItem>
  );
};

function RegisterScreen() {
  interface CheckData {
    key: number;
    text: string;
    checked: boolean;
    isEssential: boolean;
  }

  const infoData: CheckData[] = [
    {
      key: 1,
      text: '[필수] 이용약관',
      checked: false,
      isEssential: true,
    },
    {
      key: 2,
      text: '[필수] 개인정보수집 및 이용동의',
      checked: false,
      isEssential: true,
    },
    {
      key: 3,
      text: '[선택] 이벤트 알림, 이메일, 문자, 앱 푸시',
      checked: false,
      isEssential: false,
    },
  ];

  const navigation = useNavigation<LoginScreenProp>();
  const [checkList, setCheckList] = useState(infoData);
  const [disabled, setDisabled] = useState(true);

  const checkedAll = () => checkList.every(({ checked }) => checked);
  const checkDisabled = () => {
    setDisabled(() => !checkList
      .filter(({ isEssential }) => isEssential)
      .every(({ checked }) => checked));
  };

  const handleCheckAll = useCallback(() => {
    const value = checkedAll();
    const values = checkList.map((check) => {
      return { ...check, checked: !value };
    });
    setCheckList(values);
  }, [checkList, checkedAll]);

  const handleCheck = (check: CheckData) => {
    const values = checkList.map((x) =>
      x.key === check.key ? { ...x, checked: !x.checked } : x
    );
    setCheckList(values);
  };

  useEffect(() => {
    checkDisabled();
  }, [checkList]);

  return (
    <ScreenView color="white">
      <AppBar />
      <TitleContainer>
        <Title>클라온 이용 약관에</Title>
        <Title>동의해 주세요</Title>
      </TitleContainer>
      <CheckListContainer>
        <CheckHeader checked={checkedAll()} onPress={handleCheckAll} />
        <Divider />
        {checkList?.map((check) => (
          <CheckListItem key={check.key} style={{ justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
                checkIcon="line"
                checked={check.checked}
                onPress={() => handleCheck(check)}
              />
              <InnerText>{check.text}</InnerText>
            </View>
            <TouchableHighlight
              underlayColor="transparent"
              style={{ width: 24, height: 24, right: 0 }}
              onPress={() => navigation.navigate('agreeInfo')}
            >
              <ArrowRightIcon />
            </TouchableHighlight>
          </CheckListItem>
        ))}
      </CheckListContainer>
      <ButtonContainer>
        <NextButton
          onPress={() => navigation.navigate('signUpStepOne')}
          disabled={disabled}
        />
      </ButtonContainer>
    </ScreenView>
  );
}

export default RegisterScreen;
