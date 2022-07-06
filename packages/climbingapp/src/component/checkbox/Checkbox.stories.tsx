import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CheckBox } from './Checkbox';


export default {
    title: 'App/Checkbox',
    component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

export const Template: ComponentStory<typeof CheckBox> = (args) => <CheckBox {...args} />;

export const FaceCheckBox = Template.bind({});
FaceCheckBox.args = {
    checked: true,
    onPress: () => { },
    checkIcon: 'face'
};
export const LineCheckBox = Template.bind({});
LineCheckBox.args = {
    checked: true,
    onPress: () => { },
    checkIcon: 'line',
};
