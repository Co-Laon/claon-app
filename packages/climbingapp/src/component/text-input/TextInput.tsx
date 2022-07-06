import { colorStyles } from 'climbingapp/src/styles';
import React from 'react';
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
}

export const MyTextInput = ({ placeholder }: TextInputProps) => {

    return <Container placeholder={placeholder} placeholderTextColor={colorStyles.Gray400} />;
};