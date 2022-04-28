import MyButton from './Button';
import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'App/button',
    component: MyButton,
} as ComponentMeta<typeof MyButton>;

export const Primary: ComponentStory<typeof MyButton> = () => <MyButton />;
