import { DefaultButton } from './Button';
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { colorStyles } from '../styles';
import AppleLogo from '../assets/icon/ic_24_apple.svg';
import GoogleLogo from '../assets/icon/ic_24_google.svg';

const colors = Object.values(colorStyles);

export default {
    title: 'App/button',
    component: DefaultButton,
    argTypes: {
        bgColor: {
            control: {
                type: 'select',
                options: [
                    ...colors,
                ]
            }
        },
        width: {
            control: {
                type: 'select',
                options: [
                    '100px',
                    '200px',
                    'max-width'
                ]
            }
        },
        height: {
            control: {
                type: 'select',
                options: [
                    '40px',
                    '80px',
                ]
            }
        }
    },
} as ComponentMeta<typeof DefaultButton>;

export const Template: ComponentStory<typeof DefaultButton> = (args) => <DefaultButton {...args} />;

export const LargeGrayIconButton = Template.bind({});
LargeGrayIconButton.args = {
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
export const LargePurpleButton = Template.bind({});
LargePurpleButton.args = {
    bgColor: colorStyles.Purple500,
    width: '109px',
    color: 'white',
    onPress: () => { },
    height: '56px',
    text: '버튼명',
    disabled: false,
    underlayColor: colorStyles.Purple600,
};

export const MediumGrayButton = Template.bind({});
MediumGrayButton.args = {
    bgColor: colorStyles.Gray800,
    width: '71px',
    color: 'white',
    onPress: () => { },
    height: '52px',
    text: '버튼명',
    disabled: false,
    underlayColor: colorStyles.Black,
};

export const MediumPurpleButton = Template.bind({});
MediumPurpleButton.args = {
    bgColor: colorStyles.Purple500,
    width: '71px',
    color: 'black',
    onPress: () => { },
    height: '52px',
    text: '버튼명',
    disabled: false,
    underlayColor: colorStyles.Purple600,
};

export const LargeLineIconButton = Template.bind({});
LargeLineIconButton.args = {
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

export const LargeLineButton = Template.bind({});
LargeLineButton.args = {
    bgColor: colorStyles.White,
    width: '77px',
    color: 'black',
    onPress: () => { },
    height: '56px',
    text: '버튼명',
    disabled: false,
    underlayColor: colorStyles.Gray100,
};

export const MediumLineIconButton = Template.bind({});
MediumLineIconButton.args = {
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

export const MediumLineButton = Template.bind({});
MediumLineButton.args = {
    bgColor: colorStyles.White,
    width: '71px',
    color: 'black',
    onPress: () => { },
    height: '52px',
    text: '버튼명',
    disabled: false,
    underlayColor: colorStyles.Gray100,
};