import React from 'react';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';

const TopTab = createMaterialTopTabNavigator();

export const TestScreen = () => {
    return <View><Text>test1</Text></View>;
};

const Test2Screen = () => {
    return <View><Text>test2</Text></View>;
};

function BoardScreen() {
    return (
        <TopTab.Navigator>
            <TopTab.Screen name="free" component={TestScreen} />
            <TopTab.Screen name="member" component={Test2Screen} />
        </TopTab.Navigator>);
}

export default BoardScreen;