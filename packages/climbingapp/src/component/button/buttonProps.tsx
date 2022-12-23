import React from 'react';
import { colorStyles } from '../../styles';
import AppleLogo from '../../assets/icon/ic_24_apple.svg';
import GoogleLogo from '../../assets/icon/ic_24_google.svg';
import InstagramLogo from '../../assets/icon/ic_24_instagram.svg';
import KakaoLogo from '../../assets/icon/ic_24_kakao.svg';
import { vs } from 'react-native-size-matters';

export const Apple = {
  bgColor: colorStyles.Gray800,
  width: '100%',
  color: 'white',
  height: '56px',
  icon: <AppleLogo />,
  text: '  Apple로 계속하기',
  underlayColor: colorStyles.Black,
};
export const LargePurple = {
  bgColor: colorStyles.Purple500,
  width: '100%',
  color: 'white',
  height: '56px',
  text: '다음',
  underlayColor: colorStyles.Purple600,
};
export const MediumGray = {
  bgColor: colorStyles.Gray800,
  width: '71px',
  color: 'white',
  height: '52px',
  text: '버튼명',
  underlayColor: colorStyles.Black,
};
export const MediumPurple = {
  bgColor: colorStyles.Purple500,
  width: '71px',
  color: 'white',
  height: '52px',
  text: '버튼명',
  underlayColor: colorStyles.Purple600,
};
export const LargeLine = {
  bgColor: colorStyles.White,
  width: '109px',
  color: 'black',
  height: '56px',
  icon: <GoogleLogo />,
  text: '  버튼명',
  underlayColor: colorStyles.Gray100,
};
export const Google = {
  bgColor: colorStyles.White,
  width: '100%',
  color: 'black',
  height: '56px',
  icon: <GoogleLogo />,
  text: '  Google로 계속하기',
  underlayColor: colorStyles.Gray100,
};
export const MediumLineIcon = {
  bgColor: colorStyles.White,
  width: '103px',
  color: 'black',
  height: '52px',
  icon: <GoogleLogo />,
  text: '  버튼명',
  underlayColor: colorStyles.Gray100,
};
export const MediumLine = {
  bgColor: colorStyles.White,
  width: '71px',
  color: 'black',
  height: '52px',
  text: '버튼명',
  underlayColor: colorStyles.Gray100,
};
export const Kakao = {
  bgColor: colorStyles.Yellow500,
  width: '100%',
  color: 'black',
  height: '52px',
  icon: <KakaoLogo />,
  text: '  카카오톡으로 계속하기',
  underlayColor: '#ffcd00',
};

export const Instagram = {
  bgColor: colorStyles.White,
  width: '100%',
  color: 'black',
  height: `${vs(56)}px`,
  icon: <InstagramLogo />,
  text: '  인스타그램 연결',
  underlayColor: colorStyles.Gray100,
};
