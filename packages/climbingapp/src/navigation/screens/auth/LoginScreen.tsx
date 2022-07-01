import { useNavigation } from '@react-navigation/native';
import { DefaultButton } from 'climbingapp/src/component/button/Button';
import { Kakao, Apple, Google } from 'climbingapp/src/component/button/buttonProps';
import { ScreenView } from 'climbingapp/src/component/view/ScreenView';
import { colorStyles } from 'climbingapp/src/styles';
import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { LoginScreenProp } from './type';

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
    flex: 0.5;
`;

const KakaoButton = ({ onPress }: { onPress: ({ }: any) => void }) => {
    return <DefaultButton {...Kakao} onPress={onPress} />;
};

const AppleButton = () => {
    return (<DefaultButton {...Apple} onPress={() => { }} />);
};
const GoogleButton = () => {
    return (<DefaultButton {...Google} onPress={() => { }} />);
};
function LoginScreen() {
    const navigation = useNavigation<LoginScreenProp>();
    const handleSignKakao = () => {
        navigation.navigate('register');
    };
    return (<ScreenView color="white">
        <EmptyConatiner />
        <TitleContainer>
            <Title>간편하게 로그인하고</Title>
            <Title>클라온을 시작해 보세요!</Title>
        </TitleContainer>
        <ButtonContainer>
            <KakaoButton onPress={handleSignKakao} />
            {Platform.OS === 'ios' && <AppleButton />}
            <GoogleButton />
        </ButtonContainer>
        <EmptyConatiner />
    </ScreenView >);
}

export default LoginScreen;