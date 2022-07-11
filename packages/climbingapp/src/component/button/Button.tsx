import React from 'react';
import styled from 'styled-components/native';
import { colorStyles } from '../../styles';
import { LargePurple } from './buttonProps';
interface ButtonProps {
    bgColor: string;
    color: string;
    underlayColor: string;
    width: string;
    height: string;
    text: string;
    icon?: JSX.Element;
    disabled?: boolean;
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
    font-weight: 700px;
    flex: 1;
    border-color: #E6E6E6;
    border-width: 1px;
    margin-bottom: 8px;
`;

interface TextProps {
    color: string;
}

const ButtonText = styled.Text<TextProps>`
    color: ${props => props.color};
    text-align: center;
`;
const TextContainer = styled.View`
    flex-direction: row;
    text-align: center;
    justify-content: center;
    align-items: center;
`;


export const DefaultButton = (props: ButtonProps) => {
    return (
        <Default {...props} underlayColor={props.underlayColor} disabled={props.disabled}>
            <TextContainer>
                {props.icon}
                <ButtonText color={props.color}>{props.text}</ButtonText>
            </TextContainer>
        </Default>
    );
};

export const NextButton = ({ onPress, disabled }: { onPress: ({ }: any) => void, disabled?: boolean }) => {
    return <DefaultButton {...LargePurple} onPress={onPress} disabled={disabled} />;
};