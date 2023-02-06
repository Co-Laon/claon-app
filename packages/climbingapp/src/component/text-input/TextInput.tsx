import { colorStyles } from 'climbingapp/src/styles';
import React from 'react';
import { KeyboardTypeOptions } from 'react-native';
import styled from 'styled-components/native';


const Container = styled.TextInput`
    align-items: flex-start;
    border-radius: 8px;
    border: 1px;
    border-color: ${colorStyles.Gray300};
    height: 52px;
    padding: 16px;
    font-size: 14px;
    color: ${colorStyles.Black};
`;

interface TextInputProps {
    placeholder: string;
    value: string;
    onChangeText: ({ }: any) => void;
    keyboardType?: KeyboardTypeOptions;
}

export const MyTextInput = ({ placeholder, value, onChangeText, keyboardType = 'default' }: TextInputProps) => {

    return <Container value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor={colorStyles.Gray400} keyboardType={keyboardType} />;
};