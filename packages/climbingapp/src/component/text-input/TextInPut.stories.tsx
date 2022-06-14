import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MyTextInput } from './TextInput';



export default {
    title: 'App/TextInput',
    component: MyTextInput,
} as ComponentMeta<typeof MyTextInput>;

export const Template: ComponentStory<typeof MyTextInput> = (args) => <MyTextInput {...args} />;


export const PhoneNumberInput = Template.bind({});
PhoneNumberInput.args = {
    placeholder: '-없이 숫자만 입력',
};