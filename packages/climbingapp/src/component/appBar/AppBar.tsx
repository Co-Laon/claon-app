import React from 'react';
import styled from 'styled-components/native';
import ArrowBack from 'climbingapp/src/assets/icon/ic_24_appbar_back_gray800.svg';
import { useNavigation } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native';

const Container = styled.View`
    left: 0;
    right: 0;
    top: 0;
    height: 8.4%;
    justify-content: center;
`;

export const AppBar = () => {
    const navigation = useNavigation();
    return (
        <Container>
            <TouchableHighlight
                style={{ width: 24, height: 24 }}
                onPress={() => navigation.goBack()}
                underlayColor="transparent"
            >
                <ArrowBack />
            </TouchableHighlight>
        </Container>
    );
};
