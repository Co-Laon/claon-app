import React from 'react';
import styled from 'styled-components/native';
import { colorStyles } from '../styles';
import AppleLogo from '../assets/icon/ic_24_apple.svg';
import GoogleLogo from '../assets/icon/ic_24_google.svg';
interface ButtonProps {
    bgColor: string;
    color: string;
    underlayColor: string;
    width: string;
    height: string;
    text: string;
    icon?: JSX.Element;
    disabled: boolean;
    onPress: ({ }: any) => void;
}

const Default = styled.TouchableHighlight<ButtonProps>`
    background-color: ${props => props.bgColor};
    width: ${props => props.width};
    height: ${props => props.height};
    text-align: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    flex: 1;
`;

interface TextProps {
    color: string;
}

const ButtonText = styled.Text<TextProps>`
    flex: 1;
    color: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
`;



export const DefaultButton = (props: ButtonProps) => {
    return <Default {...props} underlayColor={props.underlayColor} disabled={props.disabled}><ButtonText color={props.color}>{props.icon} {props.text}</ButtonText></Default>;
};

const LargeGrayIcon = {
    bgColor: colorStyles.Gray800,
    width: '109px',
    color: 'white',
    onPress: () => { },
    height: '56px',
    icon: <AppleLogo />,
    text: '  버튼명',
    disabled: false,
    underlayColor: colorStyles.Black,
};
const LargePurple = {
    bgColor: colorStyles.Purple500,
    width: '109px',
    color: 'white',
    onPress: () => { },
    height: '56px',
    text: '버튼명',
    disabled: false,
    underlayColor: colorStyles.Purple600,
};
const MediumGray = {
    bgColor: colorStyles.Gray800,
    width: '71px',
    color: 'white',
    onPress: () => { },
    height: '52px',
    text: '버튼명',
    disabled: false,
    underlayColor: colorStyles.Black,
};
const MediumPurple = {
    bgColor: colorStyles.Purple500,
    width: '71px',
    color: 'black',
    onPress: () => { },
    height: '52px',
    text: '버튼명',
    disabled: false,
    underlayColor: colorStyles.Purple600,
};
const LargeLine = {
    bgColor: colorStyles.White,
    width: '109px',
    color: 'black',
    onPress: () => { },
    height: '56px',
    icon: <GoogleLogo />,
    text: '  버튼명',
    disabled: false,
    underlayColor: colorStyles.Gray100,
};
const LrageLineIcon = {
    bgColor: colorStyles.White,
    width: '109px',
    color: 'black',
    onPress: () => { },
    height: '56px',
    icon: <GoogleLogo />,
    text: '  버튼명',
    disabled: false,
    underlayColor: colorStyles.Gray100,
};
const MediumLineIcon = {
    bgColor: colorStyles.White,
    width: '103px',
    color: 'black',
    onPress: () => { },
    height: '52px',
    icon: <GoogleLogo />,
    text: '  버튼명',
    disabled: false,
    underlayColor: colorStyles.Gray100,
};
const MediumLine = {
    bgColor: colorStyles.White,
    width: '71px',
    color: 'black',
    onPress: () => { },
    height: '52px',
    text: '버튼명',
    disabled: false,
    underlayColor: colorStyles.Gray100,
};

export const LargeGrayIconButton = <DefaultButton {...LargeGrayIcon} />;
export const LargePurpleButton = <DefaultButton {...LargePurple} />;
export const MediumGrayButton = <DefaultButton {...MediumGray} />;
export const MediumPurpleButton = <DefaultButton {...MediumPurple} />;
export const LargeLineButton = <DefaultButton {...LargeLine} />;
export const LargeLineIconButton = <DefaultButton {...LrageLineIcon} />;
export const MediumLineIconButton = <DefaultButton {...MediumLineIcon} />;
export const MediumLineButton = <DefaultButton {...MediumLine} />;