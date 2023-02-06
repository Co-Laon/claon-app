import React from 'react';
import ProfileSkeleton from 'climbingapp/src/assets/icon/ic_72_profile_gray400.svg';
import InstagramIcon from 'climbingapp/src/assets/icon/ic_24_instagram.svg';
import CameraIcon from 'climbingapp/src/assets/icon/ic_24_camera_gray800.svg';
import styled from 'styled-components/native';
import { colorStyles } from 'climbingapp/src/styles';

interface ImageProps {
  src?: string;
  icon: 'insta' | 'camera';
  onPress: () => void;
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

export function ProfileImage({ icon, src, onPress }: ImageProps) {
  return (
    <Conatainer onPress={onPress}>
      {src ? (
        <Image source={{ uri: src }} resizeMode="cover" resizeMethod="scale" />
      ) : (
        <ProfileSkeleton />
      )}
      {icon === 'insta' && (
        <InstagramIcon
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: colorStyles.White,
          }}
        />
      )}
      {icon === 'camera' && (
        <CameraIcon
          style={{
            borderRadius: 100,
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: colorStyles.Black,
          }}
        />
      )}
    </Conatainer>
  );
}
