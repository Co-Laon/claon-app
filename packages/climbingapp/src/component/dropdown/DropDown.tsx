import { colorStyles } from 'climbingapp/src/styles';
import React from 'react';
import { Pressable } from 'react-native';
import styled from 'styled-components/native';
import ArrowDown from '../../assets/icon/ic_20_arrow_down_gray400.svg';

interface DropDownProps {
    placeholder: string | undefined;
    value: string;
    onPress: ({ }: any) => void;
}

export const DropDown = styled.View`
    width: 156px;
    height: 52px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    gap: 16px;
    border: 1px solid ${colorStyles.Gray300};
    background-color: ${colorStyles.White};
    position: absolute;
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


export const AreaDropDown = ({ value, placeholder, onPress }: DropDownProps) => {
    return (
        <DropDown>
            <DropInput>
                <Input placeholder={placeholder} value={value} editable={false} placeholderTextColor={colorStyles.Gray400} />
                <Pressable onPress={onPress}>
                    <ArrowDown />
                </Pressable>
            </DropInput>
        </DropDown>
    );
};
