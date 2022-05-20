import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/main/HomeScreen';
import BoardScreen from './screens/main/BoardScreen';
import CrewScreen from './screens/main/CrewScreen';
import MapScreen from './screens/main/MapScreen';
import SettingScreen from './screens/main/SettingScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="home" component={HomeScreen} />
            <Tab.Screen name="board" component={BoardScreen} />
            <Tab.Screen name="crew" component={CrewScreen} />
            <Tab.Screen name="map" component={MapScreen} />
            <Tab.Screen name="setting" component={SettingScreen} />
        </Tab.Navigator>
    );
};

export default MainNavigator;