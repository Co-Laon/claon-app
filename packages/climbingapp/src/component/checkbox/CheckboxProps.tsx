import FaceChecked from '../../assets/icon/checkbox/ic_24_checkbox_face_checked.svg';
import FaceEnabled from '../../assets/icon/checkbox/ic_24_checkbox_face_enabled.svg';
import LineChecked from '../../assets/icon/checkbox/ic_24_checkbox_line_checked.svg';
import LineEnabled from '../../assets/icon/checkbox/ic_24_checkbox_line_enabled.svg';
import React from 'react';

export const FaceProps = {
    check: false,
    setCheck: (check: boolean) => !check,
    checkedLogo: <FaceChecked />,
    enabledLogo: <FaceEnabled />,
};
export const LineProps = {
    check: false,
    setCheck: (check: boolean) => !check,
    checkedLogo: <LineChecked />,
    enabledLogo: <LineEnabled />,
};