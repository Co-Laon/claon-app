import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colorStyles } from 'climbingapp/src/styles';
import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

export const Tabs = styled.View`
    background-color: white;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    padding: 0 20px 0 20px;
    width: 100%;
    height: 12.18%;
    border-top: 1px;
    border-color: ${colorStyles.Gray300};
`;

export const Tab = styled.Pressable`
    width: auto;
    justify-content: center;
    align-items: center;
`;

interface TabBarProps {
    tab: {
        icons: {
            id: number,
            name: string,
            focused: JSX.Element,
            default: JSX.Element,
        }[],
    }
}

export const TabBar = ({ state, navigation, tab }: BottomTabBarProps & TabBarProps) => {
    return (
        <Tabs>
            {state.routes.map((route, index) => {
                const isFocused = state.index === index;
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const { default: defaultIcon, focused: focusedIcon, id: keyId, name } = tab.icons[index];
                return (
                    <Tab
                        key={keyId}
                        onPress={onPress}
                    >
                        {(isFocused ? focusedIcon : defaultIcon)}
                        <Text style={isFocused ? { color: `${colorStyles.Purple500}` } : { color: `${colorStyles.Gray400}` }} >{name}</Text>
                    </Tab>
                );
            })}
        </Tabs >
    );
};