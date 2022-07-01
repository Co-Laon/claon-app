import { colorStyles } from 'climbingapp/src/styles';
import React from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import ArrowDown from '../../assets/icon/ic_20_arrow_down_gray400.svg';

interface DropDownProps {
    placeholder: string | undefined;
    value?: string;
    onPress: ({ }: any) => void;
}

export const Container = styled.View`
    width: 49%;
    height: 52px;
    align-items: center;
    border-radius: 8px;
    border: 1px solid ${colorStyles.Gray300};
`;

const Input = styled.TextInput`
    width: 88px;
    font-size: 14px;
    color: ${colorStyles.Gray400};
`;
const DropInput = styled.View`
    flex-direction: row;
    padding: 16px;
    justify-content: space-around;
`;


export const DropDown = ({ value, placeholder, onPress }: DropDownProps) => {
    return (
        <Container>
            <DropInput>
                <Input placeholder={placeholder} value={value} editable={false} placeholderTextColor={colorStyles.Gray400} />
                <Pressable onPress={onPress}>
                    <ArrowDown style={{ width: 20, height: 20 }} />
                </Pressable>
            </DropInput>
        </Container>
    );
};
