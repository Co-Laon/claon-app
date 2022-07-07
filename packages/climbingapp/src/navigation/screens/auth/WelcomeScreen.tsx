import React from 'react';
import LottieView from 'lottie-react-native';
import { ScreenView } from 'climbingapp/src/component/view/ScreenView';
import Assets from 'climbingapp/src/assets/lottie';
import styled from 'styled-components/native';
import { colorStyles } from 'climbingapp/src/styles';
import { Title } from 'climbingapp/src/component/text/AuthTitle';
import { TouchableHighlight } from 'react-native';
import { authorize } from 'climbingapp/src/store/slices/auth';
import { User } from 'climbingapp/src/store/slices/auth';

const Container = styled.View`
    flex: 0.8;
    align-items: center;
    justify-content: center;
`;

const Text = styled.Text`
    color: ${colorStyles.Purple500};
    font-weight: bold;
    font-size: 14px;
    margin: 8px;
`;

function WelcomeScreen() {
    const name = '닉네임';
    const user: User = {
        token: 'test',
        platform: 'apple',
    };

    return (<ScreenView color='white'>
        <Container>
            <LottieView
                source={Assets.lottieFiles.check}
                autoPlay
                loop={false}
                style={{ width: 64, height: 64 }}
            />
            <Text>가입 완료</Text>
            <Title>{name}님</Title>
            <Title>환영해요!</Title>
        </Container>
        <TouchableHighlight style={{ alignItems: 'center' }} underlayColor='transparent' onPress={() => authorize(user)}>
            <Text>클라온 홈으로</Text>
        </TouchableHighlight>
    </ScreenView >);
}

export default WelcomeScreen;