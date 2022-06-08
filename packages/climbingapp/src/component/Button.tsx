import React from 'react';
import styled from 'styled-components/native';
import { colorStyles } from '../styles';
import { LargeGrayIcon, LargeLine, LargePurple, LargeLineIcon, MediumGray, MediumLine, MediumLineIcon, MediumPurple } from './buttonProps';
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
    background-color: ${props => props.disabled ? colorStyles.Gray300 : props.bgColor};
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

export const LargeGrayIconButton = <DefaultButton {...LargeGrayIcon} />;
export const LargePurpleButton = <DefaultButton {...LargePurple} />;
export const MediumGrayButton = <DefaultButton {...MediumGray} />;
export const MediumPurpleButton = <DefaultButton {...MediumPurple} />;
export const LargeLineButton = <DefaultButton {...LargeLine} />;
export const LargeLineIconButton = <DefaultButton {...LargeLineIcon} />;
export const MediumLineIconButton = <DefaultButton {...MediumLineIcon} />;
export const MediumLineButton = <DefaultButton {...MediumLine} />;