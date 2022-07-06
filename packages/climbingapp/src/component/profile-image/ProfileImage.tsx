import React from 'react';
import ProfileSkeleton from 'climbingapp/src/assets/icon/ic_72_profile_gray400.svg';
import InstagramIcon from 'climbingapp/src/assets/icon/ic_24_instagram.svg';
import CameraIcon from 'climbingapp/src/assets/icon/ic_24_camera_gray800.svg';
import styled from 'styled-components/native';
import { colorStyles } from 'climbingapp/src/styles';

interface ImageProps {
    src?: string;
    icon:
    | 'insta'
    | 'camera';
}

const Image = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 10px;
`;

const Conatainer = styled.View`
    width: 72px;
    height: 72px;
`;

export function ProfileImage({ src, icon }: ImageProps) {
    return (
        <Conatainer>
            {src ? <Image source={{ uri: src }} /> : <ProfileSkeleton />}
            {icon === 'insta' && <InstagramIcon style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: colorStyles.White }} />}
            {icon === 'camera' && <CameraIcon style={{ borderRadius: 100, position: 'absolute', bottom: 0, right: 0, backgroundColor: colorStyles.Black }} />}
        </Conatainer>
    );
}