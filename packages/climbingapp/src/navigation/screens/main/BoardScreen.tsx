import React from 'react';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';

const TopTab = createMaterialTopTabNavigator();

const FreeScreen = () => {
    return <View><Text>freeScreen</Text></View>;
};
const MemeberScreen = () => {
    return <View><Text>MemberScreen</Text></View>;
};

function BoardScreen() {
    return (
        <TopTab.Navigator>
            <TopTab.Screen name="free" component={FreeScreen} />
            <TopTab.Screen name="member" component={MemeberScreen} />
        </TopTab.Navigator>);
}

export default BoardScreen;