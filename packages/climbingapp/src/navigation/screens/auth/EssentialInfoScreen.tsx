import { AppBar } from 'climbingapp/src/component/appBar/AppBar';
import { ScreenView } from 'climbingapp/src/component/view/ScreenView';
import { colorStyles } from 'climbingapp/src/styles';
import React from 'react';

function EssentialInfoScreen() {
    return (<ScreenView color={colorStyles.White}>
        <AppBar />
    </ScreenView>);
}

export default EssentialInfoScreen;