import { AppBar } from 'climbingapp/src/component/appBar/AppBar';
import { ScreenView } from 'climbingapp/src/component/view/ScreenView';
import { colorStyles } from 'climbingapp/src/styles';
import React from 'react';

function OptionalInfoScreen() {
    return (<ScreenView color={colorStyles.White}>
        <AppBar />
    </ScreenView>);
}

export default OptionalInfoScreen;