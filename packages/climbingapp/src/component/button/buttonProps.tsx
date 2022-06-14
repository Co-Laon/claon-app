import React from 'react';
import { colorStyles } from '../../styles';
import AppleLogo from '../../assets/icon/ic_24_apple.svg';
import GoogleLogo from '../../assets/icon/ic_24_google.svg';

export const LargeGrayIcon = {
  bgColor: colorStyles.Gray800,
  width: '100%',
  color: 'white',
  height: '56',
  icon: <AppleLogo />,
  text: 'Apple로 계속하기',
  disabled: false,
  underlayColor: colorStyles.Black,
};
export const LargePurple = {
  bgColor: colorStyles.Purple500,
  width: '100%',
  color: 'white',
  height: '56',
  text: '다음',
  disabled: false,
  underlayColor: colorStyles.Purple600,
};
export const MediumGray = {
  bgColor: colorStyles.Gray800,
  width: '71',
  color: 'white',
  height: '52',
  text: '버튼명',
  disabled: false,
  underlayColor: colorStyles.Black,
};
export const MediumPurple = {
  bgColor: colorStyles.Purple500,
  width: '71',
  color: 'white',
  height: '52',
  text: '버튼명',
  disabled: false,
  underlayColor: colorStyles.Purple600,
};
export const LargeLine = {
  bgColor: colorStyles.White,
  width: '109',
  color: 'black',
  height: '56px',
  icon: <GoogleLogo />,
  text: '  버튼명',
  disabled: false,
  underlayColor: colorStyles.Gray100,
};
export const LargeLineIcon = {
  bgColor: colorStyles.White,
  width: '100%',
  color: 'black',
  height: '56',
  icon: <GoogleLogo />,
  text: 'Google로 계속하기',
  disabled: false,
  underlayColor: colorStyles.Gray100,
};
export const MediumLineIcon = {
  bgColor: colorStyles.White,
  width: '103',
  color: 'black',
  height: '52',
  icon: <GoogleLogo />,
  text: '  버튼명',
  disabled: false,
  underlayColor: colorStyles.Gray100,
};
export const MediumLine = {
  bgColor: colorStyles.White,
  width: '71',
  color: 'black',
  height: '52',
  text: '버튼명',
  disabled: false,
  underlayColor: colorStyles.Gray100,
};
export const Kakao = {
  bgColor: colorStyles.Yellow500,
  width: '100%',
  color: 'black',
  height: '52',
  text: '카카오톡으로 계속하기',
  disabled: false,
  underlayColor: '#ffcd00',
};
