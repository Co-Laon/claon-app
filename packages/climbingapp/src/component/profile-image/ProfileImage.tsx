import React from 'react';
import ProfileSkeleton from 'climbingapp/src/assets/icon/ic_72_profile_gray400.svg';
import InstagramIcon from 'climbingapp/src/assets/icon/ic_24_instagram.svg';
import CameraIcon from 'climbingapp/src/assets/icon/ic_24_camera_gray800.svg';
import styled from 'styled-components/native';
import { colorStyles } from 'climbingapp/src/styles';
import { useImagePicker } from 'climbingapp/src/hooks/useImagePicker';
interface ImageProps {
    src?: string;
    icon:
    | 'insta'
    | 'camera';
}

const Image = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 50px;
`;

const Conatainer = styled.Pressable`
    align-items: center;
    width: 72px;
    height: 72px;
`;

export function ProfileImage({ icon }: ImageProps) {
    const { pickerResponse, selectImage } = useImagePicker();
    const uri = pickerResponse?.assets ? pickerResponse?.assets[0]?.uri : undefined;

    return (
        <Conatainer onPress={selectImage} >
            {uri ? <Image source={{ uri: uri }} resizeMode='cover' resizeMethod='scale' /> : <ProfileSkeleton />}
            {icon === 'insta' && <InstagramIcon style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: colorStyles.White }} />}
            {icon === 'camera' && <CameraIcon style={{ borderRadius: 100, position: 'absolute', bottom: 0, right: 0, backgroundColor: colorStyles.Black }} />}
        </Conatainer>
    );
}
