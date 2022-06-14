import { DefaultButton } from './Button';
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { colorStyles } from '../../styles';
import { LargeGrayIcon, LargeLine, LargePurple, LargeLineIcon, MediumGray, MediumLine, MediumLineIcon, MediumPurple, Kakao } from './buttonProps';

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
LargeGrayIconButton.args = LargeGrayIcon;

export const LargePurpleButton = Template.bind({});
LargePurpleButton.args = LargePurple;

export const MediumGrayButton = Template.bind({});
MediumGrayButton.args = MediumGray;

export const MediumPurpleButton = Template.bind({});
MediumPurpleButton.args = MediumPurple;

export const LargeLineIconButton = Template.bind({});
LargeLineIconButton.args = LargeLineIcon;

export const LargeLineButton = Template.bind({});
LargeLineButton.args = LargeLine;

export const MediumLineIconButton = Template.bind({});
MediumLineIconButton.args = MediumLineIcon;

export const MediumLineButton = Template.bind({});
MediumLineButton.args = MediumLine;

export const KakaoButton = Template.bind({});
KakaoButton.args = Kakao;