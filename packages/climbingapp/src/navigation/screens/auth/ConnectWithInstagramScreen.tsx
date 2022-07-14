import { useNavigation } from '@react-navigation/native';
import { AppBar } from 'climbingapp/src/component/appBar/AppBar';
import { DefaultButton, NextButton } from 'climbingapp/src/component/button/Button';
import { Instagram } from 'climbingapp/src/component/button/buttonProps';
import { InstaImage } from 'climbingapp/src/component/profile-image/InstaImage';
import { Title, TitleContainer } from 'climbingapp/src/component/text/AuthTitle';
import { ScreenView } from 'climbingapp/src/component/view/ScreenView';
import { colorStyles } from 'climbingapp/src/styles';
import React from 'react';
import styled from 'styled-components/native';
import { LoginScreenProp } from './type';

const ButtonContainer = styled.View`
    flex: 0.3;
    margin-top: 100px;
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
`;

const ProfileContainer = styled.View`
    flex: 0.5;
    align-items: center;
`;

const InstagramButton = ({ onPress }: { onPress: ({ }: any) => void }) => {
    return (<DefaultButton {...Instagram} onPress={onPress} />);
};

function ConnectWithInstagramScreen() {

    const navigation = useNavigation<LoginScreenProp>();
    const handleConnectInstagram = () => {
        navigation.navigate('instagram');
    };

    return (
        <ScreenView color='white'>
            <AppBar />
            <TitleContainer>
                <Title>인스타그램을</Title>
                <Title>연결해 주세요</Title>
                <SubText>미연결시 앱 사용에 제한이 있어요</SubText>
            </TitleContainer>
            <ProfileContainer>
                <InstaImage />
                <Name>asdf</Name>
                <InstagramButton onPress={handleConnectInstagram} />
            </ProfileContainer>
            <ButtonContainer>
                <NextButton onPress={() => navigation.navigate('welcome')} />
            </ButtonContainer>
        </ScreenView>
    );
}

export default ConnectWithInstagramScreen;