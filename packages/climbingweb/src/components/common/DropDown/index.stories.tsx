import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DropDown } from '.';
export default {
    title: 'WEB/DropDown',
    component: DropDown,
} as ComponentMeta<typeof DropDown>;

export const Primary: ComponentStory<typeof DropDown> = () => <DropDown />;