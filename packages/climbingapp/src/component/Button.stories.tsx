import { DefaultButton } from './Button';
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';
export default {
    title: 'App/button',
    component: DefaultButton,
    argTypes: {
        width: {
            control: {
                type: 'select',
                options: [
                    '100px',
                    '200px',
                ]
            }
        }
    }
} as ComponentMeta<typeof DefaultButton>;

export const Default: ComponentStory<typeof DefaultButton> = (args) => <DefaultButton {...args} />;

export const GrayButton = Default.bind({});
GrayButton.args = {
    color: 'black',
    width: '50px',
    onPress: () => { },
    hegiht: '40px'
};
