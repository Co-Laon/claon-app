import { useNavigation } from '@react-navigation/native';
import { AppBar } from 'climbingapp/src/component/appBar/AppBar';
import { NextButton } from 'climbingapp/src/component/button/Button';
import { Title, TitleContainer } from 'climbingapp/src/component/text/AuthTitle';
import { ScreenView } from 'climbingapp/src/component/view/ScreenView';
import { colorStyles } from 'climbingapp/src/styles';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/native';
import { LoginScreenProp } from './type';
import { Text } from 'react-native';
import { MyTextInput } from 'climbingapp/src/component/text-input/TextInput';
import { ProfileImage } from 'climbingapp/src/component/profile-image/ProfileImage';
import { DropDown } from 'climbingapp/src/component/dropdown/DropDown';
import MyBottomSheet from 'climbingapp/src/component/bottomSheet/BottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'climbingapp/src/store/slices';
import { setBasicArea, setMetroPolitanArea, setNickName } from 'climbingapp/src/store/slices/authInfo';

const ButtonContainer = styled.View`
    flex: 0.5;
    margin-bottom: 24;
`;

const ProfileContainer = styled.View`
    flex: 1;
`;

const NickNameContainer = styled.View`
    flex: 1;
`;

const AreaContainer = styled.View`
    flex: 1;
`;

const DropDownContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const SubText = styled.Text`
    color: ${colorStyles.Black};
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
`;
function EssentialInfoScreen() {
    const navigation = useNavigation<LoginScreenProp>();
    const BasicAreaRef = useRef<BottomSheetModal>(null);
    const MetroAreaRef = useRef<BottomSheetModal>(null);
    const basicLocalActiveAreaList = { key: 1, data: ['서울 특별시'] };
    const metropolitanActiveAreaList = {
        key: 2, data: ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구']
    };
    const userInfo = useSelector((state: RootState) => state.authInfo.userInfo);
    const dispatch = useDispatch();

    const handleAreaRef = () => {
        BasicAreaRef.current?.present();
    };
    const handleDetailAreaRef = () => {
        MetroAreaRef.current?.present();
    };

    const handleChoiceBasicAreaItem = ({ item }: { item: string }) => {
        dispatch(setBasicArea(item));
        BasicAreaRef.current?.close();
    };
    const handleChoiceMetroAreaItem = ({ item }: { item: string }) => {
        dispatch(setMetroPolitanArea(item));
        MetroAreaRef.current?.close();
    };

    const handleChangeNickName = (nick: string) => {
        dispatch(setNickName(nick));
    };

    useEffect(() => {
        console.log(userInfo);
    }, [userInfo]);

    return (<ScreenView color={colorStyles.White} >
        <AppBar />
        <TitleContainer>
            <Title>다음 항목을</Title>
            <Title>입력해 주세요</Title>
        </TitleContainer>
        <ProfileContainer>
            <SubText>프로필 사진</SubText>
            <ProfileImage icon='camera' />
        </ProfileContainer>
        <NickNameContainer>
            <SubText>닉네임 <Text style={{ color: '#FF0000' }}>*</Text> </SubText>
            <MyTextInput value={userInfo.nickname} onChangeText={handleChangeNickName} placeholder='한글, 영문, 숫자 포함 2-20자' />
        </NickNameContainer>
        <AreaContainer>
            <SubText>주요 활동 지역</SubText>
            <DropDownContainer>
                <DropDown placeholder='시·도' value={userInfo.basicLocalActiveArea} onPress={handleAreaRef} />
                <DropDown placeholder='시·군·구' value={userInfo.metropolitanActiveArea} onPress={handleDetailAreaRef} />
            </DropDownContainer>
        </AreaContainer>
        <ButtonContainer>
            <NextButton onPress={() => navigation.navigate('connectInsta')} />
        </ButtonContainer>
        <MyBottomSheet ref={BasicAreaRef} data={basicLocalActiveAreaList.data} onEachItemPress={handleChoiceBasicAreaItem} />
        <MyBottomSheet ref={MetroAreaRef} data={metropolitanActiveAreaList.data} onEachItemPress={handleChoiceMetroAreaItem} />
    </ScreenView >);
}

export default EssentialInfoScreen;