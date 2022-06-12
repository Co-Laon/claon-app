import { Default } from './Checkbox';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FaceProps, LineProps } from './CheckboxProps';

export default {
    title: 'App/Default',
    component: Default,
} as ComponentMeta<typeof Default>;

export const Template: ComponentStory<typeof Default> = (args) => <Default {...args} />;

export const FaceCheckBox = Template.bind({});
FaceCheckBox.args = FaceProps;
export const LineCheckBox = Template.bind({});
FaceCheckBox.args = LineProps;
