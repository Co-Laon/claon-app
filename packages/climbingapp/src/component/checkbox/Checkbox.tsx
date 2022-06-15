import React from 'react';
import styled from 'styled-components/native';
import { FaceProps, LineProps } from './CheckboxProps';
interface DefaultCheckBoxProps {
    check: boolean,
    setCheck: (check: boolean) => boolean,
    checkedLogo: JSX.Element,
    enabledLogo: JSX.Element,
}

export const CheckBox = styled.Pressable`
    width: 24px;
    height: 24px;
`;

export const Default = ({ check, setCheck, checkedLogo, enabledLogo }: DefaultCheckBoxProps) => {
    return (
        <CheckBox
            onPress={() => setCheck(!check)}
        >{check ? checkedLogo : enabledLogo}</CheckBox>
    );
};

export const FaceCheckBox = () => <Default {...FaceProps} />;
export const LineCheckBox = () => <Default {...LineProps} />;

