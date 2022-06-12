import React, { useRef } from 'react';
import { Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import Insta from '../../../assets/icon/ic_20_instagram.svg';
import { AreaDropDown } from 'climbingapp/src/component/dropdown/DropDown';
import MyBottomSheet from 'climbingapp/src/component/bottomSheet/BottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const TopTab = createMaterialTopTabNavigator();

export const FreeScreen = () => {
    return <View><Text><Insta /></Text></View>;
};

const MemeberScreen = () => {
    const ref = useRef<BottomSheetModal>(null);
    const data = ['서울 특별시', '부산 광역시', '서울 특별시', '부산 광역시', '서울 특별시', '부산 광역시'];
    const handleRef = () => {
        console.log(ref);
        ref.current?.present();
    };
    const handleChoiceItem = () => {
        console.log(ref);
        ref.current?.close();
    };

    return <View><AreaDropDown placeholder='시군' value='' onPress={handleRef} /><MyBottomSheet data={data} ref={ref} onEachItemPress={handleChoiceItem} /></View>;
};


function BoardScreen() {
    return (
        <TopTab.Navigator>
            <TopTab.Screen name="free" component={FreeScreen} />
            <TopTab.Screen name="member" component={MemeberScreen} />
        </TopTab.Navigator>);
}

export default BoardScreen;