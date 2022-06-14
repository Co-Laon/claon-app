import React from 'react';
import styled from 'styled-components/native';
import FaceChecked from '../../assets/icon/checkbox/ic_24_checkbox_face_checked.svg';
import FaceEnabled from '../../assets/icon/checkbox/ic_24_checkbox_face_enabled.svg';
import LineChecked from '../../assets/icon/checkbox/ic_24_checkbox_line_checked.svg';
import LineEnabled from '../../assets/icon/checkbox/ic_24_checkbox_line_enabled.svg';

export interface DefaultCheckBoxProps {
    checked: boolean | (({ }: any) => boolean);
    onPress: ({ }: any) => void;
    checkIcon:
    | 'face'
    | 'line';
}

export const Container = styled.Pressable`
    width: 24px;
    height: 24px;
`;

export const CheckBox = ({ checked, onPress, checkIcon }: DefaultCheckBoxProps) => {
    const IconList = {
        'face': {
            checked: <FaceChecked />,
            enabled: <FaceEnabled />
        },
        'line': {
            checked: <LineChecked />,
            enabled: <LineEnabled />
        },
    };

    const checkedLogo = IconList[`${checkIcon}`].checked;
    const enabledLogo = IconList[`${checkIcon}`].enabled;

    return (
        <Container
            onPress={onPress}
        >
            {checked ? checkedLogo : enabledLogo}
        </Container>
    );
};

