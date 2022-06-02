import { DefaultButton } from './Button';
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { colorStyles } from '../styles';
import { SvgXml } from 'react-native-svg';

const testSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.39859 6.21967C2.69149 5.92678 3.16636 5.92678 3.45925 6.21967L9.99999 12.7604L16.5407 6.21967C16.8336 5.92678 17.3085 5.92678 17.6014 6.21967C17.8943 6.51256 17.8943 6.98744 17.6014 7.28033L10.5303 14.3514C10.2374 14.6443 9.76256 14.6443 9.46966 14.3514L2.39859 7.28033C2.1057 6.98744 2.1057 6.51256 2.39859 6.21967Z" fill="#BFBFBF"/>
</svg>`;

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
    }
} as ComponentMeta<typeof DefaultButton>;

export const Default: ComponentStory<typeof DefaultButton> = (args) => <DefaultButton {...args}><SvgXml xml={testSVG} /></DefaultButton>;
Default.args = {
    bgColor: 'black',
    width: '100px',
    onPress: () => { },
    height: '40px',
};