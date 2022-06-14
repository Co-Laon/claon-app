import { useNavigation } from '@react-navigation/native';
import { DefaultButton } from 'climbingapp/src/component/button/Button';
import { Kakao, LargeGrayIcon, LargeLineIcon } from 'climbingapp/src/component/button/buttonProps';
import { ScreenView } from 'climbingapp/src/component/view/ScreenView';
import { colorStyles } from 'climbingapp/src/styles';
import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import { LoginScreenProp } from './type';

const EmptyConatiner = styled.View`
    height: 56px;
`;

const TitleContainer = styled.View`
    flex: 1.3;
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
    flex: 0.9;
`;
const SubTextContainer = styled.View`
    margin-top: 40px;
    flex: 1;
    width: 100%;
    align-items: center;
`;

const KakaoButton = () => {
    const navigation = useNavigation<LoginScreenProp>();

    const TestPress = () => {
        navigation.navigate('register');
    };

    return <DefaultButton {...Kakao} onPress={TestPress} />;
};

const AppleButton = () => {
    return (<DefaultButton {...LargeGrayIcon} onPress={() => { }} />);
};
const GoogleButton = () => {
    return (<DefaultButton {...LargeLineIcon} onPress={() => { }} />);
};
function LoginScreen() {
    return (<ScreenView color="white">
        <EmptyConatiner></EmptyConatiner>
        <TitleContainer>
            <Title>간편하게 로그인하고</Title>
            <Title>클라온을 시작해 보세요!</Title>
        </TitleContainer>
        <ButtonContainer>
            <KakaoButton />
            <AppleButton />
            <GoogleButton />
        </ButtonContainer>
        <SubTextContainer>
            <Text style={{ color: 'black' }}><Text>이메일로 로그인</Text>    |    <Text>이메일로 가입</Text></Text>
        </SubTextContainer>
    </ScreenView >);
}

export default LoginScreen;