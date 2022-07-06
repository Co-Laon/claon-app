import { AppBar } from 'climbingapp/src/component/appBar/AppBar';
import { ScreenView } from 'climbingapp/src/component/view/ScreenView';
import { colorStyles } from 'climbingapp/src/styles';
import React from 'react';
import { Text } from 'react-native';

function AgreeInfoScreen() {
    return (
        <ScreenView color={colorStyles.White}>
            <AppBar />
            <Text>이용약관</Text>
        </ScreenView>
    );
}

export default AgreeInfoScreen;