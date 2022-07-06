import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/main/HomeScreen';
import SearchScreen from './screens/main/SearchScreen';
import SettingScreen from './screens/main/MyScreen';
import CenterScreen from './screens/main/CenterScreen';
import { TabBar } from '../component/bottom-navi/TabBar';
import { tabIcons } from '../component/bottom-navi/TabIconProps';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
    return (
        <Tab.Navigator tabBar={props => <TabBar {...props} tab={tabIcons} />}>
            <Tab.Screen name="home" component={HomeScreen} />
            <Tab.Screen name="search" component={SearchScreen} />
            < Tab.Screen name="center" component={CenterScreen} />
            < Tab.Screen name="setting" component={SettingScreen} />
        </Tab.Navigator >
    );
};

export default MainNavigator;