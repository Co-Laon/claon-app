import React, { ReactElement } from 'react';
import styled from 'styled-components/native';
import ArrowBack from 'climbingapp/src/assets/icon/ic_24_appbar_back_gray800.svg';
import { useNavigation } from '@react-navigation/native';
import { TouchableHighlight, View } from 'react-native';

const Container = styled.View`
    left: 0;
    right: 0;
    top: 0;
    height: 8.4%;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

`;

interface AppBarProps {
    leftNode?: ReactElement | null;
    centerNode?: ReactElement | null;
    rightNode?: ReactElement | null;
}

const EmptyNode = <View />;

export const AppBar = ({ leftNode, centerNode, rightNode }: AppBarProps) => {
    const navigation = useNavigation();
    return (
        <Container>
            {leftNode ? leftNode :
                <TouchableHighlight
                    style={{ width: 24, height: 24 }}
                    onPress={() => navigation.goBack()}
                    underlayColor="transparent"
                >
                    <ArrowBack />
                </TouchableHighlight>
            }
            {centerNode ? centerNode : EmptyNode}
            {rightNode ? rightNode : EmptyNode}
        </Container>
    );
};
