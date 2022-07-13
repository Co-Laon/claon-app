import React from 'react';
import ProfileSkeleton from 'climbingapp/src/assets/icon/ic_72_profile_gray400.svg';
import InstagramIcon from 'climbingapp/src/assets/icon/ic_24_instagram.svg';
import styled from 'styled-components/native';
import { colorStyles } from 'climbingapp/src/styles';
interface ImageProps {
    src?: string;
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

export function InstaImage({ src }: ImageProps) {
    return (
        <Conatainer>
            {src ? <Image source={{ uri: src }} /> : <ProfileSkeleton />}
            <InstagramIcon style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: colorStyles.White }} />
        </Conatainer>
    );
}